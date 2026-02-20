import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// In a real app, this would save to Supabase "profiles" table
export default function Profile() {
    const { session } = useAuth()
    const [saving, setSaving] = useState(false)

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setTimeout(() => {
            setSaving(false)
            alert("Profile saved successfully!")
        }, 1000)
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-3xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Your Profile</CardTitle>
                    <CardDescription>Update your campus freelance details and availability status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-8">
                        {/* Availability Status System */}
                        <div className="space-y-4 bg-muted/30 p-5 rounded-lg border border-border">
                            <div>
                                <Label className="text-base font-semibold">Availability Status System ⭐</Label>
                                <p className="text-sm text-muted-foreground mb-4">Let clients know if you can take urgent tasks right now.</p>
                            </div>
                            <RadioGroup defaultValue="busy" className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2 bg-background p-2 rounded border">
                                    <RadioGroupItem value="freenow" id="freenow" />
                                    <Label htmlFor="freenow" className="text-green-600 font-medium cursor-pointer">🟢 Free Now</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-background p-2 rounded border">
                                    <RadioGroupItem value="free1hr" id="free1hr" />
                                    <Label htmlFor="free1hr" className="cursor-pointer">🕒 Free for 1 Hour</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-background p-2 rounded border">
                                    <RadioGroupItem value="freetonight" id="freetonight" />
                                    <Label htmlFor="freetonight" className="cursor-pointer">🌙 Free Tonight</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-background p-2 rounded border">
                                    <RadioGroupItem value="freeweekend" id="freeweekend" />
                                    <Label htmlFor="freeweekend" className="cursor-pointer">📅 Free Weekends</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-background p-2 rounded border">
                                    <RadioGroupItem value="busy" id="busy" />
                                    <Label htmlFor="busy" className="text-red-500 font-medium cursor-pointer">🔴 Busy</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">College Email (Verified)</Label>
                                <Input id="email" type="email" placeholder="rollno@college.edu"
                                    value={session?.user?.email || ""} disabled className="bg-muted cursor-not-allowed" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="department">Department / Major</Label>
                                <Select>
                                    <SelectTrigger id="department">
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cs">Computer Science</SelectItem>
                                        <SelectItem value="it">Information Technology</SelectItem>
                                        <SelectItem value="ece">Electronics</SelectItem>
                                        <SelectItem value="mech">Mechanical</SelectItem>
                                        <SelectItem value="design">Design</SelectItem>
                                        <SelectItem value="business">Business</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year">Year of Study</Label>
                                <Select>
                                    <SelectTrigger id="year">
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1st Year</SelectItem>
                                        <SelectItem value="2">2nd Year</SelectItem>
                                        <SelectItem value="3">3rd Year</SelectItem>
                                        <SelectItem value="4">4th Year</SelectItem>
                                        <SelectItem value="5">Masters / PhD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="skills">Skills (Comma separated tags)</Label>
                            <Input id="skills" placeholder="e.g. C++, Photoshop, Math Tutoring, Delivery, Excel" />
                            <p className="text-xs text-muted-foreground">These tags help clients find you in search.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Short Bio</Label>
                            <Textarea id="bio" placeholder="Brief introduction about yourself and what you're best at..." className="h-24 resize-none" />
                        </div>

                        <Button type="submit" className="w-full" disabled={saving}>
                            {saving ? "Saving Changes..." : "Save Profile"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
