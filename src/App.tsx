import { useConvexAuth } from "convex/react";
import { AuthScreen } from "./components/AuthScreen";
import { CosmicExplorer } from "./components/CosmicExplorer";
import { BlackHoleViz } from "./components/BlackHoleViz";
import "./styles.css";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
        <div className="relative">
          <BlackHoleViz size={120} />
          <p className="text-stellar-gold font-orbitron text-sm mt-8 tracking-widest animate-pulse text-center">
            INITIALIZING COSMIC SYSTEMS...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-dark text-white overflow-x-hidden">
      {/* Star field background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="stars-layer-1"></div>
        <div className="stars-layer-2"></div>
        <div className="stars-layer-3"></div>
        <div className="nebula-glow"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {isAuthenticated ? <CosmicExplorer /> : <AuthScreen />}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-3 px-4 text-center z-20 bg-gradient-to-t from-cosmic-dark to-transparent">
        <p className="text-xs text-white/30 font-crimson tracking-wide">
          Requested by{" "}
          <a
            href="https://x.com/mr49selfmade"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stellar-gold/50 hover:text-stellar-gold transition-colors"
          >
            @mr49selfmade
          </a>{" "}
          · Built by{" "}
          <a
            href="https://x.com/clonkbot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-plasma-cyan/50 hover:text-plasma-cyan transition-colors"
          >
            @clonkbot
          </a>
        </p>
      </footer>
    </div>
  );
}
