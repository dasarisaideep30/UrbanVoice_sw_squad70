"use client";

import { useState, use } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, User, Send } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function ComplaintDetailsClient({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [status, setStatus] = useState("PENDING");
    const [note, setNote] = useState("");

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            <main className="container mx-auto px-4 pt-24 max-w-4xl">
                <Link href="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Link>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left: Complaint Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="p-6 rounded-2xl border bg-card">
                            <div className=" mb-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold mb-3">CRITICAL PRIORITY</span>
                                <h1 className="text-3xl font-black tracking-tighter mb-2">Large Pothole on 5th Ave details</h1>
                                <p className="text-muted-foreground leading-relaxed">
                                    There is a very large pothole near the main intersection. It caused damage to my vehicle's tire. Please fix it urgently as traffic is high.
                                </p>
                            </div>

                            {/* Mock Image */}
                            <div className="relative aspect-video bg-muted rounded-xl overflow-hidden mb-6 flex items-center justify-center">
                                <span className="text-muted-foreground">Attached Photo Placeholder</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" /> Downtown, Sector 5
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" /> Feb 5, 2026
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <User className="h-4 w-4" /> Jane Citizen
                                </div>
                            </div>
                        </div>

                        {/* Resolution History */}
                        <div className="p-6 rounded-2xl border bg-card">
                            <h2 className="text-lg font-bold mb-4">Activity Log</h2>
                            <div className="space-y-4 border-l-2 border-primary/20 pl-4 ml-2">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary" />
                                    <p className="text-sm font-medium">Assigned to You</p>
                                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-muted-foreground" />
                                    <p className="text-sm font-medium">Complaint Received</p>
                                    <span className="text-xs text-muted-foreground">3 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Action Panel */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl border bg-card sticky top-24">
                            <h2 className="text-lg font-bold mb-4">Update Status</h2>

                            <div className="space-y-4">
                                <div>
                                    <Label>Current Status</Label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="RESOLVED">Resolved</option>
                                        <option value="REJECTED">Rejected</option>
                                    </select>
                                </div>

                                <div>
                                    <Label>Resolution Note</Label>
                                    <textarea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Add a note about the action taken..."
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                                    />
                                </div>

                                <Button className="w-full font-bold">
                                    <Send className="mr-2 h-4 w-4" /> Update Ticket
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
