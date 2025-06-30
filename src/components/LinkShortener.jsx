import { useState } from "react";

export default function LinkShortener() {
  const [input, setInput] = useState("");
  const [shortLink, setShortLink] = useState("");

  // Prosta funkcja skracająca link (losowe 6 znaków)
  function generateShortCode() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async function handleShorten() {
  if (!input) return alert("Wprowadź link!");
  try {
    new URL(input);
  } catch {
    return alert("To nie jest prawidłowy URL!");
  }

  const res = await fetch("http://localhost:5000/api/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: input }),
  });

  if (!res.ok) {
    alert("Coś poszło nie tak!");
    return;
  }

  const data = await res.json();
  const short = `http://localhost:5000/s/${data.shortCode}`;
  setShortLink(short);
}

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Link Shortener</h2>
      <input
        type="text"
        placeholder="Wklej URL do skrócenia"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <button
        onClick={handleShorten}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
      >
        Skróć link
      </button>

      {shortLink && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="break-all">Skrócony link:</p>
          <a href={shortLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {shortLink}
          </a>
        </div>
      )}
    </div>
  );
}
