"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Map as MapIcon, Filter, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Mock data for MVP visualization
const MOCK_TASKS = [
    { id: "1", title: "Large Pothole on 5th Ave", location: "Downtown", status: "PENDING", priority: "HIGH", date: "2 hrs ago" },
    { id: "2", title: "Streetlight Broken", location: "Sector 4", status: "IN_PROGRESS", priority: "MEDIUM", date: "1 day ago" },
    { id: "3", title: "Garbage Pileup", location: "Market Area", status: "PENDING", priority: "CRITICAL", date: "30 mins ago" },
];

export default function OfficerDashboard() {
    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            <main className="container mx-auto px-4 pt-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter">Officer Dashboard</h1>
                        <p className="text-muted-foreground">Manage and resolve assigned grievances.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <MapIcon className="mr-2 h-4 w-4" /> Map View
                        </Button>
                    </div>
                </div>

                {/* Priority Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10">
                        <div className="flex items-center gap-2 mb-2 text-red-500 font-bold">
                            <AlertTriangle className="h-5 w-5" /> Critical
                        </div>
                        <div className="text-3xl font-bold">5</div>
                    </div>
                    <div className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/10">
                        <div className="flex items-center gap-2 mb-2 text-orange-500 font-bold">
                            <AlertTriangle className="h-5 w-5" /> Pending
                        </div>
                        <div className="text-3xl font-bold">12</div>
                    </div>
                    <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/10">
                        <div className="flex items-center gap-2 mb-2 text-blue-500 font-bold">
                            <MapIcon className="h-5 w-5" /> Assigned
                        </div>
                        <div className="text-3xl font-bold">8</div>
                    </div>
                    <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/10">
                        <div className="flex items-center gap-2 mb-2 text-green-500 font-bold">
                            <CheckCircle2 className="h-5 w-5" /> Resolved
                        </div>
                        <div className="text-3xl font-bold">145</div>
                    </div>
                </div>

                {/* Task Board */}
                <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>
                <div className="space-y-3">
                    {MOCK_TASKS.map((task) => (
                        <div key={task.id} className="group p-5 rounded-xl border bg-card hover:border-primary/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${task.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                                            task.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-500' :
                                                'bg-blue-500/20 text-blue-500'
                                        }`}>
                                        {task.priority}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{task.date}</span>
                                </div>
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{task.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <MapIcon className="h-3 w-3" /> {task.location}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <select className="h-10 rounded-md border bg-background px-3 text-sm focus:ring-2 focus:ring-primary">
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="RESOLVED">Resolved</option>
                                </select>
                                <Link href={`/admin/complaints/${task.id}`}>
                                    <Button variant="secondary">View Details</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
