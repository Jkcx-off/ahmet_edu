'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { submitTest, reportCheat } from '../app/actions'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AlertTriangle, CheckCircle, Timer } from 'lucide-react'
import { cn } from '@/lib/utils'

type Question = {
    id: string
    text: string
    type: string // "MCQ" | "TEXT"
    options: string | null // JSON string or null
}

type QuizRunnerProps = {
    questions: Question[]
    subject: string
    classLevel: number
}

export default function QuizRunner({ questions, subject, classLevel }: QuizRunnerProps) {
    const router = useRouter()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    // Determine initial time based on subject
    const getInitialTime = (subj: string) => {
        return 10 * 60 // 10 minutes for all subjects
    }

    const [timeLeft, setTimeLeft] = useState(getInitialTime(subject))
    const [answers, setAnswers] = useState<Record<string, string | number>>({})
    const [isFinished, setIsFinished] = useState(false)
    const [score, setScore] = useState<number | null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [cheatDetected, setCheatDetected] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    // Load User ID
    useEffect(() => {
        const storedUserId = sessionStorage.getItem('test_user_id')
        if (!storedUserId) {
            router.push('/')
            return
        }
        setUserId(storedUserId)
    }, [router])

    // Timer
    useEffect(() => {
        if (isFinished || !userId) return
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    finishTest(answers, false, true) // Timeout
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [isFinished, userId, answers])

    // Security: Block Right Click & Copy
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => e.preventDefault()
        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault()
            alert("Copying is disabled!")
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v')) {
                e.preventDefault()
            }
        }

        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('copy', handleCopy)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('copy', handleCopy)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    // Anti-Cheat: Blur Detection
    useEffect(() => {
        if (isFinished || !userId) return

        const handleBlur = () => {
            // User left the tab
            if (!isFinished && !cheatDetected) {
                setCheatDetected(true)
                finishTest(answers, true)
            }
        }

        window.addEventListener('blur', handleBlur)
        return () => {
            window.removeEventListener('blur', handleBlur)
        }
    }, [isFinished, userId, answers, cheatDetected])


    type FeedbackItem = {
        questionId: string
        text: string
        type: string
        userAnswer: string | number
        isCorrect: boolean | null
        correctAnswerDisplay: string
        options: string[]
    }

    const [feedback, setFeedback] = useState<FeedbackItem[] | null>(null)

    // ... (rest of state)

    const finishTest = useCallback(async (finalAnswers: Record<string, string | number>, cheated = false, timeout = false) => {
        if (!userId || isFinished || loading) return
        setLoading(true)
        setIsFinished(true)

        try {
            if (cheated) {
                await reportCheat(userId, subject)
                setScore(0)
                setStatus('CHEATED')
            } else {
                const questionIds = questions.map(q => q.id)
                const result = await submitTest(userId, subject, finalAnswers, questionIds, classLevel)
                setScore(result.score)
                setStatus(result.status)
                if (result.feedback) {
                    setFeedback(result.feedback)
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [userId, subject, isFinished, loading])

    // ...

    const handleOptionSelect = (optionIndex: number) => {
        setAnswers(prev => ({
            ...prev,
            [questions[currentQuestion].id]: optionIndex
        }))
    }

    const handleTextChange = (text: string) => {
        setAnswers(prev => ({
            ...prev,
            [questions[currentQuestion].id]: text
        }))
    }

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        } else {
            // Check for missing answers before finishing
            const missingQIdx = questions.findIndex(q => {
                const ans = answers[q.id]
                return ans === undefined || (typeof ans === 'string' && ans.trim() === '')
            })

            if (missingQIdx !== -1) {
                alert(`You missed Question ${missingQIdx + 1}. Please answer it before finishing.`)
                setCurrentQuestion(missingQIdx)
                return
            }

            // Confirm submission
            if (confirm("Are you sure you want to finish the test?")) {
                finishTest(answers)
            }
        }
    }

    // Formatting Time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    if (isFinished) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-white w-full max-w-4xl mx-auto">
                <Card className={cn("w-full glass border-0 bg-opacity-20 backdrop-blur-lg shadow-xl", cheatDetected ? "bg-red-900/40" : "bg-emerald-900/40")}>
                    <CardHeader>
                        <CardTitle className="flex flex-col items-center gap-4">
                            {cheatDetected ? (
                                <>
                                    <AlertTriangle className="h-16 w-16 text-red-500" />
                                    <span className="text-2xl text-red-400">Test Terminated</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="h-16 w-16 text-emerald-400" />
                                    <span className="text-2xl text-emerald-300">Test Submitted</span>
                                </>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            {cheatDetected ? (
                                <p className="text-red-200">
                                    Anti-cheat system detected tab switching or loss of focus.
                                    Your score has been recorded as 0.
                                </p>
                            ) : (
                                <div>
                                    {status === 'PENDING_REVIEW' ? (
                                        <div className="space-y-2 mb-8">
                                            <p className="text-lg text-blue-200">Pending Manual Review</p>
                                            <p className="text-base text-gray-300">
                                                Your test includes written answers that need to be graded by an instructor.
                                                Your multiple-choice score is <span className="font-bold text-white">{score}</span>.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="mb-8">
                                            <p className="text-lg font-medium text-gray-300">Your Score</p>
                                            <p className="text-5xl font-bold mt-2 text-white">{score} / {questions.length}</p>
                                        </div>
                                    )}

                                    {/* Detailed Feedback */}
                                    {feedback && (
                                        <div className="mt-8 space-y-6 text-left">
                                            <h3 className="text-xl font-bold text-white border-b border-white/20 pb-2">Detailed Results</h3>
                                            {feedback.map((item, idx) => (
                                                <div key={item.questionId} className="bg-black/20 p-4 rounded-lg border border-white/10">
                                                    <div className="flex items-start gap-3">
                                                        <div className="mt-1">
                                                            {item.isCorrect === true && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                                                            {item.isCorrect === false && <AlertTriangle className="w-5 h-5 text-red-400" />}
                                                            {item.isCorrect === null && <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center text-[10px] text-blue-400 font-bold">?</div>}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p
                                                                className="text-white font-medium mb-2"
                                                                dangerouslySetInnerHTML={{ __html: `${idx + 1}. ${item.text}` }}
                                                            />

                                                            <div className="grid gap-2 text-sm">
                                                                <div className="flex gap-2">
                                                                    <span className="text-gray-400 w-24 shrink-0">Your Answer:</span>
                                                                    <span
                                                                        className={cn(
                                                                            "font-medium",
                                                                            item.isCorrect === true ? "text-emerald-300" :
                                                                                item.isCorrect === false ? "text-red-300" : "text-blue-300"
                                                                        )}
                                                                    // For user answers, we might want to keep them as plain text unless we parse them too.
                                                                    // But since user types raw text, keeping it safe is better. Converting simple text to safe HTML is complex.
                                                                    // Let's just render it as text for now.
                                                                    >
                                                                        {item.type === 'MCQ' && typeof item.userAnswer === 'number'
                                                                            ? <span dangerouslySetInnerHTML={{ __html: item.options[item.userAnswer] || 'Invalid' }} />
                                                                            : (item.userAnswer || 'No Answer')}
                                                                    </span>
                                                                </div>

                                                                {(item.isCorrect === false || item.isCorrect === null) && (
                                                                    <div className="flex gap-2">
                                                                        <span className="text-gray-400 w-24 shrink-0">Correct Answer:</span>
                                                                        <span
                                                                            className="text-emerald-300 font-medium"
                                                                            dangerouslySetInnerHTML={{ __html: item.correctAnswerDisplay }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-400 mt-8">
                                        Good job! You can close this tab now.
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white" onClick={() => router.push('/')}>Return Home</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    const question = questions[currentQuestion]
    const options = question.options ? (JSON.parse(question.options) as string[]) : []

    return (
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
            <div className="flex justify-between items-center mb-6 pt-4 sm:pt-0">
                <div className="text-sm font-medium text-slate-300">
                    Question {currentQuestion + 1} of {questions.length}
                </div>
                {/* Timer */}
                <div className={cn("flex items-center gap-2 font-mono font-bold px-3 py-1 rounded-full text-white bg-slate-800 border border-slate-700", timeLeft < 60 && "text-red-400 bg-red-950/50 border-red-900")}>
                    <Timer className="w-4 h-4" />
                    {formatTime(timeLeft)}
                </div>
            </div>

            <Card className="glass min-h-[400px] flex flex-col justify-between mb-8 border-slate-700 bg-slate-900/50">
                <CardContent className="pt-8 sm:pt-10">
                    <h2
                        className="text-xl sm:text-2xl font-serif text-white mb-8 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: question.text }}
                    />

                    {question.type === 'MCQ' ? (
                        <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {options.map((opt, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleOptionSelect(idx)}
                                    className={cn(
                                        "p-4 rounded-xl border cursor-pointer transition-all duration-200 group",
                                        answers[question.id] === idx
                                            ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500"
                                            : "border-slate-700 bg-slate-800/30 hover:bg-slate-800/80 hover:border-slate-600"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold shrink-0 transition-colors",
                                            answers[question.id] === idx
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "border-slate-600 text-slate-400 group-hover:border-slate-500 group-hover:text-slate-300"
                                        )}>
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                        <div
                                            className={cn("text-base sm:text-lg", answers[question.id] === idx ? "text-white" : "text-slate-300")}
                                            dangerouslySetInnerHTML={{ __html: opt }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : question.type === 'SPEAKING' ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-6 text-center">
                            <div className="p-6 bg-slate-800/50 rounded-full border border-slate-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Speaking Task</h3>
                                <p className="text-slate-400 max-w-md">
                                    Please raise your hand and present your answer to the instructor.
                                    Click "Mark as Completed" when you are finished.
                                </p>
                            </div>
                            <Button
                                onClick={() => {
                                    setAnswers(prev => ({
                                        ...prev,
                                        [questions[currentQuestion].id]: "[ORAL_ANSWER_COMPLETED]"
                                    }))
                                }}
                                disabled={answers[questions[currentQuestion].id] === "[ORAL_ANSWER_COMPLETED]"}
                                className={cn(
                                    "mt-4",
                                    answers[questions[currentQuestion].id] === "[ORAL_ANSWER_COMPLETED]"
                                        ? "bg-emerald-600 hover:bg-emerald-600 text-white"
                                        : "bg-blue-600 hover:bg-blue-500 text-white"
                                )}
                            >
                                {answers[questions[currentQuestion].id] === "[ORAL_ANSWER_COMPLETED]" ? "Task Completed" : "Mark as Completed"}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Textarea
                                placeholder={question.type === 'ESSAY' ? "Write your essay here..." : "Type your answer here..."}
                                className={cn(
                                    "bg-slate-950/50 border-slate-700 text-lg text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500 resize-none p-4",
                                    question.type === 'ESSAY' ? "min-h-[300px]" : "min-h-[100px]"
                                )}
                                value={(answers[question.id] as string) || ''}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e.target.value)}
                            />
                            <p className="text-sm text-slate-400">
                                {question.type === 'ESSAY' ? "Take your time to structure your thoughts." : "Make sure to double-check your answer."}
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between border-t border-slate-800/50 p-6 bg-black/10">
                    <Button
                        variant="ghost"
                        disabled={currentQuestion === 0}
                        onClick={() => setCurrentQuestion(p => p - 1)}
                        className="text-base h-11 px-6 text-slate-400 hover:text-white hover:bg-white/5"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={
                            answers[question.id] === undefined ||
                            (typeof answers[question.id] === 'string' && (answers[question.id] as string).trim() === '')
                        }
                        className="text-base h-11 px-8 bg-white text-slate-900 hover:bg-slate-200 font-semibold transition-all hover:scale-[1.02]"
                    >
                        {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
