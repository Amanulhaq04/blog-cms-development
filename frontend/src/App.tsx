import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAtom } from "jotai"
import { authAtom } from "@/atoms/auth-atom"

export function App() {
  const [auth] = useAtom(authAtom)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth) {
      navigate("/posts", { replace: true })
    } else {
      navigate("/login", { replace: true })
    }
  }, [auth, navigate])

  return null
}

export default App

