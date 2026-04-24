"use client";

import { useEffect, useState, type ReactNode } from "react";

type Resource = {
  id: number;
  category: string;
  title: string;
  preview: string;
  time: string;
  gradient: string;
  art: ReactNode;
  body: ReactNode;
};

const RESOURCES: Resource[] = [
  {
    id: 1,
    category: "Getting Started",
    title: "Your first week on GLP-1: what to expect",
    preview:
      "A simple guide to your first few days of treatment, common experiences, and tips for success.",
    time: "4 min read",
    gradient:
      "linear-gradient(135deg, rgba(124,154,130,0.15), rgba(124,154,130,0.05))",
    art: (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <circle cx={60} cy={70} r={40} fill="rgba(124,154,130,0.12)" />
        <circle cx={140} cy={60} r={24} fill="rgba(124,154,130,0.08)" />
        <rect x={80} y={90} width={60} height={6} rx={3} fill="rgba(124,154,130,0.15)" />
      </svg>
    ),
    body: (
      <>
        <p>
          Starting GLP-1 medication is a significant step in your wellness
          journey. Here is what you can expect during your first week.
        </p>
        <h3>Day 1–2: Your First Injection</h3>
        <p>
          Your medication kit arrives with clear instructions. Most patients
          administer their first injection in the morning. You may feel a
          slight pinch at the injection site, similar to a small mosquito
          bite. This is completely normal.
        </p>
        <h3>Day 3–4: Adjusting</h3>
        <p>
          Many patients begin noticing reduced appetite within the first few
          days. Some experience mild nausea, which typically subsides as your
          body adjusts. Stay hydrated and eat smaller, more frequent meals.
        </p>
        <h3>Day 5–7: Finding Your Rhythm</h3>
        <p>
          By the end of the first week, most patients have established a
          comfortable routine. You may notice you feel fuller faster during
          meals and have fewer cravings between them.
        </p>
        <ul>
          <li>Take your injection at the same time each week</li>
          <li>
            Rotate injection sites between your abdomen, thigh, and upper arm
          </li>
          <li>Keep a log of how you feel each day</li>
          <li>Reach out to your care team with any questions</li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    category: "Side Effects",
    title: "Managing common side effects",
    preview:
      "Nausea, fatigue, and appetite changes are common early on. Here is how to manage them effectively.",
    time: "5 min read",
    gradient:
      "linear-gradient(135deg, rgba(224,122,95,0.12), rgba(224,122,95,0.04))",
    art: (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <rect
          x={40}
          y={30}
          width={50}
          height={50}
          rx={12}
          fill="rgba(224,122,95,0.1)"
          transform="rotate(15 65 55)"
        />
        <circle cx={140} cy={80} r={30} fill="rgba(224,122,95,0.08)" />
        <rect x={60} y={100} width={80} height={5} rx={2.5} fill="rgba(224,122,95,0.12)" />
      </svg>
    ),
    body: (
      <>
        <p>
          Side effects are a normal part of starting GLP-1 therapy.
          Understanding them helps you stay on track.
        </p>
        <h3>Nausea</h3>
        <p>
          The most commonly reported side effect. It usually peaks in the
          first 1–2 weeks and diminishes as your body adjusts. Eating bland
          foods, staying hydrated, and avoiding large meals can help
          significantly.
        </p>
        <h3>Appetite Changes</h3>
        <p>
          Reduced appetite is actually the medication working as intended.
          However, it is important to still maintain adequate nutrition.
          Focus on protein-rich foods and vegetables even if portions are
          smaller.
        </p>
        <h3>When to Contact Your Provider</h3>
        <p>
          Reach out to your care team if you experience persistent vomiting,
          severe abdominal pain, or any symptoms that concern you. Your
          provider can adjust your dose or recommend strategies to help.
        </p>
      </>
    ),
  },
  {
    id: 3,
    category: "Nutrition",
    title: "Eating well on GLP-1 therapy",
    preview:
      "Your appetite will change. Here is how to make sure you are getting the nutrients your body needs.",
    time: "6 min read",
    gradient:
      "linear-gradient(135deg, rgba(212,197,178,0.2), rgba(212,197,178,0.05))",
    art: (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <circle cx={70} cy={60} r={35} fill="rgba(212,197,178,0.2)" />
        <circle cx={130} cy={80} r={20} fill="rgba(212,197,178,0.15)" />
        <rect x={50} y={105} width={100} height={5} rx={2.5} fill="rgba(212,197,178,0.25)" />
      </svg>
    ),
    body: (
      <>
        <p>
          As your appetite decreases, making every bite count becomes more
          important. Here are evidence-based nutrition strategies for
          patients on GLP-1 medications.
        </p>
        <h3>Prioritize Protein</h3>
        <p>
          Aim for 25–30 grams of protein per meal. This helps preserve lean
          muscle mass during weight loss and keeps you feeling satisfied
          longer.
        </p>
        <h3>Stay Hydrated</h3>
        <p>
          Drink at least 64 ounces of water daily. Proper hydration supports
          metabolism and can help reduce nausea. Consider adding electrolytes
          if you are eating significantly less.
        </p>
        <h3>Sample Meal Ideas</h3>
        <ul>
          <li>Greek yogurt with berries and nuts</li>
          <li>Grilled chicken with roasted vegetables</li>
          <li>Salmon with quinoa and steamed greens</li>
          <li>Cottage cheese with sliced fruit</li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    category: "Mindset",
    title: "Building sustainable habits beyond medication",
    preview:
      "Medication is a tool, not a finish line. How to build the behaviors that last.",
    time: "4 min read",
    gradient:
      "linear-gradient(135deg, rgba(124,154,130,0.1), rgba(212,197,178,0.1))",
    art: (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <rect x={30} y={40} width={40} height={40} rx={20} fill="rgba(124,154,130,0.1)" />
        <rect x={90} y={50} width={30} height={30} rx={15} fill="rgba(212,197,178,0.2)" />
        <rect x={140} y={35} width={35} height={35} rx={17.5} fill="rgba(124,154,130,0.08)" />
        <rect x={40} y={100} width={120} height={5} rx={2.5} fill="rgba(212,197,178,0.2)" />
      </svg>
    ),
    body: (
      <>
        <p>
          GLP-1 medication gives you a powerful head start, but the habits
          you build alongside it determine your long-term success.
        </p>
        <h3>Start Small</h3>
        <p>
          Focus on one new habit at a time. Whether it is a daily walk, meal
          prepping on Sundays, or drinking more water, small consistent
          changes compound over time.
        </p>
        <h3>Track Your Wins</h3>
        <p>
          Weight is just one metric. Notice improvements in energy, sleep,
          mood, and how your clothes fit. These non-scale victories often
          matter more for long-term motivation.
        </p>
        <h3>Plan for Plateaus</h3>
        <p>
          Every weight loss journey includes plateaus. They are a normal
          physiological response, not a sign of failure. Your care team can
          help you navigate these moments.
        </p>
      </>
    ),
  },
  {
    id: 5,
    category: "Plateaus",
    title: "Why weight loss plateaus happen (and what to do)",
    preview:
      "Hit a stall? That is normal. Understanding the science behind plateaus can help you push through.",
    time: "5 min read",
    gradient:
      "linear-gradient(135deg, rgba(139,164,196,0.12), rgba(139,164,196,0.04))",
    art: (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <polyline
          points="20,100 60,80 100,82 140,60 180,40"
          fill="none"
          stroke="rgba(139,164,196,0.3)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle cx={100} cy={82} r={6} fill="rgba(139,164,196,0.2)" />
        <rect x={60} y={110} width={80} height={5} rx={2.5} fill="rgba(139,164,196,0.15)" />
      </svg>
    ),
    body: (
      <>
        <p>
          You have been making great progress, and then the scale stops
          moving. Sound familiar? Weight loss plateaus are one of the most
          common and frustrating experiences, but they are completely
          normal.
        </p>
        <h3>The Science</h3>
        <p>
          As you lose weight, your body adapts by lowering its metabolic
          rate. This is an evolutionary survival mechanism. Your body is
          trying to maintain equilibrium, not sabotage your efforts.
        </p>
        <h3>What You Can Do</h3>
        <ul>
          <li>Review your protein intake and make sure it is adequate</li>
          <li>Consider adding or varying your physical activity</li>
          <li>Ensure you are getting 7–9 hours of quality sleep</li>
          <li>Talk to your provider about a dose adjustment</li>
        </ul>
        <p>
          Most plateaus resolve within 2–4 weeks. Stay consistent with your
          habits and trust the process.
        </p>
      </>
    ),
  },
  {
    id: 6,
    category: "Community",
    title: "You are not alone: stories from the Nuvela community",
    preview:
      "Real perspectives from people navigating the same journey. Connection makes the difference.",
    time: "3 min read",
    gradient:
      "linear-gradient(135deg, rgba(224,122,95,0.08), rgba(124,154,130,0.08))",
    art: (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <circle cx={60} cy={60} r={20} fill="rgba(224,122,95,0.1)" />
        <circle cx={100} cy={70} r={25} fill="rgba(124,154,130,0.1)" />
        <circle cx={145} cy={55} r={18} fill="rgba(212,197,178,0.2)" />
        <rect x={40} y={105} width={120} height={5} rx={2.5} fill="rgba(212,197,178,0.15)" />
      </svg>
    ),
    body: (
      <>
        <p>
          Weight loss can feel isolating, but thousands of people are on
          this same path. While we cannot share individual stories without
          permission, here is what we hear most often from our community.
        </p>
        <h3>Common Themes</h3>
        <ul>
          <li>
            Relief at finally having medical support for weight management
          </li>
          <li>
            Surprise at how quickly appetite changes take effect
          </li>
          <li>Gratitude for having a provider who listens and adjusts</li>
          <li>
            Pride in non-scale victories like improved energy and confidence
          </li>
        </ul>
        <p>
          Your care team is here for the tough days and the wins. Do not
          hesitate to reach out anytime.
        </p>
      </>
    ),
  },
];

export default function ResourcesPage() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = RESOURCES.find((r) => r.id === activeId) ?? null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (active) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [active]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-7">
        <h1 className="font-display text-[28px] font-medium leading-tight tracking-tight text-foreground">
          Resources
        </h1>
        <p className="mt-1 text-[14px] text-foreground/55">
          Learn more about your treatment journey
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setActiveId(r.id)}
            className="group overflow-hidden rounded-2xl border border-secondary/40 bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              className="relative flex h-[140px] items-center justify-center"
              style={{ background: r.gradient }}
            >
              {r.art}
              <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[11.5px] font-semibold text-foreground backdrop-blur">
                {r.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="mb-2 text-[15px] font-semibold leading-snug text-foreground">
                {r.title}
              </h3>
              <p className="mb-3 line-clamp-2 text-[13.5px] leading-relaxed text-foreground/55">
                {r.preview}
              </p>
              <div className="text-[12px] font-medium text-foreground/40">
                {r.time}
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveId(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resource-title"
        >
          <div className="flex max-h-[85vh] w-full max-w-[680px] flex-col overflow-hidden rounded-[20px] bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-secondary/25 px-7 pb-4 pt-6">
              <h2
                id="resource-title"
                className="flex-1 pr-4 font-display text-[20px] font-semibold leading-snug text-foreground"
              >
                {active.title}
              </h2>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Close"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-secondary/30 text-foreground transition-colors hover:bg-secondary/50"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                  aria-hidden
                >
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3 px-7 pt-3 text-[13px] text-foreground/55">
              <span className="rounded-full bg-secondary/30 px-3 py-1 text-[11.5px] font-semibold text-foreground">
                {active.category}
              </span>
              <span>{active.time}</span>
            </div>
            <div className="overflow-y-auto px-7 pb-8 pt-5 text-[15px] leading-[1.7] text-foreground [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-[17px] [&_h3]:font-semibold [&_li]:mb-1.5 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
              {active.body}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
