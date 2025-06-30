/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // włączamy tryb ciemny przez dodanie klasy 'dark' na <html> lub <body>
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // skanuj pliki w src dla klas tailwind
  ],
  theme: {
    extend: {
      // jeśli chcesz dodać własne kolory w stylu WhatsApp:
      colors: {
        'whatsapp-green-light': '#25D366',
        'whatsapp-green-dark': '#075E54',
      },
    },
  },
  plugins: [],
};
