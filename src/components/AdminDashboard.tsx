'use client'

import { useState, useEffect } from 'react'
import { getResults, resetResult, addQuestion, deleteQuestion, getAdminQuestions, gradeAnswer, getGradingData } from '../app/actions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    LayoutDashboard, Users, FileQuestion, LogOut, Plus, Trash2 as Trash, Search,
    RotateCcw, Eye, X, Check, CheckCircle, XCircle, Lock, List, RefreshCw, Share2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import QRCode from "react-qr-code"

// Types
type ResultWithUser = {
    id: string
    score: number
    subject: string
    status: string
    createdAt: Date
    classLevel: number
    user: {
        firstName: string
        lastName: string
    }
}

type Question = {
    id: string
    text: string
    subject: string
    type: string // "MCQ" | "TEXT"
    options: string // JSON string
    correctOption: number
    correctAnswerText?: string | null
    classLevel: number
}

type Answer = {
    id: string
    questionId: string
    textAnswer: string
    isCorrect: boolean | null
}

type GradingData = {
    result: ResultWithUser & { answers: Answer[] }
    questions: Question[]
}

export default function AdminDashboard() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')

    const [activeTab, setActiveTab] = useState<'results' | 'questions'>('results')
    const [results, setResults] = useState<ResultWithUser[]>([])
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    // Grading State
    const [gradingResultId, setGradingResultId] = useState<string | null>(null)
    const [gradingData, setGradingData] = useState<GradingData | null>(null)
    const [showQR, setShowQR] = useState(false)

    // Question Form State
    const [subject, setSubject] = useState('Chemistry')
    const [qType, setQType] = useState('MCQ')
    const [qText, setQText] = useState('')
    const [op1, setOp1] = useState('')
    const [op2, setOp2] = useState('')
    const [op3, setOp3] = useState('')
    const [op4, setOp4] = useState('')
    const [correct, setCorrect] = useState(0)
    const [classLevel, setClassLevel] = useState(10)
    const [formOpen, setFormOpen] = useState(false)

    // Question Management Filter
    const [filterSubject, setFilterSubject] = useState('Chemistry')

    // Prepare Auth
    useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth')
        if (auth === 'true') {
            setIsAuthenticated(true)
        }
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === 'admin123') {
            setIsAuthenticated(true)
            sessionStorage.setItem('admin_auth', 'true')
            setAuthError('')
        } else {
            setAuthError('Invalid password')
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        sessionStorage.removeItem('admin_auth')
    }

    const fetchData = async () => {
        try {
            if (activeTab === 'results') {
                const data = await getResults()
                setResults(data as any)
            } else {
                const data = await getAdminQuestions(filterSubject)
                setQuestions(data as any)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    // Load Grading Data
    useEffect(() => {
        if (!gradingResultId) return
        const loadGrading = async () => {
            const data = await getGradingData(gradingResultId)
            setGradingData(data as any)
        }
        loadGrading()
    }, [gradingResultId])


    // Poll
    useEffect(() => {
        if (!isAuthenticated) return
        if (gradingResultId) return // Don't poll while grading
        fetchData()
        const interval = setInterval(fetchData, 5000)
        return () => clearInterval(interval)
    }, [activeTab, filterSubject, gradingResultId, isAuthenticated])

    const handleReset = async (id: string, name: string) => {
        if (confirm(`ALLOW RETAKE for ${name}?\n\nThis will DELETE their current result and allow them to start the test again.`)) {
            await resetResult(id)
            fetchData()
        }
    }

    const handleDeleteQuestion = async (id: string) => {
        if (confirm('Delete this question?')) {
            await deleteQuestion(id)
            fetchData()
        }
    }

    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault()
        const options = qType === 'MCQ' ? [op1, op2, op3, op4] : []
        await addQuestion(subject, qText, qType, options, Number(correct), classLevel)
        setQText('')
        setOp1('')
        setOp2('')
        setOp3('')
        setOp4('')
        setClassLevel(10)
        setFormOpen(false)
        alert('Question Added!')
        if (activeTab === 'questions' && filterSubject === subject) {
            fetchData()
        }
    }

    const handleGrade = async (answerId: string, isCorrect: boolean) => {
        await gradeAnswer(answerId, isCorrect)
        // Refresh local grading data
        if (gradingResultId) {
            const data = await getGradingData(gradingResultId)
            setGradingData(data as any)
            // If completed, close modal
            if (data?.result.status === 'COMPLETED') {
                setTimeout(() => setGradingResultId(null), 1000)
            }
        }
    }

    // Filter results
    const filteredResults = results.filter(r =>
        r.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.subject.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4">
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-slate-900 text-white p-3 rounded-full w-fit mb-4">
                            <Lock className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl">Admin Access</CardTitle>
                        <CardDescription>Please enter the password to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="h-12 text-lg"
                            />
                            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
                            <Button type="submit" className="w-full h-12 text-lg">Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Grading Modal
    if (gradingResultId && gradingData) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
                <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <CardHeader className="flex flex-row justify-between items-center sticky top-0 bg-white z-10 border-b">
                        <div>
                            <CardTitle>Grading: {gradingData.result.user.firstName} {gradingData.result.user.lastName}</CardTitle>
                            <CardDescription>{gradingData.result.subject} - Score: {gradingData.result.score}</CardDescription>
                        </div>
                        <Button variant="ghost" onClick={() => setGradingResultId(null)}><X className="w-6 h-6" /></Button>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        {gradingData.questions.map((q) => {
                            // Find answer for this question
                            const answer = gradingData.result.answers.find(a => a.questionId === q.id)
                            const isMCQ = q.type === 'MCQ'
                            const options = isMCQ && q.options ? JSON.parse(q.options) : []
                            const userOptionIndex = isMCQ && answer ? parseInt(answer.textAnswer) : -1

                            return (
                                <div key={q.id} className="p-4 border rounded-lg space-y-3 bg-slate-50 dark:bg-slate-900">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium text-lg">{q.text}</p>
                                        {answer && (
                                            <div className={cn("px-2 py-1 rounded text-xs font-bold", answer.isCorrect ? "bg-green-100 text-green-700" : answer.isCorrect === false ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700")}>
                                                {answer.isCorrect === true ? "Correct" : answer.isCorrect === false ? "Incorrect" : "Pending"}
                                            </div>
                                        )}
                                    </div>

                                    {isMCQ ? (
                                        <div className="space-y-1">
                                            {options.map((opt: string, idx: number) => {
                                                const isSelected = userOptionIndex === idx
                                                const isCorrect = q.correctOption === idx
                                                let rowClass = "p-2 rounded border "
                                                if (isCorrect) rowClass += "bg-green-50 border-green-200 text-green-900"
                                                else if (isSelected && !isCorrect) rowClass += "bg-red-50 border-red-200 text-red-900"
                                                else rowClass += "bg-white dark:bg-slate-950 border-slate-200"

                                                return (
                                                    <div key={idx} className={rowClass}>
                                                        <div className="flex items-center gap-2">
                                                            {isSelected && (isCorrect ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />)}
                                                            {!isSelected && isCorrect && <CheckCircle className="w-4 h-4 text-green-600 opacity-50" />}
                                                            <span>{opt}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div className="bg-white dark:bg-black p-3 rounded border">
                                            <p className="text-sm text-slate-500 mb-1">Student Answer:</p>
                                            <p className="whitespace-pre-wrap font-mono">{answer?.textAnswer || '(No Answer)'}</p>
                                            <p className="text-sm text-slate-500 mt-2 mb-1">Correct Answer:</p>
                                            <p className="whitespace-pre-wrap font-mono text-green-600">{q.correctAnswerText || 'Manual Review Needed'}</p>
                                        </div>
                                    )}

                                    {/* Manual Grading Actions for Non-MCQ */}
                                    {!isMCQ && answer && answer.isCorrect === null && (
                                        <div className="flex items-center gap-4 justify-end">
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleGrade(answer.id, true)}>
                                                <Check className="w-4 h-4 mr-2" /> Correct (+1)
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleGrade(answer.id, false)}>
                                                <X className="w-4 h-4 mr-2" /> Incorrect
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 p-2 sm:p-4">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl shadow-sm border gap-4">
                <div className='flex items-center gap-4'>
                    <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500"><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                        size="sm"
                        variant={activeTab === 'results' ? 'default' : 'ghost'}
                        onClick={() => setActiveTab('results')}
                    >
                        <List className="mr-2 h-4 w-4" /> Results
                    </Button>
                    <Button
                        size="sm"
                        variant={activeTab === 'questions' ? 'default' : 'ghost'}
                        onClick={() => setActiveTab('questions')}
                    >
                        <FileQuestion className="mr-2 h-4 w-4" /> Questions
                    </Button>
                </div>

                <div className="flex gap-2 w-full md:w-auto justify-end">
                    <Button size="sm" variant="outline" onClick={() => setShowQR(true)}><Share2 className="mr-2 h-4 w-4" /> Share App</Button>
                    <Button size="sm" variant="outline" onClick={fetchData}><RefreshCw className="mr-2 h-4 w-4" /> Refresh</Button>
                    <Button size="sm" onClick={() => setFormOpen(!formOpen)}><Plus className="mr-2 h-4 w-4" /> Add Question</Button>
                </div>
            </div>

            {showQR && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowQR(false)}>
                    <Card className="w-full max-w-2xl bg-white dark:bg-slate-900" onClick={e => e.stopPropagation()}>
                        <CardHeader className="text-center pb-2 border-b">
                            <CardTitle>Share Application</CardTitle>
                            <CardDescription>Students can join via Internet or Local School Wi-Fi</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row gap-8 items-center justify-center p-6">

                            {/* Internet QR */}
                            <div className="flex flex-col items-center flex-1">
                                <h3 className="font-bold text-lg mb-2 text-blue-600">Internet Access</h3>
                                <p className="text-xs text-slate-500 mb-4 text-center">Use from anywhere in the world</p>
                                <div className="p-4 bg-white rounded-lg shadow-md border-2 border-blue-100 flex items-center justify-center mb-4">
                                    <QRCode value="https://ahmet-edu.vercel.app" size={160} />
                                </div>
                                <div className="flex w-full items-center gap-2 mt-auto">
                                    <p className="text-center text-xs font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded flex-1 truncate">
                                        https://ahmet-edu.vercel.app
                                    </p>
                                    <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText("https://ahmet-edu.vercel.app")}>Copy</Button>
                                </div>
                            </div>

                            <div className="hidden sm:block w-px h-48 bg-slate-200 dark:bg-slate-700"></div>

                            {/* Local Wi-Fi QR */}
                            <div className="flex flex-col items-center flex-1">
                                <h3 className="font-bold text-lg mb-2 text-emerald-600">Offline (Local Wi-Fi)</h3>
                                <p className="text-xs text-slate-500 mb-4 text-center">Use only in the school network</p>
                                <div className="p-4 bg-white rounded-lg shadow-md border-2 border-emerald-100 flex items-center justify-center mb-4">
                                    <QRCode value="http://192.168.5.135:3000" size={160} />
                                </div>
                                <div className="flex w-full items-center gap-2 mt-auto">
                                    <p className="text-center text-xs font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded flex-1 truncate">
                                        http://192.168.5.135:3000
                                    </p>
                                    <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText("http://192.168.5.135:3000")}>Copy</Button>
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter className="pt-2 border-t mt-4">
                            <Button className="w-full" variant="outline" onClick={() => setShowQR(false)}>Close Window</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {formOpen && (
                <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-900/10">
                    <CardHeader>
                        <CardTitle>Add New Question</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddQuestion} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <select
                                    className="p-2 border rounded bg-white dark:bg-slate-800"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                >
                                    {['Chemistry', 'Physics', 'English', 'Biology'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <select
                                    className="p-2 border rounded bg-white dark:bg-slate-800"
                                    value={classLevel}
                                    onChange={e => setClassLevel(Number(e.target.value))}
                                >
                                    {[6, 7, 8, 9, 10, 11, 12].map(num => (
                                        <option key={num} value={num}>Grade {num}</option>
                                    ))}
                                </select>
                                <select
                                    className="p-2 border rounded bg-white dark:bg-slate-800"
                                    value={qType}
                                    onChange={e => setQType(e.target.value)}
                                >
                                    <option value="MCQ">Multiple Choice</option>
                                    <option value="TEXT">Open Text Answer</option>
                                </select>
                                {qType === 'MCQ' && (
                                    <select
                                        className="p-2 border rounded bg-white dark:bg-slate-800"
                                        value={correct}
                                        onChange={e => setCorrect(Number(e.target.value))}
                                    >
                                        <option value={0}>Option A is correct</option>
                                        <option value={1}>Option B is correct</option>
                                        <option value={2}>Option C is correct</option>
                                        <option value={3}>Option D is correct</option>
                                    </select>
                                )}
                            </div>

                            <Textarea
                                placeholder="Question Text"
                                value={qText}
                                onChange={e => setQText(e.target.value)}
                                required
                                className="bg-white dark:bg-slate-800"
                            />

                            {qType === 'MCQ' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <Input placeholder="Option A" value={op1} onChange={e => setOp1(e.target.value)} required />
                                    <Input placeholder="Option B" value={op2} onChange={e => setOp2(e.target.value)} required />
                                    <Input placeholder="Option C" value={op3} onChange={e => setOp3(e.target.value)} required />
                                    <Input placeholder="Option D" value={op4} onChange={e => setOp4(e.target.value)} required />
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Button type="submit">Save Question</Button>
                                <Button variant="ghost" type="button" onClick={() => setFormOpen(false)}>Cancel</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {activeTab === 'results' ? (
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div>
                                <CardTitle>Student Results</CardTitle>
                                <CardDescription>Manage student attempts and grading</CardDescription>
                            </div>
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                                <Input
                                    placeholder="Search by name..."
                                    className="pl-9 w-full sm:w-[250px]"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b hidden sm:table-header-group">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Student</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Subject</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Class</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Score</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right w-[200px]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {filteredResults.map((r) => (
                                        <tr key={r.id} className="border-b transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 flex flex-col sm:table-row p-4 sm:p-0 relative">
                                            <td className="sm:p-4 align-middle font-bold flex justify-between sm:table-cell">
                                                <span className="sm:hidden text-muted-foreground font-normal">Student:</span>
                                                <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-sm inline-block shadow-sm">
                                                    {r.user.firstName} {r.user.lastName}
                                                </span>
                                            </td>
                                            <td className="sm:p-4 align-middle font-bold flex justify-between sm:table-cell">
                                                <span className="sm:hidden text-muted-foreground font-normal">Subject:</span>
                                                <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-sm inline-block shadow-sm">
                                                    {r.subject}
                                                </span>
                                            </td>
                                            <td className="sm:p-4 align-middle font-bold flex justify-between sm:table-cell">
                                                <span className="sm:hidden text-muted-foreground font-normal">Class:</span>
                                                <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-sm inline-block shadow-sm">
                                                    Grade {r.classLevel}
                                                </span>
                                            </td>
                                            <td className="sm:p-4 align-middle font-bold flex justify-between sm:table-cell">
                                                <span className="sm:hidden text-muted-foreground font-normal text-sm">Score:</span>
                                                <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-sm inline-block shadow-sm">
                                                    {r.score}
                                                </span>
                                            </td>
                                            <td className="sm:p-4 align-middle flex justify-between sm:table-cell">
                                                <span className="sm:hidden text-muted-foreground">Status:</span>
                                                <span className={cn(
                                                    "px-2 py-1 rounded text-xs sm:text-sm",
                                                    r.status === 'CHEATED' ? 'text-red-600 bg-red-100' :
                                                        r.status === 'PENDING_REVIEW' ? 'text-blue-600 bg-blue-100' :
                                                            'text-green-600 bg-green-100'
                                                )}>
                                                    {r.status}
                                                </span>
                                            </td>
                                            <td className="sm:p-4 align-middle text-slate-500 flex justify-between sm:table-cell text-xs sm:text-sm">
                                                <span className="sm:hidden text-muted-foreground">Date:</span>
                                                {new Date(r.createdAt).toLocaleString()}
                                            </td>
                                            <td className="sm:p-4 align-middle text-right flex justify-end gap-2 sm:table-cell mt-2 sm:mt-0">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setGradingResultId(r.id)}
                                                    className="w-full sm:w-auto border-slate-200 text-slate-600 hover:bg-slate-50"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" /> View
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleReset(r.id, `${r.user.firstName} ${r.user.lastName}`)}
                                                    className="w-full sm:w-auto border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                                                    title="Allow student to retake test"
                                                >
                                                    <RotateCcw className="w-4 h-4 mr-2 sm:mr-0" /> <span className="sm:hidden lg:inline ml-2">Allow Retake</span>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredResults.length === 0 && !loading && (
                                        <tr>
                                            <td colSpan={6} className="p-8 text-center text-slate-500">
                                                {searchQuery ? 'No students found matching your search.' : 'No results found yet.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Manage Questions</CardTitle>
                            <CardDescription>View and delete questions</CardDescription>
                        </div>
                        <select
                            className="p-2 border rounded w-full sm:w-auto bg-white dark:bg-slate-800"
                            value={filterSubject}
                            onChange={e => setFilterSubject(e.target.value)}
                        >
                            {['Chemistry', 'Physics', 'English', 'Biology'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {questions.map((q) => (
                                <div key={q.id} className="flex flex-col sm:flex-row justify-between items-start p-4 border rounded-lg bg-slate-50 dark:bg-slate-800 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={cn("text-xs px-2 py-0.5 rounded font-bold uppercase", q.type === 'MCQ' ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700")}>
                                                {q.type}
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded font-bold uppercase bg-blue-100 text-blue-700">
                                                Grade {q.classLevel}
                                            </span>
                                        </div>
                                        <p className="font-medium text-sm sm:text-base">{q.text}</p>
                                        {q.type === 'MCQ' && (
                                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                                Options: {q.options ? JSON.parse(q.options).join(', ') : 'None'} <br />
                                                Correct: {['A', 'B', 'C', 'D'][q.correctOption]}
                                            </p>
                                        )}
                                    </div>
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteQuestion(q.id)} className="self-end sm:self-center">
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            {questions.length === 0 && (
                                <p className="text-center text-slate-500 p-8">No questions for this subject.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
