
"use client"
// app/page.tsx
import Hero from '@/components/home/Hero';
import LatestArticles from '@/components/home/LatestArticles';
import HighlightInsights from '@/components/home/HighlightInsights';



export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
     
      <Hero />
      <LatestArticles />
     <HighlightInsights/>
      
    </main>
  );
}