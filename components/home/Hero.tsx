// components/home/Hero.tsx
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative rounded-2xl overflow-hidden bg-linear-to-br from-zinc-900 via-black to-zinc-900 text-white py-24 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-size-[50px_50px] opacity-30"></div>
     
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 mt-0">
        
         <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/10">
          <span className="text-emerald-400">●</span>
          <span className="text-sm font-medium tracking-wide">NEW ARTICLES EVERY WEEK</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
          Stories that <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">inspire</span>
        </h1>

        <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10">
           Welcome to Viable Info! 
           <br />
           <br />

           Your destination for useful information, practical ideas, and knowledge that empowers you to grow.

           We cover technology, business, education, personal development, lifestyle, health, wellness opportunities, and inspirational topics.

           Our mission is to inform, educate, and empower people through valuable articles, engaging practical tips, and fresh perspectives.

           Follow Viable Info and discover something valuable every day!

           Inform. Educate. Empower.

           </p>


        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blog"
            className="group bg-white text-black hover:bg-emerald-400 hover:text-white transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-lg flex items-center gap-3 shadow-xl shadow-black/30"
          >
            Start Reading
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          <Link
            href="#latest"
            className="px-8 py-4 border border-white/30 hover:bg-white/10 backdrop-blur-md rounded-2xl font-medium transition-all duration-300"
          >
            Browse Latest
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}