import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, Clock, Briefcase, Star } from "lucide-react"
import { Link } from "react-router-dom"

export default function Dashboard() {
    const { session } = useAuth()

    const [walletBal, setWalletBal] = useState(0)
    const [escrowBal, setEscrowBal] = useState(0)
    const [score, setScore] = useState(0)

    const [activeAssignments, setActiveAssignments] = useState<any[]>([])
    const [pendingApps, setPendingApps] = useState<any[]>([])

    const [actionRequiredTasks, setActionRequiredTasks] = useState<any[]>([])
    const [ongoingClientTasks, setOngoingClientTasks] = useState<any[]>([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!session?.user?.id) return

        const fetchDashboardData = async () => {
            const uid = session.user.id

            // 1. Fetch Profile info (Score)
            const { data: profile } = await supabase.from('profiles').select('reliability_score').eq('id', uid).single()
            if (profile) setScore(profile.reliability_score || 0)

            // 2. Fetch Wallet
            const { data: wallet } = await supabase.from('wallets').select('available_balance, locked_balance').eq('user_id', uid).single()
            if (wallet) {
                setWalletBal(wallet.available_balance || 0)
                setEscrowBal(wallet.locked_balance || 0)
            }

            // 3. Freelancer: Active Assignments
            const { data: assignments } = await supabase.from('tasks')
                .select('*, profiles:client_id(full_name)')
                .eq('assigned_freelancer_id', uid)
                .eq('status', 'ASSIGNED')
            if (assignments) setActiveAssignments(assignments)

            // 4. Freelancer: Pending Applications
            const { data: apps } = await supabase.from('applications')
                .select('*, tasks(title, client_id)')
                .eq('freelancer_id', uid)
                .eq('status', 'PENDING')
            if (apps) setPendingApps(apps)

            // 5. Client: Ongoing Tasks
            const { data: ongoingTasks } = await supabase.from('tasks')
                .select('*, profiles:assigned_freelancer_id(full_name)')
                .eq('client_id', uid)
                .eq('status', 'ASSIGNED')
            if (ongoingTasks) setOngoingClientTasks(ongoingTasks)

            // 6. Client: Action Required (Tasks you posted that have pending applications)
            const { data: pendingTaskApps } = await supabase.from('tasks')
                .select(`
                    id, title, created_at,
                    applications(count)
                `)
                .eq('client_id', uid)
                .eq('status', 'OPEN')
                .eq('applications.status', 'PENDING')

            if (pendingTaskApps) {
                // Filter out tasks that have 0 pending apps
                const actionTasks = pendingTaskApps.filter((t: any) => t.applications[0]?.count > 0)
                setActionRequiredTasks(actionTasks)
            }

            setLoading(false)
        }

        fetchDashboardData()
    }, [session?.user?.id])

    if (!session) return <div className="p-8 text-center">Please log in to view dashboard.</div>
    if (loading) return <div className="p-8 text-center">Loading dashboard...</div>

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Manage your campus tasks and freelance work.</p>
                </div>
                <Link to="/tasks/create">
                    <Button size="lg">Post a New Task</Button>
                </Link>
            </div>

            {/* Global Wallet Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{walletBal}</div>
                        <p className="text-xs text-muted-foreground mt-1">Ready to withdraw or spend</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Locked in Escrow</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-muted-foreground">₹{escrowBal}</div>
                        <p className="text-xs text-muted-foreground mt-1">Held securely for ongoing tasks</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reliability Score</CardTitle>
                        <Star className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{score} / 5.0</div>
                        <p className="text-xs text-muted-foreground mt-1">Official platform rating</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="freelancer" className="space-y-6">
                <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                    <TabsTrigger value="freelancer">Freelancer View</TabsTrigger>
                    <TabsTrigger value="client">Client View</TabsTrigger>
                </TabsList>

                <TabsContent value="freelancer" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Active Assignments */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-blue-500" />
                                    Active Assignments ({activeAssignments.length})
                                </CardTitle>
                                <CardDescription>Work you are currently doing for clients.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {activeAssignments.map(task => (
                                    <div key={task.id} className="border rounded-lg p-4 flex justify-between items-center bg-muted/20">
                                        <div>
                                            <h4 className="font-semibold">{task.title}</h4>
                                            <p className="text-sm text-muted-foreground">Client: {task.profiles?.full_name} • Due: {new Date(task.deadline).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="font-bold text-green-600">₹{task.budget}</div>
                                            <Badge className="mt-1" variant="secondary">In Progress</Badge>
                                            <Link to={`/chat/${task.id}`}>
                                                <Button size="sm" variant="outline">Message Client</Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                {activeAssignments.length === 0 && (
                                    <div className="text-sm text-muted-foreground text-center py-4">No active assignments.</div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Pending Applications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-orange-500" />
                                    Pending Applications ({pendingApps.length})
                                </CardTitle>
                                <CardDescription>Waiting for client approval.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {pendingApps.map(app => (
                                    <div key={app.id} className="border rounded-lg p-4 flex justify-between items-center opacity-80">
                                        <div>
                                            <h4 className="font-semibold">{app.tasks?.title || "Unknown Task"}</h4>
                                            <p className="text-sm text-muted-foreground">Applied {new Date(app.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge variant="outline">Pending</Badge>
                                            {app.tasks?.client_id && (
                                                <Link to={`/chat/${app.task_id}/${app.tasks.client_id}`}>
                                                    <Button size="sm" variant="ghost">Message Client</Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {pendingApps.length === 0 && (
                                    <div className="text-sm text-muted-foreground text-center py-4">No pending applications.</div>
                                )}
                            </CardContent>
                        </Card>

                    </div>
                </TabsContent>

                <TabsContent value="client" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Posted Tasks requiring action */}
                        <Card className="border-primary/50 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500" />
                                    Action Required ({actionRequiredTasks.length})
                                </CardTitle>
                                <CardDescription>Review applicants for your posted tasks.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {actionRequiredTasks.map(task => (
                                    <div key={task.id} className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-semibold text-lg">{task.title}</h4>
                                                <p className="text-sm text-muted-foreground">Posted {new Date(task.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <Badge variant="destructive">{task.applications[0]?.count} New Applicants</Badge>
                                        </div>
                                        <Link to={`/tasks/${task.id}`}>
                                            <Button className="w-full" variant="default">Review Applicants</Button>
                                        </Link>
                                    </div>
                                ))}
                                {actionRequiredTasks.length === 0 && (
                                    <div className="text-sm text-muted-foreground text-center py-4">No action required on any tasks.</div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Ongoing Client Tasks */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-blue-500" />
                                    Ongoing Tasks ({ongoingClientTasks.length})
                                </CardTitle>
                                <CardDescription>Tasks currently being done by freelancers.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {ongoingClientTasks.map(task => (
                                    <div key={task.id} className="border rounded-lg p-4 flex justify-between items-center bg-muted/20">
                                        <div>
                                            <h4 className="font-semibold">{task.title}</h4>
                                            <p className="text-sm text-muted-foreground">Freelancer: {task.profiles?.full_name} • Due: {new Date(task.deadline).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge variant="secondary">Assigned</Badge>
                                            <Link to={`/chat/${task.id}`}>
                                                <Button size="sm" variant="outline">Message</Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                {ongoingClientTasks.length === 0 && (
                                    <div className="text-sm text-muted-foreground text-center py-4">No ongoing tasks.</div>
                                )}
                            </CardContent>
                        </Card>

                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
