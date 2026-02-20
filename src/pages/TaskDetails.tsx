import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const MOCK_TASK = {
    id: "1",
    title: "Build React Frontend",
    description: "I need a complete React frontend built for my campus startup idea. The design is ready in Figma. You must know TailwindCSS.",
    category: "coding",
    budget: 800,
    deadline: "2026-03-01T12:00:00",
    priority: "urgent",
    status: "OPEN",
    tags: ["React", "CSS", "Tailwind"],
    client_id: "user_client_1",
    client_name: "Sarah Jenkins"
}

const MOCK_APPLICANTS = [
    { id: "app1", freelancer_id: "user_free_1", name: "Alex Kumar", reliability: 4.8, pitch: "I've built 4 React apps. Can do this in 2 days." },
    { id: "app2", freelancer_id: "user_free_2", name: "Priya Sharma", reliability: 4.2, pitch: "Available full-time tomorrow to finish this fast." }
]

export default function TaskDetails() {
    const { session } = useAuth()

    // MOCK: Toggle this to see the client view vs freelancer view
    const isClientOwner = session?.user?.id === MOCK_TASK.client_id
    const [pitch, setPitch] = useState("")
    const [applied, setApplied] = useState(false)

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault()
        if (!pitch) return
        setApplied(true)
        alert("Application sent successfully!")
    }

    const handleAssign = (applicantName: string) => {
        alert(`Task assigned to ${applicantName}! Escrow flow would start now.`)
    }

    // Assuming task is found
    const task = MOCK_TASK

    return (
        <div className="container mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Task Information (Left Column) */}
            <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="secondary" className="capitalize">{task.category}</Badge>
                        <Badge variant={task.priority === 'urgent' ? 'destructive' : 'outline'} className="capitalize">{task.priority}</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{task.status}</Badge>
                    </div>

                    <h1 className="text-3xl font-bold">{task.title}</h1>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground border-b pb-4">
                        <span>Posted by <span className="font-semibold text-foreground">{task.client_name}</span></span>
                        <span>•</span>
                        <span>Deadline: {new Date(task.deadline).toLocaleString()}</span>
                    </div>
                </div>

                <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                    <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{task.description}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {task.tags.map(tag => (
                            <Badge variant="outline" key={tag}>{tag}</Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Sidebar (Right Column) */}
            <div className="space-y-6">
                <Card className="border-primary/20 shadow-md">
                    <CardHeader className="bg-primary/5 pb-4">
                        <CardDescription className="font-semibold text-primary">Budget</CardDescription>
                        <CardTitle className="text-4xl text-green-600">₹{task.budget}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {!session ? (
                            <div className="text-center space-y-4">
                                <p className="text-sm text-muted-foreground">Sign in to apply for this task.</p>
                                <Link to="/login"><Button className="w-full">Sign In</Button></Link>
                            </div>
                        ) : isClientOwner ? (
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <p className="font-medium">You posted this task.</p>
                                <p className="text-sm text-muted-foreground mt-1">Review your applicants below.</p>
                            </div>
                        ) : applied ? (
                            <div className="text-center p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
                                <p className="font-medium">✨ Application Submitted!</p>
                                <p className="text-sm mt-1">The client will review your pitch.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleApply} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Your Pitch</label>
                                    <Textarea
                                        placeholder="Why are you the best fit? How long will it take?"
                                        className="resize-none"
                                        value={pitch}
                                        onChange={(e) => setPitch(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">Apply for Job</Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* Client View: Applicants List */}
                {isClientOwner && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Applicants ({MOCK_APPLICANTS.length})</h3>
                        <div className="space-y-4">
                            {MOCK_APPLICANTS.map(app => (
                                <Card key={app.id}>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-base">{app.name}</CardTitle>
                                                    <CardDescription>⭐ {app.reliability} Reliability</CardDescription>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-3">
                                        <p className="text-sm italic text-muted-foreground">"{app.pitch}"</p>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="flex gap-2 w-full">
                                            <Button variant="outline" className="w-full">Chat</Button>
                                            <Button onClick={() => handleAssign(app.name)} className="w-full">Assign</Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
