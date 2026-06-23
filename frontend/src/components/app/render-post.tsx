import { useParams, Link } from "react-router"
import { Button } from "../ui/button"
import { ArrowLeft, Share2, Heart } from "lucide-react"

const FONT_SANS = "'Plus Jakarta Sans', sans-serif"
const FONT_MONO = "'JetBrains Mono', monospace"


// Mock database to render real-looking post content matching the slugs in posts.tsx
const POST_CONTENT: Record<string, {
  title: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  content: string[]
}> = {
  "mastering-react-19": {
    title: "Mastering React 19: Next-Level Features & Hooks",
    author: "Jane Doe",
    date: "June 22, 2026",
    readTime: "6 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    content: [
      "React 19 marks one of the most exciting updates in the library's history. It shifts focus from manual rendering optimization (like useMemo and useCallback) toward seamless asynchronously integrated state management.",
      "The marquee feature is undoubtedly Server Actions. Server Actions allow you to define server-side database updates or functions directly inside client-side components. No more boilerplate code for fetching, routing endpoints, or updating local state manually.",
      "Furthermore, the new use() hook simplifies promise resolution and Context consumption. You can now use it conditionally inside loops and branches, which was previously forbidden under standard React hook guidelines.",
      "With form actions, handling loading states and optimistic UI updates is a breeze. The introduction of useActionState and useOptimistic allows developers to deliver smooth, instantaneous experiences for users, even on slow connections."
    ]
  },
  "tailwind-css-v4": {
    title: "Tailwind CSS v4: The Future of Styling is Here",
    author: "Alex Rivera",
    date: "June 18, 2026",
    readTime: "4 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Tailwind CSS v4 introduces a complete rewrite of the framework, moving away from JavaScript configuration files and embracing CSS-first config.",
      "Under the hood, the new compiler built in Rust is up to 10x faster. It resolves files in milliseconds, providing an incredibly snappy hot module replacement (HMR) experience during development.",
      "Native cascade layers are now supported out of the box using @utility and custom variants defined using standard CSS. This avoids configuration clutter and brings styling closer to modern CSS specifications.",
      "Furthermore, automatic theme detection, container queries, and dynamic utility values make this version a pleasure to build with, letting designers write cleaner, more maintainable code bases."
    ]
  },
  "resilient-apis-nodejs": {
    title: "Building Resilient APIs with Modern Node.js",
    author: "Marcus Chen",
    date: "June 15, 2026",
    readTime: "8 min read",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Designing APIs that survive high traffic spikes and network failures requires careful planning, circuit breakers, rate limiting, and robust error handling.",
      "In this guide, we dive into how to use native Node.js cluster modules, implement caching layers using Redis, and leverage retry mechanisms to make downstream service failures completely transparent to clients.",
      "We'll also explore standard logging practices using Winston or Pino, and how structural middleware execution pipelines keep error boundaries safely contained without crashing your main server threads."
    ]
  },
  "core-web-vitals-ux": {
    title: "Optimizing Core Web Vitals for Perfect UX Score",
    author: "Jane Doe",
    date: "June 10, 2026",
    readTime: "5 min read",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    content: [
      "User experience is directly tied to business outcomes. Google's Core Web Vitals measure critical metrics: LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift).",
      "Achieving straight green scores requires optimizing image sizes, preloading critical fonts, and ensuring that page elements don't shift dynamically during rendering.",
      "In this post, we share practical strategies to identify layout shifts, defer non-critical JS scripts, and use CSS aspect-ratio properties to reserve space for rich media content before it fully loads."
    ]
  }
}

function RenderPost() {
  const { slug } = useParams<{ slug: string }>()
  
  const post = slug ? POST_CONTENT[slug] : null

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 space-y-4 animate-in fade-in">
        <h2 className="text-xl font-semibold tracking-tight" style={{ fontFamily: FONT_SANS }}>Article Not Found</h2>
        <p className="text-muted-foreground" style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '0.12em' }}>//ERROR_404</p>
        <Link to="/posts">
          <Button variant="outline" className="rounded-lg mt-4" style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '0.12em' }}>BACK TO INDEX</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-400 pb-12 min-w-0" style={{ fontFamily: FONT_SANS }}>
      {/* Navigation Top */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border">
        <Link to="/posts">
          <button
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-0"
            style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '0.12em' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            BACK TO INDEX
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-lg h-8 w-8 border-border">
            <Heart className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-lg h-8 w-8 border-border">
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Post Wrapper */}
      <article className="space-y-6">
        {/* Meta Header */}
        <div className="space-y-3">
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '0.14em' }} className="text-muted-foreground uppercase block">
            //{post.category}
          </span>
          <h1
            className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight text-foreground"
            style={{ fontFamily: FONT_SANS }}
          >
            {post.title}
          </h1>
          
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground pt-1"
            style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '0.1em' }}
          >
            <span>BY {post.author.toUpperCase()}</span>
            <span>·</span>
            <span>{post.date.toUpperCase()}</span>
            <span>·</span>
            <span>{post.readTime.toUpperCase()}</span>
          </div>
        </div>

        {/* Feature Image - Grayscale minimal */}
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-border bg-muted">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center transition-all duration-500"
          />
        </div>

        {/* Article Body */}
        <div
          className="space-y-5 text-foreground/80 leading-[1.85] text-[15px]"
          style={{ fontFamily: FONT_SANS, fontWeight: 300 }}
        >
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      {/* Footer */}
      <div
        className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-y-2 text-muted-foreground/60"
        style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.12em' }}
      >
        <span>//ENGAGEMENT_END</span>
        <div className="flex items-center gap-4">
          <span>24 LIKES</span>
          <span>3 COMMENTS</span>
        </div>
      </div>
    </div>
  )
}

export default RenderPost



