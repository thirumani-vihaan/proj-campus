
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, Clock, Briefcase, Star } from "lucide-react"
import { Link } from "react-router-dom"

export default function Dashboard() {
    // Mock data for Freelancer
    const walletBalance = 1250
    const escrowBalance = 500
    const reliabilityScore = 4.8

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
                        <div className="text-2xl font-bold">₹{walletBalance}</div>
                        <p className="text-xs text-muted-foreground mt-1">Ready to withdraw or spend</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Locked in Escrow</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-muted-foreground">₹{escrowBalance}</div>
                        <p className="text-xs text-muted-foreground mt-1">Held securely for ongoing tasks</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reliability Score</CardTitle>
                        <Star className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reliabilityScore} / 5.0</div>
                        <p className="text-xs text-muted-foreground mt-1">Based on 12 completed tasks</p>
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
                                    Active Assignments (1)
                                </CardTitle>
                                <CardDescription>Work you are currently doing for clients.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border rounded-lg p-4 flex justify-between items-center bg-muted/20">
                                    <div>
                                        <h4 className="font-semibold">Fix bug in React App</h4>
                                        <p className="text-sm text-muted-foreground">Client: John D. • Due Tomorrow</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-green-600">₹500</div>
                                        <Badge className="mt-1" variant="secondary">In Progress</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pending Applications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-orange-500" />
                                    Pending Applications (2)
                                </CardTitle>
                                <CardDescription>Waiting for client approval.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border rounded-lg p-4 flex justify-between items-center opacity-80">
                                    <div>
                                        <h4 className="font-semibold">Logo Design for Society</h4>
                                        <p className="text-sm text-muted-foreground">Applied 2 hours ago</p>
                                    </div>
                                    <Badge variant="outline">Pending</Badge>
                                </div>
                                <div className="border rounded-lg p-4 flex justify-between items-center opacity-80">
                                    <div>
                                        <h4 className="font-semibold">Python Script Debugging</h4>
                                        <p className="text-sm text-muted-foreground">Applied yesterday</p>
                                    </div>
                                    <Badge variant="outline">Pending</Badge>
                                </div>
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
                                    Action Required (1)
                                </CardTitle>
                                <CardDescription>Review applicants for your posted tasks.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-semibold text-lg">Build React Frontend</h4>
                                            <p className="text-sm text-muted-foreground">Posted 5 hours ago</p>
                                        </div>
                                        <Badge variant="destructive">2 New Applicants</Badge>
                                    </div>
                                    <Link to="/tasks/1">
                                        <Button className="w-full" variant="default">Review Applicants</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ongoing Client Tasks */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-blue-500" />
                                    Ongoing Tasks (1)
                                </CardTitle>
                                <CardDescription>Tasks currently being done by freelancers.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg p-4 flex justify-between items-center bg-muted/20">
                                    <div>
                                        <h4 className="font-semibold">Need Printouts from Library</h4>
                                        <p className="text-sm text-muted-foreground">Freelancer: Amit S. • Due Today</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <Badge variant="secondary">Assigned</Badge>
                                        <Button size="sm" variant="outline">Message</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
