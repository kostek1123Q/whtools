import { useState, useEffect } from "react";

const tools = [
  { name: "Link Shortener", href: "/link-shortener", color: "green-500" },
  { name: "WhatsApp Button", href: "/whatsapp-button", color: "blue-500" },
  { name: "Status Saver", href: "/status-saver", color: "yellow-400" },
  { name: "Link Generator", href: "/link-generator", color: "purple-500" },
  { name: "AI Generator", href: "/ai-generator", color: "teal-500" },
];

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);

    const listener = (e) => setDark(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-[#25D366] dark:bg-[#075E54] text-white flex flex-col transition-colors duration-500">
      <header className="flex justify-between items-center p-4 border-b border-green-700">
        <h1 className="text-2xl font-bold select-none">whTools - WhatsApp Tools</h1>
        <button
          onClick={() => setDark(!dark)}
          className="bg-green-800 px-3 py-1 rounded hover:bg-green-900 transition"
          aria-label="Toggle dark mode"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <main className="flex-grow container mx-auto px-6 py-10 max-w-3xl text-center">
        <h2 className="text-4xl font-semibold mb-4">Witaj na whTools!</h2>
        <p className="mb-12 text-lg leading-relaxed max-w-xl mx-auto">
          whTools to zestaw prostych narzędzi związanych z WhatsApp i nie tylko.<br />
          Znajdziesz tu generator linków, przycisk WhatsApp na stronę, zapis statusów oraz inteligentnego asystenta AI.
        </p>

        <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tools.map(({ name, href, color }) => (
            <a
              key={name}
              href={href}
              className={`py-4 rounded-lg font-semibold shadow-lg transform transition hover:scale-105 bg-${color}`}
              style={{ backgroundColor: color.includes('-') ? undefined : color }} // fallback for tailwind jit
            >
              {name}
            </a>
          ))}
        </nav>
      </main>

      <footer className="p-4 text-center text-sm opacity-70">
        &copy; {new Date().getFullYear()} whTools — Kostek1123Q
      </footer>
    </div>
  );
}
