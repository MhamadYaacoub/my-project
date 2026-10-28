import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("Connecting...");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch(() => {
        setMessage("Backend connection failed");
      });
  }, []);

  return (
    <main style={{ padding: "40px", textAlign: "center" }}>
      <h1>My Full-Stack Project</h1>
      <h2>{message}</h2>
    </main>
  );
}

export default App;
