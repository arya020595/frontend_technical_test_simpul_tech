import { useState } from 'react'
import './App.css'
import Chat from "./Chat";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <header className="app-header">
          <h1>React Dashboard</h1>
        </header>
        <main className="app-main">
          <Sidebar />
          <MainContent />
        </main>
      </div>
    </>
  )
}

export default App
