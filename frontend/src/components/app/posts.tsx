import { useState } from "react"
import { Link } from "react-router"
import { ArrowUpRight } from "lucide-react"

const FONT_SANS = "'Plus Jakarta Sans', sans-serif"
const FONT_MONO = "'JetBrains Mono', monospace"

function Posts() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const posts = [
    {
      title: "Mastering React 19: Next-Level Features & Hooks",
      author: "Jane Doe",
      date: "Jun 22, 2026",
      slug: "mastering-react-19",
      description:
        "Dive deep into the new features of React 19 — Server Actions, the new use() hook, asset loading, and form handling improvements.",
      category: "Development",
    },
    {
      title: "Tailwind CSS v4: The Future of Styling is Here",
      author: "Alex Rivera",
      date: "Jun 18, 2026",
      slug: "tailwind-css-v4",
      description:
        "An in-depth look at Tailwind CSS v4 — the new Rust-based compiler, dynamic utilities, and native cascade layer support.",
      category: "Design",
    },
    {
      title: "Building Resilient APIs with Modern Node.js",
      author: "Marcus Chen",
      date: "Jun 15, 2026",
      slug: "resilient-apis-nodejs",
      description:
        "Learn design patterns to make your APIs robust, highly performant, and resilient under heavy network loads.",
      category: "Backend",
    },
    {
      title: "Optimizing Core Web Vitals for a Perfect UX Score",
      author: "Jane Doe",
      date: "Jun 10, 2026",
      slug: "core-web-vitals-ux",
      description:
        "A step-by-step checklist to achieve a 100% Google Lighthouse score and dramatically improve user retention.",
      category: "Performance",
    },
    {
      title: "Introduction to Generative Adversarial Networks (GANs)",
      author: "Alice Smith",
      date: "Jun 08, 2026",
      slug: "generative-adversarial-networks",
      description:
        "Explore how GANs work, their architecture, training challenges, and how they generate hyper-realistic synthetic media.",
      category: "Artificial Intelligence",
    },
    {
      title: "Designing Scalable CI/CD Pipelines with GitHub Actions",
      author: "Robert Johnson",
      date: "Jun 05, 2026",
      slug: "github-actions-cicd",
      description:
        "Step-by-step guide to building highly reusable workflows, managing secrets, and automating multi-environment deployments.",
      category: "DevOps",
    },
  ]

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div
      className="space-y-10 animate-in fade-in slide-in-from-bottom-3 duration-400"
      style={{ fontFamily: FONT_SANS }}
    >
      {/* ── Page Header ── */}
      <div className="border-b border-border pb-6">
        <div className="space-y-1">
          <p
            className="text-muted-foreground"
            style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.14em" }}
          >
            //INDEX_CATALOGUE
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-1.5">
            Articles
            <span
              className="text-foreground cursor-blink opacity-70"
              style={{ fontFamily: FONT_MONO }}
            >
              _
            </span>
          </h1>
        </div>
      </div>

      {/* ── Categories Filter Row ── */}
      <div className="flex flex-wrap gap-2 pb-2">
        {["All", "Development", "Design", "Backend", "Performance", "Artificial Intelligence", "DevOps"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-150 cursor-pointer ${
              cat.toLowerCase() === selectedCategory.toLowerCase()
                ? "bg-foreground text-background border-foreground font-medium"
                : "bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
            }`}
            style={{ fontFamily: FONT_MONO }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── Post Grid ── */}
      <div className="grid gap-5 md:grid-cols-2">
        {filteredPosts.map((post, index) => {
          const idx = String(index + 1).padStart(2, "0")
          return (
            <div
              key={post.slug}
              className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-250 hover:border-foreground/30 hover:shadow-sm super-hover dot-grid-bg min-h-[210px]"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-muted-foreground/60 group-hover:text-muted-foreground transition-colors"
                  style={{ fontFamily: FONT_MONO, fontSize: "11px" }}
                >
                  //{idx}
                </span>
                <Link
                  to={`/posts/${post.slug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowUpRight
                    size={16}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <h2
                  className="text-sm font-semibold text-foreground leading-snug tracking-tight group-hover:opacity-80 transition-opacity"
                  style={{ fontFamily: FONT_SANS }}
                >
                  {post.title}
                </h2>
                <p
                  className="text-xs text-muted-foreground leading-relaxed line-clamp-3"
                  style={{ fontFamily: FONT_SANS, fontWeight: 300 }}
                >
                  {post.description}
                </p>
              </div>

              {/* Footer meta */}
              <div
                className="mt-5 flex items-center justify-between pt-4 border-t border-border/50"
                style={{ fontFamily: FONT_MONO, fontSize: "9px", letterSpacing: "0.12em" }}
              >
                <span className="uppercase text-muted-foreground/70 font-medium tracking-widest">
                  {post.category}
                </span>
                <span className="text-muted-foreground/50">{post.date.toUpperCase()}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Posts
