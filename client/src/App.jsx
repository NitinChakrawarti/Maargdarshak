import { AllRoutes } from "./routes/route"
import { useState } from "react"

const App = () => {
  const [user, setuser] = useState({})
  const [back, setBack] = useState(false)

  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App