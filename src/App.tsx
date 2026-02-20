import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import TaskFeed from "./pages/TaskFeed"
import CreateTask from "./pages/CreateTask"
import TaskDetails from "./pages/TaskDetails"
import Chat from "./pages/Chat"
import WalletView from "./pages/Wallet"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="tasks" element={<TaskFeed />} />
            <Route path="tasks/create" element={<CreateTask />} />
            <Route path="tasks/:id" element={<TaskDetails />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="wallet" element={<WalletView />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
