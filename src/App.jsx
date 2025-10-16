import React, { useState } from "react";

export default function App() {
  // --- Shared Logic ---
  const clean = name => name.toLowerCase().replace(/[^a-z]/g, "");

  const countLetters = (n1, n2) => {
    let a1 = clean(n1).split("");
    let a2 = clean(n2).split("");
    for (let i = 0; i < a1.length; i++) {
      const idx = a2.indexOf(a1[i]);
      if (idx !== -1) {
        a1.splice(i, 1);
        a2.splice(idx, 1);
        i--;
      }
    }
    return a1.length + a2.length;
  };

  const jacksonMethod = count => {
    let arr = ["F", "L", "A", "M", "E", "S"];
    let index = 0;
    while (arr.length > 1) {
      index = (index + count - 1) % arr.length;
      arr.splice(index, 1);
    }
    return arr[0];
  };

  const traditionalMethod = count => {
    let arr = ["F", "L", "A", "M", "E", "S"];
    while (arr.length > 1) {
      const index = (count - 1) % arr.length;
      arr.splice(index, 1);
    }
    return arr[0];
  };

  const meaning = {
    F: "Friendship 💛",
    L: "Love ❤️",
    A: "Affection 💖",
    M: "Marriage 💍",
    E: "Enemy 💢",
    S: "Siblings 👫",
  };

  // --- States ---
  const [firstNames, setFirstNames] = useState({ n1: "", n2: "" });
  const [fullNames, setFullNames] = useState({ n1: "", n2: "" });
  const [resultFirst, setResultFirst] = useState(null);
  const [resultFull, setResultFull] = useState(null);

  // --- Calculation Function ---
  const calculateFlames = () => {
    const c1 = countLetters(firstNames.n1, firstNames.n2);
    const c2 = countLetters(fullNames.n1, fullNames.n2);
    const res1 = {
      count: c1,
      jackson: meaning[jacksonMethod(c1)],
      traditional: meaning[traditionalMethod(c1)],
    };
    const res2 = {
      count: c2,
      jackson: meaning[jacksonMethod(c2)],
      traditional: meaning[traditionalMethod(c2)],
    };
    setResultFirst(res1);
    setResultFull(res2);
  };

  return (
    <div 
      className="min-h-screen w-screen flex flex-col items-center p-4 md:p-8 text-gray-800 overflow-x-hidden"
      style={{
        backgroundImage: 'url("/cupidbg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/50 -z-10"></div>
      <h1 className="text-3xl md:text-4xl font-bold my-6 md:my-10 text-center font-['Knewave']">
        <span className="text-yellow-400">🔥</span>{' '}
        <span className="text-black">
          FLAMES Relationship Calculator
        </span>{' '}
        <span className="text-yellow-400">🔥</span>
      </h1>

      <div className="w-full flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left Card - First Name */}
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-pink-600 font-['Playpen_Sans'] tracking-wide">
            ✨ First Name FLAMES
          </h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter first name"
              value={firstNames.n1}
              onChange={e =>
                setFirstNames({ ...firstNames, n1: e.target.value })
              }
              className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              placeholder="Enter second name"
              value={firstNames.n2}
              onChange={e =>
                setFirstNames({ ...firstNames, n2: e.target.value })
              }
              className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>

        {/* Right Card - Full Name */}
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-purple-600 font-['Playpen_Sans'] tracking-wide">
            💫 Full Name FLAMES
          </h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter first full name"
              value={fullNames.n1}
              onChange={e =>
                setFullNames({ ...fullNames, n1: e.target.value })
              }
              className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Enter second full name"
              value={fullNames.n2}
              onChange={e =>
                setFullNames({ ...fullNames, n2: e.target.value })
              }
              className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        </div>
        
        <button
          onClick={calculateFlames}
          className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600
            text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all w-full max-w-xs"
        >
          Calculate 🔮
        </button>

        {/* Results Section */}
        {(resultFirst || resultFull) && (
          <div className="mt-8 w-full max-w-3xl bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <h2 className="text-3xl font-bold text-black mb-8 text-center font-['Handlee']">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resultFirst && (
                <div className="bg-white/90 p-6 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold text-pink-600 mb-4 font-['Caveat']">✨ First Name Results</h3>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">🔢 Count: {resultFirst.count}</p>
                    <p>⚙️ Jackson's Method → {resultFirst.jackson}</p>
                    <p>📜 Traditional Method → {resultFirst.traditional}</p>
                  </div>
                </div>
              )}
              {resultFull && (
                <div className="bg-white/90 p-6 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold text-purple-600 mb-4 font-['Caveat']">💫 Full Name Results</h3>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">🔢 Count: {resultFull.count}</p>
                    <p>⚙️ Jackson's Method → {resultFull.jackson}</p>
                    <p>📜 Traditional Method → {resultFull.traditional}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-6 text-black font-bold text-center font-['Schoolbell'] text-xl [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]">
        Made with ❤️ by: Biki-Dev
      </footer>
    </div>
  );
}
