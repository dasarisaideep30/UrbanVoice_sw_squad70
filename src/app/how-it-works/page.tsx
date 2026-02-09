import Navbar from "@/components/navbar";
import { Camera, Send, CheckCircle2 } from "lucide-react";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />
            <main className="container mx-auto px-4 pt-32">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-5xl font-black tracking-tighter mb-6">How It Works</h1>
                    <p className="text-xl text-muted-foreground">
                        Three simple steps to make a difference in your community.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {[
                        { title: "1. Snap & Describe", desc: "Take a photo of the issue and add a brief description.", icon: Camera, color: "text-purple-500" },
                        { title: "2. Submit Instantly", desc: "Your report is automatically routed to the correct department.", icon: Send, color: "text-blue-500" },
                        { title: "3. Track Resolution", desc: "Get real-time updates as officials fix the problem.", icon: CheckCircle2, color: "text-green-500" },
                    ].map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <div className={`p-6 rounded-full bg-white/5 mb-6 ${step.color}`}>
                                <step.icon className="h-12 w-12" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
