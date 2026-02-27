'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser, checkUserTestStatus, getUserResults } from './actions'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Beaker, Atom, BookOpen, User, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type UserSession = {
  id: string
  firstName: string
  lastName: string
}

type Result = {
  id: string
  subject: string
  score: number
  status: string
  createdAt: string
}

const subjects = [
  { id: 'Chemistry', name: 'Chemistry', icon: Beaker, color: 'text-purple-600' },
  { id: 'Physics', name: 'Physics', icon: Atom, color: 'text-blue-600' },
  { id: 'English', name: 'English', icon: BookOpen, color: 'text-red-600' },
  { id: 'Biology', name: 'Biology', icon: User, color: 'text-green-600' }, // User icon as placeholder for Biology/Life
]

export default function Home() {
  const [session, setSession] = useState<UserSession | null>(null)
  const [results, setResults] = useState<Result[]>([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('') // Added Surname field
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Restore session from storage on mount
  useEffect(() => {
    const storedId = sessionStorage.getItem('test_user_id')
    const storedName = sessionStorage.getItem('test_user_name')
    if (storedId && storedName) {
      const [first, ...rest] = storedName.split(' ')
      setSession({
        id: storedId,
        firstName: first,
        lastName: rest.join(' ')
      })
    }
  }, [])

  // Load results when session is set
  useEffect(() => {
    if (session?.id) {
      getUserResults(session.id).then(data => {
        setResults(data as Result[])
      })
    }
  }, [session])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim()) return

    setLoading(true)
    try {
      const response = await loginUser(firstName, lastName)

      if (response && 'error' in response) {
        setError(response.error as string)
        return
      }

      const user = response as UserSession
      setSession(user)

      // Save to storage immediately on login
      sessionStorage.setItem('test_user_id', user.id)
      sessionStorage.setItem('test_user_name', `${user.firstName} ${user.lastName}`)
    } catch (e: unknown) {
      console.error("Login Error:", e)
      const err = e as Error
      setError(err.message || 'Failed to login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubjectSelect = async (subject: string) => {
    if (!session) return

    setLoading(true)
    // Check if user already submitted
    const hasResult = await checkUserTestStatus(session.id, subject)
    if (hasResult) {
      setError(`You have already completed the ${subject} test.`)
      setLoading(false)
      return
    }

    // Persist user session to sessionStorage so it survives the navigation
    sessionStorage.setItem('test_user_id', session.id)
    sessionStorage.setItem('test_user_name', `${session.firstName} ${session.lastName}`)

    router.push(`/quiz/${subject}`)
  }

  return (
    <main className={cn(
      "flex min-h-screen flex-col items-center p-4 bg-[#0f172a] relative overflow-hidden", // Dark Navy Background
      !session ? "justify-start pt-[20vh]" : "justify-center"
    )}>
      <div className="z-10 w-full flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-white mb-4">
          Sopandai EduTester
        </h1>
      </div>

      {!session ? (
        <form onSubmit={handleLogin} className="w-full max-w-[320px] flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
          <div className="space-y-2">
            <label className="text-sm font-serif text-slate-300 ml-1 tracking-wide">
              First Name
            </label>
            <Input
              placeholder="Enter your first name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              className="h-12 px-4 rounded-md bg-white border-transparent focus:ring-2 focus:ring-slate-400 text-slate-900 placeholder:text-slate-400 transition-all text-base font-serif"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-serif text-slate-300 ml-1 tracking-wide">
              Last Name
            </label>
            <Input
              placeholder="Enter your last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
              className="h-12 px-4 rounded-md bg-white border-transparent focus:ring-2 focus:ring-slate-400 text-slate-900 placeholder:text-slate-400 transition-all text-base font-serif"
            />
          </div>

          {error && <p className="text-red-400 text-xs text-center font-serif tracking-wide animate-pulse">{error}</p>}

          <Button
            type="submit"
            className="h-12 mt-4 rounded-md text-base font-serif tracking-wide font-medium bg-slate-200 text-slate-900 hover:bg-white transition-all shadow-md active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue'}
          </Button>
        </form>
      ) : (
        <div className="mt-16 w-full max-w-5xl flex flex-col items-center">
          <div className="mb-4 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-slate-400 text-sm font-serif mb-1">Student</span>
            <p className="text-2xl md:text-3xl text-emerald-400 font-serif font-medium tracking-wide">
              {session.firstName} {session.lastName}
            </p>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8 text-white font-serif">Select Subject</h2>
          <p className="text-center text-slate-300 mb-12 font-serif">Choose your exam below.</p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900/50 border border-red-800 text-red-200 text-center">
              {error}
              <Button variant="link" onClick={() => setError('')} className="ml-2 text-red-300">Dismiss</Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((sub) => {
              const Icon = sub.icon
              return (
                <Card
                  key={sub.id}
                  className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-transform duration-300 cursor-pointer group"
                  onClick={() => handleSubjectSelect(sub.id)}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-serif font-medium text-white">
                      {sub.name}
                    </CardTitle>
                    <Icon className={cn("h-6 w-6", sub.color)} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-slate-400 mt-2 font-serif">
                      Click to start exam
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full group-hover:bg-blue-600 font-serif" variant="secondary">Start <ArrowRight className="w-4 h-4 ml-2" /></Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="mt-16 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h3 className="text-2xl font-bold text-center mb-6 text-white font-serif border-t border-slate-800 pt-8">Your Past Results</h3>
              <div className="bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-slate-950/50 text-slate-200 uppercase font-serif">
                    <tr>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Score</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {results.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{r.subject}</td>
                        <td className="px-6 py-4">{new Date(r.createdAt).toLocaleDateString()} {new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="px-6 py-4 font-bold text-emerald-400">{r.score}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            r.status === 'COMPLETED' ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900" :
                              r.status === 'CHEATED' ? "bg-red-950/50 text-red-400 border border-red-900" :
                                "bg-blue-950/50 text-blue-400 border border-blue-900"
                          )}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button variant="ghost" onClick={() => {
              setSession(null)
              setResults([])
              sessionStorage.removeItem('test_user_id')
              sessionStorage.removeItem('test_user_name')
            }} className="text-slate-400 hover:text-white font-serif">Not {session.firstName}? Logout</Button>
          </div>
        </div>
      )}
    </main>
  )
}
