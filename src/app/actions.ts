'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function loginUser(firstName: string, lastName: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                firstName,
                lastName,
            },
            select: { id: true, firstName: true, lastName: true }
        })

        if (user) {
            return user
        }

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
            },
            select: { id: true, firstName: true, lastName: true }
        })
        return newUser
    } catch (error: Error | any) {
        console.error("PRISMA LOGIN ERROR:", error)
        throw new Error(error?.message || "Database connection failed during login")
    }
}

export async function getQuestions(subject: string, classLevel: number) {
    const questions = await prisma.question.findMany({
        where: {
            subject,
            classLevel: {
                lte: classLevel // Fetch questions for this class and below
            }
        },
        select: {
            id: true,
            text: true,
            type: true,
            options: true,
            correctAnswerText: true,
            difficulty: true, // Needed for sorting/grouping
        },
        orderBy: {
            difficulty: 'asc',
        },
    })

    // Shuffle function
    const shuffle = <T,>(arr: T[]): T[] => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }

    if (subject === 'English') {
        const mcqs = questions.filter(q => q.type === 'MCQ' || !q.type) // Default to MCQ
        const essays = questions.filter(q => q.type === 'ESSAY')
        const speaking = questions.filter(q => q.type === 'SPEAKING')

        const selectedMCQs = shuffle(mcqs).slice(0, 12)
        const selectedEssays = shuffle(essays).slice(0, 1)
        const selectedSpeaking = shuffle(speaking).slice(0, 2)

        return [...selectedMCQs, ...selectedEssays, ...selectedSpeaking]
    }



    // Default logic for other subjects (20 questions: 7/7/6)
    const grouped: Record<number, typeof questions> = {}
    questions.forEach(q => {
        const d = q.difficulty || 1
        if (!grouped[d]) grouped[d] = []
        grouped[d].push(q)
    })

    const targets: Record<number, number> = {
        1: 7, // Easy
        2: 7, // Medium
        3: 6  // Hard
    }

    const finalQuestions: typeof questions = []
    const sortedLevels = Object.keys(grouped).map(Number).sort((a, b) => a - b)

    for (const level of sortedLevels) {
        const group = grouped[level]
        // Fisher-Yates Shuffle for this group
        for (let i = group.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [group[i], group[j]] = [group[j], group[i]];
        }

        // Take subset
        const count = targets[level] || group.length
        finalQuestions.push(...group.slice(0, count))
    }

    return finalQuestions
}

// Helper to normalize text for comparison
const normalize = (text: string) => {
    if (!text) return ''
    return text
        .replace(/<[^>]*>/g, '') // Strip HTML tags (like <sub>, <sup>)
        .replace(/\s+/g, '')     // Remove all whitespace
        .replace(/[.,;]/g, '')   // Remove common punctuation
        .toLowerCase()
}

