import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { ArrowRight, Check, CircleAlert, Code2, Database, GitBranch, RefreshCw, Server, Sparkles, Zap } from "lucide-react";
import "./App.css";

const API_URL = "http://localhost:5001/api";

function App() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Checking your local API...");

  const checkConnection = useCallback(async () => {
    setStatus("loading");
    setMessage("Checking your local API...");
    try {
      const response = await axios.get(API_URL);
      setMessage(response.data.message);
      setStatus("online");
    } catch {
      setMessage("Backend connection failed");
      setStatus("offline");
    }
  }, []);

  useEffect(() => { checkConnection(); }, [checkConnection]);
  const isOnline = status === "online";

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Stackline home"><span className="brand-mark"><Code2 size={19} /></span><span>Stackline</span></a>
        <div className="topbar-actions">
          <span className="environment"><span /> Local environment</span>
          <a className="icon-button" href="https://github.com" target="_blank" rel="noreferrer" aria-label="Open GitHub"><GitBranch size={19} /></a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><Sparkles size={15} /> Full-stack starter workspace</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>Your stack is ready<br />to <span>build something great.</span></motion.h1>
          <motion.p className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>A clean React and Node.js workspace with a live connection check, built to help you move from idea to production faster.</motion.p>
          <motion.div className={`status-card ${status}`} initial={{ opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.24 }}>
            <div className="status-icon">{status === "loading" ? <RefreshCw className="spin" /> : isOnline ? <Check /> : <CircleAlert />}</div>
            <div className="status-text"><span>{status === "loading" ? "Connecting" : isOnline ? "All systems operational" : "Connection unavailable"}</span><strong>{message}</strong></div>
            <button onClick={checkConnection} disabled={status === "loading"}><RefreshCw size={16} /> Check again</button>
          </motion.div>
        </section>

        <section className="stack-section" aria-label="Application architecture">
          <div className="section-heading"><div><span>Under the hood</span><h2>One connected workflow</h2></div><p>Every layer is configured for a smooth local development experience.</p></div>
          <div className="stack-grid">
            <article className="tech-card"><div className="tech-icon react"><Zap size={22} /></div><span className="tech-number">01</span><h3>React frontend</h3><p>Fast, component-driven UI powered by Vite and modern styling tools.</p><code>localhost:5173</code></article>
            <div className="connector"><ArrowRight /></div>
            <article className="tech-card"><div className="tech-icon node"><Server size={22} /></div><span className="tech-number">02</span><h3>Express API</h3><p>A focused Node.js server ready for routes, middleware, and business logic.</p><code>localhost:5001/api</code></article>
            <div className="connector"><ArrowRight /></div>
            <article className="tech-card muted-card"><div className="tech-icon data"><Database size={22} /></div><span className="tech-number">03</span><h3>Your database</h3><p>Connect MongoDB, PostgreSQL, or MySQL when you are ready to persist data.</p><code>Ready to configure</code></article>
          </div>
        </section>
      </main>

      <footer><span>Built for focused development.</span><span>React <i /> Express <i /> Node.js</span></footer>
    </div>
  );
}

export default App;
