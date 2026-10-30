// app/about/page.tsx
'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <main className="grow max-w-4xl mx-auto px-6 py-16 w-full">
        
        {/* Back Link */}
        <Link href="/" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        {/* Header Section */}
        <div className="mb-12 text-center">
          <span className="text-xs uppercase font-semibold tracking-wider px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full">
            Inform. Educate. Empower.
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4 text-zinc-900 dark:text-white">
            About Viable Info
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Your destination for useful knowledge, practical insights, and information that helps you make better-informed decisions.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 rounded-3xl shadow-sm space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-lg">
              We believe that knowledge is more than information—it is a tool for personal growth, better choices, new opportunities, and positive change.
            </p>
            <p>
              In a world where information is everywhere, finding content that is clear, useful, relevant, and trustworthy matters more than ever. That's why Viable Info exists: to make valuable knowledge accessible and help people understand the world around them.
            </p>
            <p>
              Whether you're looking to improve your personal life, explore a business opportunity, learn about technology, understand health and wellness, or discover new ways to grow, we're here to share information that can help you move forward.
            </p>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800" />

          {/* Who We Are */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Who We Are</h2>
            <p>
              Viable Info is an educational and informational platform created to share knowledge, explore ideas, and provide practical guidance on topics that matter in everyday life.
            </p>
            <p>
              Our content covers a variety of subjects, including business and entrepreneurship, personal development, technology, health and wellness, lifestyle, education, financial awareness, and inspirational ideas.
            </p>
            <p>
              We understand that people have different goals, challenges, interests, and ambitions. Our aim is to provide content that helps readers explore those interests, develop their understanding, and discover practical ways to apply what they learn.
            </p>
            <p>
              We want Viable Info to be more than a place where you read articles. We want it to be a resource you can return to whenever you're looking for an idea, an explanation, a fresh perspective, or a useful next step.
            </p>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800" />

          {/* Our Mission */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Our Mission</h2>
            <p className="font-semibold text-zinc-900 dark:text-white">Our mission is simple:</p>
            <blockquote className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-l-4 border-blue-600 rounded-r-xl italic">
              "To inform people with useful knowledge, educate them through clear and engaging content, and empower them to make informed decisions that support their growth and well-being."
            </blockquote>
            <p>
              We aim to make complex subjects easier to understand, turn useful ideas into practical insights, and encourage continuous learning.
            </p>
            <p>
              Through our articles, guides, and educational content, we strive to help readers become better informed, think more critically, explore opportunities, and approach everyday challenges with greater confidence.
            </p>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800" />

          {/* What We Cover */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">What We Cover</h2>
            <p>We explore a range of subjects designed to inform, educate, and inspire:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">💼 Business & Entrepreneurship</h3>
                <p className="text-sm">Discover business ideas, entrepreneurial insights, practical side hustles, and strategies for exploring opportunities to evaluate your options and ambitions.</p>
              </div>

              <div className="p-5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">🚀 Personal Development</h3>
                <p className="text-sm">Explore self-discipline, productivity, goal setting, confidence, positive habits, and personal growth to help you work towards meaningful goals.</p>
              </div>

              <div className="p-5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">🌿 Health & Wellness</h3>
                <p className="text-sm">Learn about nutrition, healthy habits, physical activity, and general wellness through educational content informed by credible research and established guidance.</p>
              </div>

              <div className="p-5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">💡 Technology & Digital Innovation</h3>
                <p className="text-sm">Explore technology, digital tools, artificial intelligence, online opportunities, and developments shaping the modern world.</p>
              </div>

              <div className="p-5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">🌍 Lifestyle & Everyday Knowledge</h3>
                <p className="text-sm">Discover practical tips, useful explanations, interesting facts, and ideas that can make everyday life easier to understand and navigate.</p>
              </div>

              <div className="p-5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">📚 Education & Inspiration</h3>
                <p className="text-sm">We believe learning never stops. We encourage curiosity, creativity, and a willingness to keep growing through thoughtful perspectives.</p>
              </div>
            </div>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800" />

          {/* Our Commitment to Quality */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Our Commitment to Quality</h2>
            <p>At Viable Info, we believe useful content should do more than attract attention. It should provide genuine value. We aim to create content that is:</p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-zinc-900 dark:text-white">Informative:</strong> We focus on sharing knowledge that helps readers understand topics, explore ideas, and discover useful information.</li>
              <li><strong className="text-zinc-900 dark:text-white">Practical:</strong> Wherever possible, we provide examples, explanations, and actionable suggestions that readers can apply in everyday life.</li>
              <li><strong className="text-zinc-900 dark:text-white">Research-informed:</strong> For factual and research-based topics, we seek credible sources and aim to present information accurately and responsibly.</li>
              <li><strong className="text-zinc-900 dark:text-white">Accessible:</strong> We use clear language and straightforward explanations to make information approachable for people with different levels of experience.</li>
              <li><strong className="text-zinc-900 dark:text-white">Responsible:</strong> We recognise the importance of context, accuracy, and transparency, distinguishing established facts from opinions.</li>
            </ul>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800" />

          {/* Who We Serve & Our Vision */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Who We Serve</h2>
              <p>
                Viable Info is built for curious minds, lifelong learners, ambitious individuals, and anyone who believes that useful knowledge can create opportunities for growth.
              </p>
              <p>
                Whether you're a student exploring new possibilities, a professional developing your skills, an aspiring entrepreneur researching an idea, or simply someone who enjoys learning something new, we welcome you. You don't need to have all the answers to begin—only a willingness to learn.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Our Vision</h2>
              <p>
                Our vision is to grow Viable Info into a trusted destination for accessible knowledge, practical education, and ideas that help people make informed choices.
              </p>
              <p>
                As we grow, our commitment remains the same: to put value, clarity, and the needs of our readers at the centre of what we create.
              </p>
            </div>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800" />

          {/* Join the Community */}
          <div className="space-y-4 text-center pt-2">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Join the Viable Info Community</h2>
            <p className="max-w-xl mx-auto">
              Knowledge becomes even more valuable when people share ideas, exchange perspectives, and learn from one another. We invite you to explore our articles, discover new topics, and join the conversation.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
              >
                Get in Touch
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold rounded-xl transition"
              >
                Explore Articles
              </Link>
            </div>
            
            <p className="text-xs text-zinc-400 pt-6">
              Thank you for being part of our journey. <br />
              <strong className="text-zinc-700 dark:text-zinc-300">Viable Info</strong> — Inform. Educate. Empower.
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}