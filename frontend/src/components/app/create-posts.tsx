import React, { useState, useRef } from "react"
import { Link, useNavigate } from "react-router"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ArrowLeft, Send, Save, ImagePlus, X, User, Clock } from "lucide-react"

const FONT_MONO = "'JetBrains Mono', monospace"
const FONT_SANS = "'Plus Jakarta Sans', sans-serif"

const CATEGORIES = [
  "Development",
  "Design",
  "Backend",
  "Frontend",
  "Performance",
  "Artificial Intelligence",
  "Machine Learning",
  "DevOps & CI/CD",
  "Cloud Computing",
  "Cybersecurity",
  "Mobile Development",
  "Open Source",
  "Career & Growth",
  "Tools & Productivity",
  "Data Science",
  "Web3 & Blockchain",
  "System Design",
  "Database",
  "Testing & QA",
  "Tutorial",
  "Opinion & Insights",
  "News & Updates",
]

const Tiptap = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Development")
  const [author, setAuthor] = useState("")
  const [readTime, setReadTime] = useState("")
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [publishing, setPublishing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setPublishing(true)
    setTimeout(() => {
      setPublishing(false)
      navigate("/posts")
    }, 1000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setCoverImage(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeCoverImage = () => {
    setCoverImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div
      className="space-y-7 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-400 pb-16 min-w-0"
      style={{ fontFamily: FONT_SANS }}
    >
      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-border">
        <Link to="/posts">
          <button
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.12em" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            BACK TO INDEX
          </button>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none gap-1.5 rounded-lg border-border text-muted-foreground hover:text-foreground"
            style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.1em" }}
          >
            <Save className="h-3.5 w-3.5" />
            SAVE DRAFT
          </Button>
          <Button
            size="sm"
            onClick={handlePublish}
            disabled={publishing || !title.trim()}
            className="flex-1 sm:flex-none gap-1.5 rounded-lg bg-foreground text-background hover:bg-foreground/85 transition-all disabled:opacity-40"
            style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.1em" }}
          >
            <Send className="h-3.5 w-3.5" />
            {publishing ? "PUBLISHING..." : "PUBLISH"}
          </Button>
        </div>
      </div>

      {/* ── Page Label ── */}
      <div>
        <p
          className="text-muted-foreground/50"
          style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.14em" }}
        >
          //NEW_ARTICLE
        </p>
        <h1 className="text-xl font-semibold text-foreground mt-0.5 tracking-tight">
          Write a Post
        </h1>
      </div>

      {/* ── Cover Image Upload ── */}
      <div className="space-y-2">
        <Label
          className="text-muted-foreground"
          style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.14em" }}
        >
          //COVER_IMAGE
        </Label>

        {coverImage ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border group">
            <img
              src={coverImage}
              alt="Cover preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-200 flex items-center justify-center">
              <button
                onClick={removeCoverImage}
                className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-xs font-semibold shadow"
                style={{ fontFamily: FONT_MONO, letterSpacing: "0.1em" }}
              >
                <X className="h-3.5 w-3.5" />
                REMOVE
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card hover:border-foreground/30 hover:bg-secondary/30 transition-all duration-200 py-12 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary group-hover:bg-foreground/8 transition-colors">
              <ImagePlus className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-foreground" style={{ fontFamily: FONT_SANS }}>
                Click to upload a cover image
              </p>
              <p
                className="text-muted-foreground/60"
                style={{ fontFamily: FONT_MONO, fontSize: "9px", letterSpacing: "0.12em" }}
              >
                JPG · PNG · WEBP — MAX 10 MB
              </p>
            </div>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="cover-image-input"
        />
      </div>

      {/* ── Title ── */}
      <div className="space-y-2">
        <Label
          htmlFor="post-title"
          className="text-muted-foreground"
          style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.14em" }}
        >
          //TITLE
        </Label>
        <Input
          id="post-title"
          placeholder="Enter your article title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-base font-medium py-5 px-4 border-border rounded-lg bg-card focus-visible:ring-1 focus-visible:ring-foreground placeholder:text-muted-foreground/35"
          style={{ fontFamily: FONT_SANS }}
        />
      </div>

      {/* ── Meta: Category · Author · Read Time ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Category */}
        <div className="space-y-2">
          <Label
            htmlFor="post-category"
            className="text-muted-foreground"
            style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.14em" }}
          >
            //CATEGORY
          </Label>
          <select
            id="post-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-10 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground transition-all text-foreground"
            style={{ fontFamily: FONT_SANS }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Author */}
        <div className="space-y-2">
          <Label
            htmlFor="post-author"
            className="text-muted-foreground"
            style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.14em" }}
          >
            //AUTHOR
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              id="post-author"
              placeholder="Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="pl-9 h-10 border-border rounded-lg bg-card focus-visible:ring-1 focus-visible:ring-foreground placeholder:text-muted-foreground/35 text-sm"
              style={{ fontFamily: FONT_SANS }}
            />
          </div>
        </div>

        {/* Read Time */}
        <div className="space-y-2">
          <Label
            htmlFor="read-time"
            className="text-muted-foreground"
            style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.14em" }}
          >
            //READ_TIME
          </Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              id="read-time"
              placeholder="e.g. 5 min read"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="pl-9 h-10 border-border rounded-lg bg-card focus-visible:ring-1 focus-visible:ring-foreground placeholder:text-muted-foreground/35 text-sm"
              style={{ fontFamily: FONT_SANS }}
            />
          </div>
        </div>
      </div>

      {/* ── Category tag chip ── */}
      {category && (
        <div className="flex items-center gap-2">
          <span
            className="text-muted-foreground/40"
            style={{ fontFamily: FONT_MONO, fontSize: "9px", letterSpacing: "0.12em" }}
          >
            TAGGED AS
          </span>
          <span
            className="px-2.5 py-0.5 rounded-md border border-border bg-secondary text-foreground text-xs"
            style={{ fontFamily: FONT_MONO, fontSize: "10px" }}
          >
            {category}
          </span>
        </div>
      )}

      {/* ── Body Editor ── */}
      <div className="space-y-2">
        <Label
          className="text-muted-foreground"
          style={{ fontFamily: FONT_MONO, fontSize: "10px", letterSpacing: "0.14em" }}
        >
          //BODY
        </Label>
        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <SimpleEditor />
        </div>
      </div>
    </div>
  )
}

export default Tiptap
