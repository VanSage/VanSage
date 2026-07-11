import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { FiExternalLink, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { BarChart3, Brain, BriefcaseBusiness, Download, Moon, Sparkles, Sun, Target } from 'lucide-react'

type Theme = 'light' | 'dark'

type Project = {
  slug: string
  title: string
  problem: string
  solution: string
  impact: string
  stack: string[]
  metrics: string
}

const projects: Project[] = [
  {
    slug: 'india-aqi-dashboard',
    title: 'India AQI Dashboard',
    problem: 'Air quality trends were fragmented across multiple data sources.',
    solution: 'Built an interactive Power BI dashboard with city-level drilldowns and anomaly alerts.',
    impact: 'Improved monitoring speed by 42% for weekly AQI reviews.',
    stack: ['Power BI', 'Python', 'SQL'],
    metrics: '120+ cities, 1.2M rows analyzed',
  },
  {
    slug: 'retail-sales-analysis',
    title: 'Retail Sales Analysis',
    problem: 'Revenue dipped without clear product or region-level visibility.',
    solution: 'Created Python-driven cohort analysis and KPI dashboards for decision-makers.',
    impact: 'Identified ₹18L annualized upsell opportunity.',
    stack: ['Python', 'Pandas', 'Excel'],
    metrics: '36 months trend model, 98% data quality score',
  },
  {
    slug: 'customer-segmentation-rfm',
    title: 'Customer Segmentation (RFM)',
    problem: 'Marketing campaigns were broad and costly.',
    solution: 'Used RFM segmentation to classify customer value tiers and automate targeting.',
    impact: 'Increased campaign ROI by 28% in simulation.',
    stack: ['Python', 'SQL', 'Matplotlib'],
    metrics: '8 segments, 3 retention playbooks',
  },
]

const learningData = [
  { week: 'W1', hours: 12, projects: 1 },
  { week: 'W2', hours: 15, projects: 1 },
  { week: 'W3', hours: 18, projects: 2 },
  { week: 'W4', hours: 21, projects: 3 },
  { week: 'W5', hours: 17, projects: 3 },
]

const skillShare = [
  { name: 'Analytics', value: 34 },
  { name: 'Visualization', value: 28 },
  { name: 'Programming', value: 22 },
  { name: 'Communication', value: 16 },
]

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.email('Please enter a valid email'),
  message: z.string().min(20, 'Please provide at least 20 characters'),
})

type ContactInput = z.infer<typeof contactSchema>

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/github', label: 'GitHub Dashboard' },
  { to: '/recruiter', label: 'Recruiter Mode' },
]

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.dataset.theme = next
  }

  document.documentElement.dataset.theme = theme

  return { theme, toggleTheme }
}

function AppShell() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,#2a0f58_0%,#0f172a_35%,#020617_100%)] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-sm font-semibold tracking-[0.2em] text-cyan-300">
            V A N S H I K A
          </Link>
          <div className="flex items-center gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm transition ${isActive ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="rounded-full border border-white/20 p-2 text-slate-200"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/github" element={<GithubDashboard />} />
          <Route path="/recruiter" element={<RecruiterMode />} />
        </Routes>
      </main>
    </div>
  )
}

