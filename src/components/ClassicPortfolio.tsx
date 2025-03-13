"use client";

import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  status?: string;
};

function ProjectCard({ title, description, link, status }: ProjectCardProps) {
  return (
    <div className="p-4 border border-border rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          View Project →
        </a>
        {status && (
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
            {status}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ClassicPortfolio() {
  return (
    <div className="mx-auto max-w-[700px] md:px-2 px-4 antialiased font-mono pb-10">
      <main>
        <h1 className="mt-20 block font-bold text-4xl">Luthfulahi Oseni</h1>
        <h2 className="mb-10">
          Chill guy, committed to building great products
        </h2>
        <p>
          Hi 👋🏽, I&apos;m Luthfulahi Oseni! I&apos;m a senior software engineer
          based in the UAE 🇦🇪. Currently, I&apos;m working on making it seamless
          for fintechs to offer non-custodial stablecoin wallets to their
          customers through{" "}
          <a
            className="underline"
            href="https://www.blockradar.co/"
            target="_blank"
            rel="noreferrer"
          >
            Blockradar
          </a>
          .
        </p>
        <p className="mt-4">
          I recently started documenting my career insights and experiences.
          Curious🤔??? Check out my blog{" "}
          <a
            className="underline visited:text-purple-900"
            target="_blank"
            href="https://luthfulahi.hashnode.dev/"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>

        <p className="mt-4">
          90% of my career has been around startups, because I love challenges
          and the joy that comes with engineering a product from scratch. You
          can find me on LinkedIn{" "}
          <a
            className="underline visited:text-purple-900"
            target="_blank"
            href="https://www.linkedin.com/in/luthfulahi/"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold mt-16 mb-6">AI Projects 🤖</h2>
        <p className="mb-6">
          Here are some AI-powered projects I&apos;ve been tinkering with:
        </p>

        <ProjectCard
          title="AI-Powered Portfolio"
          description="This interactive portfolio uses AI to provide visitors with a dynamic way to learn about my professional background. Chat with the AI to ask about my skills, experiences, or even generate a customized resume."
          link="/ai"
          status="WIP"
        />

        <ProjectCard
          title="News70"
          description="A concise news summarization tool that condenses news articles into 70 words or less. Simply paste a URL or text content, and get the key information without the fluff."
          link="https://news70.vercel.app/"
        />

        <ProjectCard
          title="MoodBite"
          description="Struggling to decide what to eat? MoodBite translates your vague food cravings into specific meal recommendations. Future plans include recipe suggestions and fridge content recognition."
          link="https://moodbite.vercel.app/"
        />

        <ProjectCard
          title="Log Analyzer"
          description="A private middleware tool developed for my previous company that analyzes application error logs, determines criticality, and sends appropriate notifications to the right team members."
          link="#"
          status="Private"
        />

        <div className="mt-10 text-center">
          <Link
            href="/ai"
            className="px-5 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Try the AI-Powered Version 🤖
          </Link>
        </div>
      </main>
    </div>
  );
}
