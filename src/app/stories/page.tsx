import Navbar from "@/components/navbar";

export default function StoriesPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />
            <main className="container mx-auto px-4 pt-32">
                <h1 className="text-5xl font-black tracking-tighter mb-12 text-center">Impact Stories</h1>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {[1, 2].map((i) => (
                        <div key={i} className="group relative aspect-video rounded-2xl overflow-hidden bg-muted">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Park Restoration in Sector 9</h3>
                                    <p className="text-white/80">"Thanks to UrbanVoice, our kids finally have a safe place to play."</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
