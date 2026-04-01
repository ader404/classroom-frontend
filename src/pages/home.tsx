import { Link } from "react-router";
import {
  BadgeCheck,
  BookOpen,
  GraduationCap,
  LineChart,
  Sparkles,
  Users,
} from "lucide-react";

const values = [
  {
    title: "Teaching focus",
    description:
      "Small cohorts and studio-led sessions built for deep understanding.",
    icon: Sparkles,
  },
  {
    title: "Quality content",
    description:
      "Programs are reviewed annually with industry advisory boards.",
    icon: BadgeCheck,
  },
  {
    title: "Progress analytics",
    description:
      "Personalized insights help students and advisors stay aligned.",
    icon: LineChart,
  },
];

const teachers = [
  { name: "Christine Howard", role: "Head of Economics" },
  { name: "Sandra White", role: "Associate Professor" },
  { name: "Jimmy Cooper", role: "Lecturer, CompSci" },
];

const faqs = [
  "How do I apply for early admission?",
  "Can international students apply?",
  "Do you offer scholarships or aid?",
  "Are hybrid programs available?",
  "How do I contact academic advisors?",
];

export const Home = () => {
  return (
    <div className="min-h-svh bg-[#f7f3ef] text-slate-900">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-8">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2f32d6] text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="text-sm font-semibold">Evergreen</div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-500 md:flex">
            <span>Programs</span>
            <span>Admissions</span>
            <span>Faculty</span>
            <span>Support</span>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-[#2f32d6] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#3b3ff1]"
            >
              Sign up
            </Link>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="rounded-3xl bg-[#fcefe6] p-10">
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              A unique approach to learning in a private university setting.
            </h1>
            <p className="mt-4 text-sm text-slate-500">
              Future-facing curricula, intentional mentorship, and a secure
              portal for every learner.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/register"
                className="rounded-full bg-[#2f32d6] px-5 py-2 text-xs font-semibold text-white"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-[#2f32d6]/30 bg-white px-5 py-2 text-xs font-semibold text-[#2f32d6]"
              >
                Explore portal
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Student profile</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                Active
              </span>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#2f32d6]/10 to-[#2f32d6]/40" />
              <div>
                <p className="text-sm font-semibold">Admissions Preview</p>
                <p className="mt-1 text-xs text-slate-500">
                  Class of 2026 • Scholarship track
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 py-3">
                <p className="text-sm font-semibold text-slate-900">18</p>
                Credits
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 py-3">
                <p className="text-sm font-semibold text-slate-900">92%</p>
                Progress
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 py-3">
                <p className="text-sm font-semibold text-slate-900">4.0</p>
                GPA
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Our values
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-6 text-left shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f1ff] text-[#2f32d6]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Meet our teachers
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {teachers.map((teacher) => (
              <div
                key={teacher.name}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >
                <div className="h-32 rounded-2xl bg-gradient-to-br from-[#f6f3ff] to-[#e9e7ff]" />
                <h4 className="mt-4 text-sm font-semibold">{teacher.name}</h4>
                <p className="mt-1 text-xs text-slate-500">{teacher.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Our students say
            </p>
            <div className="mt-6 h-40 rounded-2xl bg-gradient-to-br from-[#ffe6d6] to-[#f9d8c0]" />
            <p className="mt-4 text-sm font-semibold">Martin Watson</p>
            <p className="mt-2 text-xs text-slate-500">
              "The portal makes it easy to stay on top of my courses and
              connect with faculty quickly."
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Common questions
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {faqs.map((faq) => (
                <div
                  key={faq}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600"
                >
                  <span>{faq}</span>
                  <div className="h-2 w-2 rounded-full bg-[#2f32d6]" />
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-[#2f32d6] p-5 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                Support
              </p>
              <p className="mt-2 text-sm font-semibold">
                Book a private admissions session
              </p>
              <p className="mt-2 text-xs text-white/70">
                Our advisors respond within 24 hours on weekdays.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Get a free trial lesson today
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <input
              className="h-10 w-64 rounded-full border border-slate-200 bg-white px-4 text-xs text-slate-600 outline-none focus:border-[#2f32d6]"
              placeholder="Enter your email address"
            />
            <button className="h-10 rounded-full bg-[#2f32d6] px-6 text-xs font-semibold text-white">
              Send
            </button>
          </div>
        </section>

        <footer className="mt-16 rounded-3xl bg-white p-6 text-xs text-slate-500 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2f32d6] text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
              Evergreen University
            </div>
            <div className="flex flex-wrap gap-6">
              <span>Programs</span>
              <span>Admissions</span>
              <span>Faculty</span>
              <span>Support</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
