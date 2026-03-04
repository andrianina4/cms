import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Layers } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 text-blue-600 text-xs uppercase tracking-widest">
            Stack Opérationnel
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-4">
            Taram{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Project
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            React · Vite · TypeScript · Tailwind CSS · ShadcnUI
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: <Zap className="text-yellow-400" size={24} />,
              title: "Tailwind CSS v4",
              desc: "Styles utilitaires compilés à la volée avec le plugin Vite.",
            },
            {
              icon: <Layers className="text-blue-400" size={24} />,
              title: "ShadcnUI",
              desc: "Composants accessibles construits sur Radix UI.",
            },
            {
              icon: <CheckCircle2 className="text-green-400" size={24} />,
              title: "TypeScript",
              desc: "Typage statique pour un code robuste et maintenable.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="mb-3">{icon}</div>
              <h2 className="text-white font-semibold mb-1">{title}</h2>
              <p className="text-slate-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button size="lg" className="rounded-full">
            Commencer
          </Button>
          <Button size="lg" variant="outline" className="rounded-full">
            Documentation
          </Button>
          <Button size="lg" variant="ghost" className="rounded-full text-slate-300 hover:text-white hover:bg-white/10">
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
