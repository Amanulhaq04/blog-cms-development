import { useState, useEffect, type FormEvent } from "react"
import { useAtom } from "jotai"
import { useNavigate } from "react-router"

import { authAtom } from "@/atoms/auth-atom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Mode = "login" | "signup"

export function SignUp() {
  const [auth, setAuth] = useAtom(authAtom)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth) {
      navigate("/posts", { replace: true })
    }
  }, [auth, navigate])

  const [mode, setMode] = useState<Mode>("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const isSignup = mode === "signup"

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim() || (isSignup && !name.trim())) {
      setError("Please fill in all fields.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setSubmitting(true)

    setTimeout(() => {
      setAuth(true)
      setSubmitting(false)
      navigate("/posts")
    }, 300)
  }

  return (
    <div className="flex min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ─── LEFT: Hero Image Panel ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/blog1.jpg"
          alt="Folio — Your writing space"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Top branding */}
        <div className="absolute top-8 left-8 flex items-center gap-3 z-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-black overflow-hidden">
            <img src="/feather1.jpg" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <span
            className="text-white text-sm font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Folio
          </span>
        </div>

        {/* Bottom hero copy */}
        <div className="absolute bottom-12 left-8 right-8 z-10 space-y-4">
          <div
            className="text-white/40 text-[10px] tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            //WRITING_SPACE
          </div>
          <h2 className="text-white text-3xl font-bold leading-tight tracking-tight">
            Where ideas become<br />
            <span className="text-white/70">remarkable articles.</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            A minimal, distraction-free CMS crafted for writers who value clarity over clutter.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {["JD", "AR", "MC"].map((initials, i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "white" }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-white/40 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              3 authors · 4 articles
            </span>
          </div>
        </div>
      </div>

      {/* ─── RIGHT: Login Form Panel ─── */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 sm:px-8 py-12 bg-background dot-grid-bg">

        {/* Mobile branding — only shows on small screens */}
        <div className="flex items-center gap-3 mb-10 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-md overflow-hidden bg-black">
            <img src="/feather1.jpg" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <span
            className="text-foreground text-sm font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Folio
          </span>
        </div>

        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">

          {/* Header */}
          <div className="space-y-2">
            <p
              className="text-muted-foreground text-[10px] tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {isSignup ? "//CREATE_IDENTITY" : "//START_SESSION"}
            </p>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              {isSignup ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignup
                ? "Join the writing space. Start crafting today."
                : "Sign in to access your writing workspace."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {isSignup && (
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-[10px] uppercase tracking-widest text-muted-foreground"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="rounded-lg border-border bg-card text-sm placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground h-11"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[10px] uppercase tracking-widest text-muted-foreground"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-lg border-border bg-card text-sm placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground h-11"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-[10px] uppercase tracking-widest text-muted-foreground"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Password
                </Label>
                {!isSignup && (
                  <span
                    className="text-[10px] text-muted-foreground/60 hover:text-foreground cursor-pointer transition-colors underline underline-offset-4"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Forgot?
                  </span>
                )}
              </div>
              <Input
                id="password"
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-lg border-border bg-card text-sm placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground h-11"
              />
            </div>

            {error && (
              <p
                className="text-xs text-red-500 bg-red-500/8 border border-red-500/15 px-3 py-2.5 rounded-lg"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                role="alert"
              >
                ⚠ {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-lg bg-foreground text-background text-xs font-semibold uppercase tracking-widest hover:bg-foreground/90 transition-all"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {submitting
                ? "Authorizing..."
                : isSignup
                  ? "Create Account"
                  : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span
                className="bg-background px-3 text-[10px] text-muted-foreground/60 uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                or
              </span>
            </div>
          </div>

          {/* Toggle Mode */}
          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setError(null)
                setMode(isSignup ? "login" : "signup")
              }}
              className="font-semibold text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>

          {/* Footer note */}
          <p
            className="text-center text-[10px] text-muted-foreground/50 leading-relaxed"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            By continuing you agree to our<br />
            Terms of Service & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
