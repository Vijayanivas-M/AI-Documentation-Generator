import { Fragment } from "react"
import { Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import Notfound from "./pages/Notfound"
import Header from "./components/header/index.tsx"
import DocGenPage from "./pages/DocGenPage"
function App() {
  return <Fragment>
    <Header />
    <Routes>
      <Route path="/" element={<DocGenPage />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/chat" element={<Chat />}/>
      <Route path="*" element={<Notfound />}/>
    </Routes>
  </Fragment>
}

export default App
