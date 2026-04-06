import React, { useEffect, useState } from "react";

export default function CallScreen({ onEndCall }) {
  const [status, setStatus] = useState("Listening...");
  const [time, setTime] = useState(0);

  let recognition;

  useEffect(() => {
    startListening();

    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-IN";

    recognition.onresult = async (event) => {
      const text =
        event.results[event.results.length - 1][0].transcript;

      setStatus("Thinking...");
      const reply = await getAIResponse(text);

      setStatus("Speaking...");
      speak(reply);

      setTimeout(() => {
        setStatus("Listening...");
      }, 2000);
    };

    recognition.start();
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    speechSynthesis.speak(utterance);
  };

  const getAIResponse = async (message) => {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly Indian health coach. Give short voice-friendly answers.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await res.json();
    return data.choices[0].message.content;
  };

  return (
    <div style={styles.container}>
      <h2>AI Health Coach</h2>

      <div style={styles.avatar}>🤖</div>

      <p>{status}</p>
      <p>{formatTime(time)}</p>

      <button style={styles.endCall} onClick={onEndCall}>
        End Call
      </button>
    </div>
  );
}

const formatTime = (sec) => {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
};

const styles = {
  container: {
    height: "100vh",
    background: "#0b0f1a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    fontSize: "80px",
    margin: "20px",
  },
  endCall: {
    marginTop: "20px",
    padding: "15px 25px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
  },
};
