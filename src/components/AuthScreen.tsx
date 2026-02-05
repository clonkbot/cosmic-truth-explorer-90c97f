import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { BlackHoleViz } from "./BlackHoleViz";

export function AuthScreen() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    try {
      await signIn("password", formData);
    } catch (err) {
      setError(flow === "signIn" ? "Invalid credentials. Try again or sign up." : "Could not create account. Try a different email.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
    } catch (err) {
      setError("Could not continue as guest. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 pb-16">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
        <div className="flex justify-center mb-6 md:mb-8">
          <BlackHoleViz size={140} className="md:w-[180px] md:h-[180px]" />
        </div>

        <h1 className="font-orbitron text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 tracking-wider">
          <span className="text-stellar-gold">COSMIC</span>{" "}
          <span className="text-white">TRUTH</span>{" "}
          <span className="text-plasma-cyan">EXPLORER</span>
        </h1>

        <p className="font-crimson text-base sm:text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed px-4">
          Cross-reference claims with real-time cosmic data.
          <br className="hidden sm:block" />
          <span className="text-stellar-gold/80">Built for curiosity, not chaos.</span>
        </p>
      </div>

      {/* Auth Card */}
      <div
        className="cosmic-card rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md animate-fade-in-up opacity-0"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <h2 className="font-orbitron text-lg sm:text-xl text-center mb-6 tracking-wide text-stellar-gold">
          {flow === "signIn" ? "MISSION LOGIN" : "NEW EXPLORER"}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-cosmic-orange/10 border border-cosmic-orange/30 text-cosmic-orange text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-orbitron text-xs text-white/50 mb-2 tracking-wider">
              TRANSMISSION ID (EMAIL)
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="explorer@cosmos.io"
              className="cosmic-input w-full px-4 py-3 rounded-lg text-white font-crimson text-base"
            />
          </div>

          <div>
            <label className="block font-orbitron text-xs text-white/50 mb-2 tracking-wider">
              ACCESS CODE (PASSWORD)
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="cosmic-input w-full px-4 py-3 rounded-lg text-white font-crimson text-base"
              minLength={6}
            />
          </div>

          <input type="hidden" name="flow" value={flow} />

          <button
            type="submit"
            disabled={isLoading}
            className="cosmic-btn w-full py-3 sm:py-4 rounded-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "ESTABLISHING LINK..." : flow === "signIn" ? "INITIATE MISSION" : "CREATE EXPLORER ID"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setFlow(flow === "signIn" ? "signUp" : "signIn");
              setError(null);
            }}
            className="font-crimson text-sm text-white/50 hover:text-stellar-gold transition-colors"
          >
            {flow === "signIn" ? "New explorer? Create an account" : "Already have access? Sign in"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={handleAnonymous}
            disabled={isLoading}
            className="cosmic-btn-secondary w-full py-3 rounded-lg text-sm font-orbitron tracking-wider disabled:opacity-50"
          >
            EXPLORE AS GUEST
          </button>
          <p className="mt-2 text-center text-xs text-white/30 font-crimson">
            Limited access • No account required
          </p>
        </div>
      </div>

      {/* Feature highlights */}
      <div
        className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl w-full px-4 animate-fade-in-up opacity-0"
        style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
      >
        <FeatureCard
          icon="🌌"
          title="Claim Analysis"
          description="AI-powered fact verification"
        />
        <FeatureCard
          icon="🔭"
          title="Cosmic Facts"
          description="Real universe mysteries"
        />
        <FeatureCard
          icon="✨"
          title="Witty Debunks"
          description="Truth with personality"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="text-2xl md:text-3xl mb-2">{icon}</div>
      <h3 className="font-orbitron text-xs md:text-sm text-stellar-gold tracking-wide">{title}</h3>
      <p className="font-crimson text-xs md:text-sm text-white/40 mt-1">{description}</p>
    </div>
  );
}
