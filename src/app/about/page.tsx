import Navbar from "@/components/navbar";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />
            <main className="container mx-auto px-4 pt-32 max-w-4xl">
                <h1 className="text-5xl font-black tracking-tighter mb-6">About UrbanVoice</h1>
                <div className="prose prose-invert max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        UrbanVoice is a platform dedicated to bridging the gap between citizens and city officials.
                        We believe that every voice matters, and by empowering citizens to report issues effortlessly,
                        we can build better, safer, and cleaner cities together.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 my-12">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-muted-foreground">To create transparency and accountability in urban management through technology.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="text-muted-foreground">A world where every city is responsive to the needs of its people.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
