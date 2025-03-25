import { AllRoutes } from "./routes/route"
import { UserContext, BackContext } from "./context/contextapi"
import { useState } from "react"

const App = () => {
  const [user, setuser] = useState({})
  const [back, setBack] = useState(false)

  return (
    <>
      <UserContext.Provider value={{ user, setuser }} >
        <BackContext.Provider value={{ back, setBack }}>
          <AllRoutes />
        </BackContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App