import { useState, useRef, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"

// Mock Chat Data
const MOCK_MESSAGES = [
    { id: 1, senderId: "client1", text: "Hey! Thanks for taking up this task.", time: "10:00 AM" },
    { id: 2, senderId: "me", text: "No problem! I can start right after my 11 AM class.", time: "10:05 AM" },
    { id: 3, senderId: "client1", text: "Great. Let me know if you need any clarification on the requirements.", time: "10:06 AM" }
]

export default function Chat() {

    const [messages, setMessages] = useState(MOCK_MESSAGES)
    const [newMessage, setNewMessage] = useState("")
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return
        const msg = {
            id: messages.length + 1,
            senderId: "me",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages([...messages, msg])
        setNewMessage("")
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl h-[calc(100vh-8rem)]">
            <Card className="h-full flex flex-col shadow-lg border-primary/20">
                <CardHeader className="border-b bg-muted/30 pb-4">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarFallback className="bg-primary/20 text-primary">C1</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">Chat with Client_1</CardTitle>
                            <p className="text-sm text-green-600 font-medium">Task: Fix bug in React App</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
                    {messages.map((msg) => {
                        const isMe = msg.senderId === "me"
                        return (
                            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${isMe ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"
                                    }`}>
                                    <p className="text-sm">{msg.text}</p>
                                    <p className={`text-[10px] mt-1 ${isMe ? "text-primary-foreground/70" : "text-muted-foreground"} text-right`}>
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={bottomRef} />
                </CardContent>

                <div className="p-4 bg-background border-t mt-auto">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}