export async function submitTest(userId: string, subject: string, answers: Record<string, string | number>, questionIds: string[], classLevel: number) {
    // Only fetch the questions that were actually in the test
    const questions = await prisma.question.findMany({
        where: {
            id: { in: questionIds },
            subject, // double check subject match
        },
    })

    let score = 0
    // We will auto-grade everything now, so pendingManualReview is false unless we decide to skipping grading
    let pendingManualReview = false
    const textAnswersToSave: { questionId: string, text: string, isCorrect: boolean }[] = []

    questions.forEach((q) => {
        const userAnswer = answers[q.id]

        if (q.type === 'MCQ') {
            let isCorrect = false
            if (typeof userAnswer === 'number') {
                if (userAnswer === q.correctOption) {
                    score += 1
                    isCorrect = true
                }
                // Save MCQ answer as text (stringified index)
                textAnswersToSave.push({
                    questionId: q.id,
                    text: userAnswer.toString(),
                    isCorrect: isCorrect
                })
            }
        } else if (q.type === 'TEXT') {
            let isCorrect = false
            if (typeof userAnswer === 'string') {
                const normalizedUser = normalize(userAnswer)
                const normalizedCorrect = normalize(q.correctAnswerText || '')

                // Exact match (normalized)
                if (normalizedUser && normalizedUser === normalizedCorrect) {
                    isCorrect = true
                    score += 1
                }

                textAnswersToSave.push({
                    questionId: q.id,
                    text: userAnswer,
                    isCorrect: isCorrect // Auto-graded
                })
            }
        } else if (q.type === 'ESSAY' || q.type === 'SPEAKING') {
            // These require manual review
            pendingManualReview = true
            if (typeof userAnswer === 'string') {
                textAnswersToSave.push({
                    questionId: q.id,
                    text: userAnswer,
                    isCorrect: null as unknown as boolean // Pending manual review
                })
            }
        }
    })

    // If we have pending answers, status is PENDING_REVIEW
    const status = pendingManualReview ? 'PENDING_REVIEW' : 'COMPLETED'

    const result = await prisma.result.create({
        data: {
            userId,
            subject,
            classLevel,
            score,
            status,
        },
    })

    // Save text answers
    if (textAnswersToSave.length > 0) {
        await prisma.answer.createMany({
            data: textAnswersToSave.map(a => ({
                resultId: result.id,
                questionId: a.questionId,
                textAnswer: a.text,
                isCorrect: a.isCorrect // Save the auto-graded result
            }))
        })
    }

    // Build Results Feedback
    const feedback = questions.map((q) => {
        const userAnswer = answers[q.id]
        let isCorrect: boolean | null = false
        let correctAnswerDisplay = ''

        if (q.type === 'MCQ') {
            const options = q.options ? JSON.parse(q.options) : []
            isCorrect = (typeof userAnswer === 'number' && userAnswer === q.correctOption)
            correctAnswerDisplay = q.correctOption !== null && options[q.correctOption] ? options[q.correctOption] : 'Unknown'

            // Prefer correctAnswerText if available
            if (q.correctAnswerText) {
                correctAnswerDisplay = q.correctAnswerText
            }
        } else if (q.type === 'TEXT') {
            // Re-calculate local isCorrect for feedback display (same logic as above)
            if (typeof userAnswer === 'string') {
                const normalizedUser = normalize(userAnswer)
                const normalizedCorrect = normalize(q.correctAnswerText || '')
                isCorrect = (normalizedUser !== '' && normalizedUser === normalizedCorrect)
            } else {
                isCorrect = false
            }
            // Always show correct answer
            correctAnswerDisplay = q.correctAnswerText || 'No correct answer defined'
        } else {
            // ESSAY or SPEAKING
            isCorrect = null // Pending
            correctAnswerDisplay = 'Pending Manual Review'
        }

        return {
            questionId: q.id,
            text: q.text,
            type: q.type,
            userAnswer,
            isCorrect,
            correctAnswerDisplay,
            options: q.options ? JSON.parse(q.options) : []
        }
    })

    revalidatePath('/admin')
    return { score, status, feedback }
}

export async function reportCheat(userId: string, subject: string) {
    await prisma.result.create({
        data: {
            userId,
            subject,
            score: 0,
            status: 'CHEATED',
        },
    })
    revalidatePath('/admin')
}

export async function checkUserTestStatus(userId: string, subject: string) {
    const result = await prisma.result.findFirst({
        where: {
            userId,
            subject,
            status: { not: 'CHEATED' } // Allow retake if previous attempts were CHEATED
        },
    })
    return !!result
}

export async function getUserResults(userId: string) {
    return await prisma.result.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
}

// Admin Actions

export async function getResults() {
    return await prisma.result.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            user: true,
        },
    })
}

export async function resetResult(resultId: string) {
    await prisma.result.delete({
        where: {
            id: resultId,
        },
    })
    revalidatePath('/admin')
}

export async function addQuestion(subject: string, text: string, type: string, options?: string[], correctOption?: number, classLevel?: number) {
    await prisma.question.create({
        data: {
            subject,
            text,
            type,
            options: options ? JSON.stringify(options) : undefined,
            correctOption,
            classLevel: classLevel || 10,
        },
    })
    revalidatePath('/admin')
}

export async function deleteQuestion(questionId: string) {
    await prisma.question.delete({
        where: {
            id: questionId,
        },
    })
    revalidatePath('/admin')
}

export async function getAdminQuestions(subject: string) {
    return await prisma.question.findMany({
        where: {
            subject,
        },
    })
}

export async function getGradingData(resultId: string) {
    const result = await prisma.result.findUnique({
        where: { id: resultId },
        include: {
            user: true,
            answers: true,
        },
    })

    if (!result) return null

    const questions = await prisma.question.findMany({
        where: { subject: result.subject },
    })

    return { result, questions }
}

export async function gradeAnswer(answerId: string, isCorrect: boolean) {
    const answer = await prisma.answer.update({
        where: { id: answerId },
        data: { isCorrect },
    })

    if (isCorrect) {
        // Increment result score
        await prisma.result.update({
            where: { id: answer.resultId },
            data: { score: { increment: 1 } }
        })
    }

    // Check if all answers for this result are graded
    const pendingAnswers = await prisma.answer.count({
        where: {
            resultId: answer.resultId,
            isCorrect: null
        }
    })

    if (pendingAnswers === 0) {
        await prisma.result.update({
            where: { id: answer.resultId },
            data: { status: 'COMPLETED' }
        })
    }

    revalidatePath('/admin')
}
