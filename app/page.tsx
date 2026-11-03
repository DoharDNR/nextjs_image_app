"use client";

import { useEffect, useState } from "react";

const faqItems = [
  {
    question: "First question goes here",
    answer: "Answer text for the first item. Replace this with your own content.",
    defaultOpen: true,
  },
  {
    question: "Second question goes here",
    answer: "Answer text for the second item. Replace this with your own content.",
    defaultOpen: false,
  },
  {
    question: "Third question goes here",
    answer: "Answer text for the third item. Replace this with your own content.",
    defaultOpen: false,
  },
];

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const nextDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(nextDark);
      document.documentElement.classList.toggle("dark", nextDark);
    } catch {
      setDark(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // no-op
    }
  }, [dark]);

  return (
    <div className="bg-paper font-sans text-ink antialiased transition-colors duration-200">
      <button
        type="button"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setDark((current) => !current)}
        className="fixed right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-line bg-card text-ink transition hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:right-8 sm:top-8"
      >
        <svg className="size-5 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
        <svg className="hidden size-5 dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </button>

      <main className="mx-auto flex min-h-screen max-w-6xl items-center p-4 pt-20 sm:p-8 sm:pt-24">
        <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-card lg:flex-row">
          <section className="flex flex-1 flex-col justify-center p-6 sm:p-10 lg:p-14">
            <h1 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">Good to know</h1>

            <div className="divide-y divide-line border-y border-line">
              {faqItems.map(({ question, answer, defaultOpen }) => (
                <details key={question} className="group py-1" open={defaultOpen}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded py-4 text-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                    {question}
                    <svg
                      className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="pb-4 leading-relaxed text-mute">{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="relative min-h-72 flex-1 sm:min-h-96 lg:min-h-0">
            <div className="absolute inset-0 bg-img" role="img" aria-label="Card image" />
          </section>
        </article>
      </main>
    </div>
  );
}
