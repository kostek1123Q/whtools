import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shortenUrl = async () => {
    if (!url) return alert("Podaj URL!");
    try {
      const res = await fetch(`${API_BASE}/api/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setShortUrl(data.shortUrl);
      }
    } catch {
      alert("Błąd sieci");
    }
  };

  return (
    <main className="min-h-screen bg-whatsapp-green-light dark:bg-whatsapp-green-dark text-white p-4 flex flex-col items-center">
      <h1 className="text-4xl mb-6 font-bold">whTools - WhatsApp Tools</h1>

      <input
        type="text"
        placeholder="Wklej URL do skrócenia"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="p-2 rounded text-black w-full max-w-md"
      />
      <button
        onClick={shortenUrl}
        className="mt-4 bg-whatsapp-green-btn hover:bg-whatsapp-green-btn-hover px-4 py-2 rounded"
      >
        Skróć URL
      </button>

      {shortUrl && (
        <p className="mt-6 bg-white text-black p-2 rounded max-w-md break-all">
          Skrócony link: <a href={shortUrl} target="_blank">{shortUrl}</a>
        </p>
      )}
    </main>
  );
}