function Home() {
  const form = useForm<ContactInput>({ resolver: zodResolver(contactSchema) })

  return (
    <div className="space-y-16">
      <section className="grid gap-8 rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-300">
            Final Year BCA Student • Aspiring Data Analyst • Power BI Developer
          </motion.p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Transforming complex datasets into business-winning decisions.
          </h1>
          <p className="max-w-xl text-slate-300">
            I combine analytics, storytelling, and product thinking to build dashboards that turn raw data into
            measurable outcomes.
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="cta" href="mailto:vanshika.rana@example.com">
              <FiMail /> Email
            </a>
            <a className="cta" href="https://github.com/VanSage" target="_blank" rel="noreferrer">
              <FiGithub /> GitHub
            </a>
            <a className="cta" href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FiLinkedin /> LinkedIn
            </a>
            <button type="button" className="cta">
              <Download size={16} /> Resume
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-200/20 bg-slate-950/60 p-4">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-medium">
            <BarChart3 size={18} /> Learning Momentum
          </h2>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={learningData}>
                <defs>
                  <linearGradient id="hours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="hours" stroke="#22d3ee" fillOpacity={1} fill="url(#hours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <motion.article
              key={project.slug}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="mb-2 text-sm text-cyan-300">{project.metrics}</p>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{project.impact}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                    {item}
                  </span>
                ))}
              </div>
              <Link className="mt-4 inline-flex items-center gap-2 text-cyan-300" to={`/projects/${project.slug}`}>
                View case study <FiExternalLink />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="section-title mb-4">Skills Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={skillShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#22d3ee" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="section-title mb-4">Contact</h2>
          <form className="space-y-3" onSubmit={form.handleSubmit(() => form.reset())}>
            <input className="field" placeholder="Name" {...form.register('name')} />
            <input className="field" placeholder="Email" {...form.register('email')} />
            <textarea className="field min-h-28" placeholder="Message" {...form.register('message')} />
            <button type="submit" className="cta w-full justify-center">
              Send Message
            </button>
          </form>
        </article>
      </section>
    </div>
  )
}

function CaseStudy() {
  const { slug } = useParams()
  const project = useMemo(() => projects.find((item) => item.slug === slug), [slug])

  if (!project) {
    return <p>Project not found.</p>
  }

  return (
    <article className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-7">
      <h1 className="text-3xl font-semibold">{project.title}</h1>
      <Section icon={<Target size={16} />} title="Business Problem" text={project.problem} />
      <Section icon={<Brain size={16} />} title="Solution" text={project.solution} />
      <Section icon={<Sparkles size={16} />} title="Business Impact" text={project.impact} />
      <p className="rounded-xl bg-slate-900/70 p-4 text-sm text-slate-300">
        This case-study page is structured for: dataset overview, cleaning process, EDA, insights, recommendations,
        and future improvements.
      </p>
    </article>
  )
}

function Section({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <h2 className="mb-2 flex items-center gap-2 text-lg font-medium">
        {icon} {title}
      </h2>
      <p className="text-slate-300">{text}</p>
    </section>
  )
}

function GithubDashboard() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['repos'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/users/VanSage/repos?per_page=6&sort=updated')
      if (!response.ok) throw new Error('Failed to load GitHub repositories')
      return (await response.json()) as Array<{ id: number; name: string; html_url: string; stargazers_count: number }>
    },
  })

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">GitHub Experience Dashboard</h1>
        <button type="button" className="cta" onClick={() => refetch()}>
          Refresh
        </button>
      </div>
      {isLoading && <p className="panel">Loading GitHub analytics...</p>}
      {isError && <p className="panel">GitHub API unavailable right now. Please try refresh.</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((repo) => (
          <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="panel">
            <h2 className="text-lg font-medium">{repo.name}</h2>
            <p className="text-slate-300">⭐ {repo.stargazers_count} stars</p>
          </a>
        ))}
      </div>
    </section>
  )
}

function RecruiterMode() {
  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-3xl font-semibold">Recruiter Dashboard</h1>
      <p className="text-slate-300">
        Quick summary for hiring teams: top projects, core skills, internship outcomes, and one-click resume access.
      </p>
      <ul className="grid gap-3 md:grid-cols-2">
        <li className="panel">Top Projects: AQI Dashboard, RFM Segmentation, Retail Sales Analytics</li>
        <li className="panel">Skills: Python, SQL, Power BI, Statistics, Business Storytelling</li>
        <li className="panel">Experience: InternInfobyte Virtual Power BI Internship</li>
        <li className="panel">Contact: LinkedIn, Email, GitHub</li>
      </ul>
      <button type="button" className="cta inline-flex items-center gap-2">
        <BriefcaseBusiness size={16} /> Download Resume
      </button>
    </section>
  )
}

export default AppShell
