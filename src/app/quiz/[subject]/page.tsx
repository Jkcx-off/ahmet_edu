import { getQuestions } from '../../actions'
import QuizRunner from '@/components/QuizRunner'
import { redirect } from 'next/navigation'

// We force dynamic because we want to fetch fresh data every time? 
// Or actually questions are static. But the user check is dynamic (handled in client or middleware).
// Let's keep it default.

// Next.js 15+ requires params to be a Promise
interface PageProps {
    params: Promise<{
        subject: string
    }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function QuizPage({ params, searchParams }: PageProps) {
    const { subject } = await params
    const resolvedSearchParams = await searchParams
    const classLevel = parseInt(resolvedSearchParams.classLevel as string) || 10

    // Validate subject
    const validSubjects = ['Chemistry', 'Physics', 'English', 'Biology']
    if (!validSubjects.includes(subject)) {
        redirect('/')
    }

    const questions = await getQuestions(subject, classLevel)

    if (!questions || questions.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-24">
                <h1 className="text-2xl font-bold mb-4">No questions found</h1>
                <p className="text-muted-foreground">Please ask the administrator to add questions for {subject}.</p>
            </div>
        )
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-4 md:p-12 bg-[#0f172a] selection:bg-none">
            {/* Passing data to client component */}
            <QuizRunner questions={questions} subject={subject} classLevel={classLevel} />
        </main>
    )
}
