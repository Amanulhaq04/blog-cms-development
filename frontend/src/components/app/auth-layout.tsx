import { useState } from "react"
import { useAtom } from "jotai"
import { Navigate, Outlet, NavLink, useNavigate } from "react-router"
import { useTheme } from "@/components/theme-provider"
import { authAtom } from "../../atoms/auth-atom"
import {
  BookOpen,
  PenLine,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react"

const FONT_MONO = "'JetBrains Mono', monospace"
const FONT_SANS = "'Plus Jakarta Sans', sans-serif"

export function AuthLayout() {
  const [auth, setAuth] = useAtom(authAtom)
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    setAuth(false)
    navigate("/login")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navItems = [
    { to: "/posts", label: "Posts", icon: BookOpen },
    { to: "/create-post", label: "Write", icon: PenLine },
  ]

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300" style={{ fontFamily: FONT_SANS }}>

      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-border bg-card">
        <div className="flex flex-col flex-grow pt-7 pb-4 overflow-y-auto">

          {/* Brand */}
          <div className="flex items-center gap-2.5 px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-md overflow-hidden bg-black flex-shrink-0">
              <img src="/feather1.jpg" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span
              className="text-sm font-semibold tracking-widest uppercase text-foreground"
              style={{ fontFamily: FONT_MONO }}
            >
              Folio
            </span>
          </div>

          {/* Nav */}
          <div className="mt-8 flex-grow flex flex-col px-3">
            <p
              className="px-3 mb-2 text-muted-foreground/50"
              style={{ fontFamily: FONT_MONO, fontSize: "9px", letterSpacing: "0.15em" }}
            >
              NAVIGATION
            </p>
            <nav className="space-y-0.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/posts"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                      isActive
                        ? "bg-foreground text-background font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`
                  }
                  style={{ fontFamily: FONT_SANS }}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="flex-shrink-0 p-4 border-t border-border space-y-2">
          {/* User row */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <div
                className="h-7 w-7 rounded-md bg-secondary flex items-center justify-center text-foreground flex-shrink-0"
                style={{ fontFamily: FONT_MONO, fontSize: "9px", fontWeight: 700 }}
              >
                AM
              </div>
              <div>
                <p className="text-xs font-medium text-foreground leading-none" style={{ fontFamily: FONT_SANS }}>
                  Aman
                </p>
                <p className="text-muted-foreground mt-0.5" style={{ fontFamily: FONT_MONO, fontSize: "9px", letterSpacing: "0.1em" }}>
                  AUTHOR
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all text-sm"
            style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.1em" }}
          >
            <LogOut className="h-3.5 w-3.5" />
            SIGN OUT
          </button>
        </div>
      </aside>

      {/* ─── Content Area ─── */}
      <div className="flex flex-col flex-1 md:pl-60">

        {/* Mobile header */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background/90 backdrop-blur-sm px-4 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md overflow-hidden bg-black">
              <img src="/feather1.jpg" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span
              className="text-xs font-semibold tracking-widest uppercase text-foreground"
              style={{ fontFamily: FONT_MONO }}
            >
              Folio
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground transition-all"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </header>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-background pt-14 flex flex-col">
            <div className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/posts"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                      isActive
                        ? "bg-foreground text-background font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`
                  }
                  style={{ fontFamily: FONT_SANS }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary mb-3">
                <div
                  className="h-8 w-8 rounded-md bg-foreground text-background flex items-center justify-center"
                  style={{ fontFamily: FONT_MONO, fontSize: "10px", fontWeight: 700 }}
                >
                  AM
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ fontFamily: FONT_SANS }}>Aman</p>
                  <p className="text-muted-foreground" style={{ fontFamily: FONT_MONO, fontSize: "9px" }}>AUTHOR</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg border border-border text-muted-foreground hover:bg-foreground hover:text-background transition-all text-sm"
                style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.1em" }}
              >
                <LogOut className="h-4 w-4" />
                SIGN OUT
              </button>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6 sm:py-8 md:py-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
