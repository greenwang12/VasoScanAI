<<<<<<< HEAD
import { Activity, ShieldCheck, BrainCircuit } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-violet-500/20 blur-[150px] rounded-full"></div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-10 lg:px-14 py-6">

        <div className="flex items-center gap-3">

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-gradient-to-br
              from-cyan-400
              via-blue-500
              to-violet-500
              shadow-lg
              shadow-blue-500/30
            "
          />

          <div>
            <h1 className="font-bold text-2xl tracking-wider">
              VASOSCAN
            </h1>

            <p className="text-xs text-slate-400">
              AI Cardiovascular Intelligence
            </p>
          </div>

        </div>

        <div className="hidden lg:flex gap-10 text-slate-300">

          <a href="#" className="hover:text-white transition">
            Technology
          </a>

          <a href="#" className="hover:text-white transition">
            Features
          </a>

          <a href="#" className="hover:text-white transition">
            Research
          </a>

          <a href="#" className="hover:text-white transition">
            About
          </a>

        </div>

      </nav>

      {/* Main Content */}
      <div
        className="
          relative z-10
          max-w-[1600px]
          mx-auto
          px-6 md:px-10 lg:px-14
          pt-4
          pb-16
        "
      >

        {/* Background Heart + ECG */}
        <div
          className="
            hidden xl:block
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            pointer-events-none
            z-0
          "
        >

          {/* Heart Glow */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[520px]
              h-[520px]
              rounded-full
              bg-blue-500/10
              blur-[150px]
            "
          />

          {/* ECG */}
          <svg
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[800px]
              opacity-15
            "
            viewBox="0 0 700 120"
          >
            <path
              d="
                M0 60
                L120 60
                L150 30
                L180 95
                L210 10
                L240 60
                L700 60
              "
              stroke="#3b82f6"
              strokeWidth="4"
              fill="none"
            />
          </svg>

          {/* Heart */}
          <img
            src="/heart.png"
            alt="Heart"
            className="
              relative
              w-[380px]
              opacity-15
              drop-shadow-[0_0_80px_rgba(59,130,246,0.35)]
            "
          />

        </div>

        {/* Hero + Login */}
        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-16
            items-center
          "
        >

          {/* LEFT HERO */}
          <div>

            <div
              className="
                inline-flex
                items-center
                px-4 py-2
                rounded-full
                bg-blue-500/10
                border border-blue-500/20
                text-blue-300
                text-sm
              "
            >
              AI-Powered Cardiovascular Screening
            </div>

            <h1
              className="
                mt-8
                text-4xl
                md:text-5xl
                xl:text-6xl
                font-bold
                leading-tight
              "
            >
              Understand Today.
              <br />

              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-cyan-400
                  via-blue-400
                  to-violet-400
                "
              >
                Protect Tomorrow.
              </span>
            </h1>

            <p
              className="
                mt-6
                text-lg
                text-slate-300
                leading-relaxed
                max-w-xl
              "
            >
              Advanced vPPG analysis, machine learning,
              and AI-powered health insights for proactive
              cardiovascular monitoring using only a smartphone.
            </p>

            {/* Features */}
            <div className="mt-10 grid gap-6">

              <div className="flex items-center gap-4">

                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Activity size={24} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Real-Time Monitoring
                  </h3>

                  <p className="text-slate-400">
                    Continuous cardiovascular assessment.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="p-3 rounded-xl bg-violet-500/10">
                  <BrainCircuit size={24} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    AI Health Intelligence
                  </h3>

                  <p className="text-slate-400">
                    Explainable machine learning insights.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="p-3 rounded-xl bg-cyan-500/10">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Secure & Private
                  </h3>

                  <p className="text-slate-400">
                    Enterprise-grade protection.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* LOGIN */}
          <div className="flex justify-center xl:justify-end">

            <div
              className="
                w-full
                max-w-md
                bg-white/10
                backdrop-blur-2xl
                border border-white/10
                rounded-3xl
                p-8
                shadow-[0_0_60px_rgba(37,99,235,0.25)]
              "
            >

              <div className="text-center">

                <h2 className="text-3xl font-bold">
                  Welcome Back
                </h2>

                <p className="mt-2 text-slate-300">
                  Sign in to access your dashboard
                </p>

              </div>

              <div className="mt-8">

                <input
                  type="email"
                  placeholder="Email Address"
                  className="
                    w-full
                    p-4
                    rounded-xl
                    bg-slate-900/70
                    border border-slate-700
                    outline-none
                    focus:border-blue-500
                  "
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="
                    mt-4
                    w-full
                    p-4
                    rounded-xl
                    bg-slate-900/70
                    border border-slate-700
                    outline-none
                    focus:border-blue-500
                  "
                />

                <button
                  className="
                    mt-6
                    w-full
                    p-4
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-violet-600
                    font-semibold
                    hover:scale-[1.02]
                    transition-all
                  "
                >
                  Sign In
                </button>

                <p className="mt-6 text-center text-slate-400">
                  New to VasoScan?

                  <span className="ml-2 text-blue-400 cursor-pointer">
                    Create Account
                  </span>
                </p>

              </div>

            </div>

          </div>
          <footer
  className="
    border-t
    border-white/10
    mt-20
    py-6
    px-8
    flex
    flex-col
    md:flex-row
    justify-between
    items-center
    text-sm
    text-slate-400
  "
>
  <p>
    © 2026 VasoScan Technologies. All rights reserved.
  </p>
</footer>

        </div>

      </div>

    </div>
  );
}
=======
import { Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}

export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Splash from "./pages/Splash";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Splash />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
>>>>>>> ceca07c140c6bfe71ffdce4bb1c6c95a2ca44c40
