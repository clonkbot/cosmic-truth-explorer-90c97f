import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { BlackHoleViz } from "./BlackHoleViz";
import { ClaimCard } from "./ClaimCard";
import { CosmicFact } from "./CosmicFact";

export function CosmicExplorer() {
  const { signOut } = useAuthActions();
  const [claimText, setClaimText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"verify" | "explore" | "history">("verify");

  const claims = useQuery(api.claims.list);
  const submitClaim = useMutation(api.claims.submit);
  const randomFact = useQuery(api.facts.getRandom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitClaim({ text: claimText.trim() });
      setClaimText("");
      setActiveTab("history");
    } finally {
      setIsSubmitting(false);
    }
  };

  const exampleClaims = [
    "The Earth is flat",
    "Black holes can destroy entire galaxies",
    "The speed of light is constant",
    "Dark matter makes up most of the universe",
    "The Moon landing was faked",
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-cosmic-dark/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <BlackHoleViz size={32} className="sm:w-10 sm:h-10" />
            <div>
              <h1 className="font-orbitron text-xs sm:text-sm text-stellar-gold tracking-wider">
                COSMIC TRUTH
              </h1>
              <p className="font-orbitron text-[10px] sm:text-xs text-white/40 tracking-wide hidden sm:block">
                EXPLORER v1.0
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="font-orbitron text-[10px] sm:text-xs text-white/50 hover:text-cosmic-orange transition-colors tracking-wider px-3 py-2"
          >
            END MISSION
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-6xl mx-auto px-4 mt-4 sm:mt-6">
        <div className="flex gap-1 sm:gap-2 bg-white/5 rounded-lg p-1 overflow-x-auto">
          {[
            { id: "verify", label: "VERIFY CLAIM", icon: "🔍" },
            { id: "explore", label: "EXPLORE", icon: "🌌" },
            { id: "history", label: "HISTORY", icon: "📜" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 min-w-[100px] font-orbitron text-[10px] sm:text-xs tracking-wider py-2.5 sm:py-3 px-3 sm:px-4 rounded-md transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-stellar-gold text-cosmic-dark"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="mr-1 sm:mr-2">{tab.icon}</span>
              <span className="hidden xs:inline sm:inline">{tab.label}</span>
              <span className="xs:hidden sm:hidden">{tab.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {activeTab === "verify" && (
          <VerifySection
            claimText={claimText}
            setClaimText={setClaimText}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            exampleClaims={exampleClaims}
          />
        )}

        {activeTab === "explore" && (
          <ExploreSection randomFact={randomFact} />
        )}

        {activeTab === "history" && (
          <HistorySection claims={claims} />
        )}
      </main>
    </div>
  );
}

function VerifySection({
  claimText,
  setClaimText,
  handleSubmit,
  isSubmitting,
  exampleClaims,
}: {
  claimText: string;
  setClaimText: (text: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  exampleClaims: string[];
}) {
  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl text-white mb-2 sm:mb-3 tracking-wide">
          Submit a <span className="text-stellar-gold">Claim</span> for Verification
        </h2>
        <p className="font-crimson text-sm sm:text-base text-white/50 max-w-lg mx-auto">
          Enter any cosmic claim, scientific statement, or popular belief.
          Our AI will cross-reference it with real data and deliver the truth — with a touch of wit.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="cosmic-card rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <label className="block font-orbitron text-xs text-stellar-gold mb-3 tracking-wider">
            CLAIM TO ANALYZE
          </label>
          <textarea
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            placeholder="e.g., 'Black holes can completely destroy matter' or 'The Sun is yellow'"
            className="cosmic-input w-full px-4 py-3 rounded-lg text-white font-crimson text-base resize-none h-28 sm:h-32"
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2 text-xs text-white/30">
            <span>{claimText.length}/500 characters</span>
          </div>

          <button
            type="submit"
            disabled={!claimText.trim() || isSubmitting}
            className="cosmic-btn w-full py-3 sm:py-4 rounded-lg mt-4 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⟳</span> ANALYZING COSMOS...
              </span>
            ) : (
              "VERIFY WITH COSMIC DATA"
            )}
          </button>
        </div>
      </form>

      {/* Example Claims */}
      <div className="mt-8 sm:mt-10">
        <h3 className="font-orbitron text-xs text-white/40 text-center mb-4 tracking-wider">
          TRY THESE EXAMPLES
        </h3>
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {exampleClaims.map((claim) => (
            <button
              key={claim}
              onClick={() => setClaimText(claim)}
              className="font-crimson text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-stellar-gold hover:border-stellar-gold/30 transition-all"
            >
              {claim}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExploreSection({ randomFact }: { randomFact: { title: string; fact: string; category: string } | undefined }) {
  const allFacts = useQuery(api.facts.getAll);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "black_holes", label: "Black Holes", icon: "🕳️" },
    { id: "stars", label: "Stars", icon: "⭐" },
    { id: "galaxies", label: "Galaxies", icon: "🌌" },
    { id: "physics", label: "Physics", icon: "⚛️" },
    { id: "mysteries", label: "Mysteries", icon: "❓" },
  ];

  const filteredFacts = selectedCategory
    ? allFacts?.filter((f: { title: string; fact: string; category: string }) => f.category === selectedCategory)
    : allFacts;

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl text-white mb-2 sm:mb-3 tracking-wide">
          Explore <span className="text-plasma-cyan">Cosmic</span> Facts
        </h2>
        <p className="font-crimson text-sm sm:text-base text-white/50">
          Journey through the universe's most fascinating truths and mysteries.
        </p>
      </div>

      {/* Featured Fact */}
      {randomFact && (
        <div className="max-w-2xl mx-auto mb-8">
          <CosmicFact fact={randomFact} featured />
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`font-orbitron text-[10px] sm:text-xs tracking-wider py-2 px-3 sm:px-4 rounded-full transition-all ${
            !selectedCategory
              ? "bg-stellar-gold text-cosmic-dark"
              : "bg-white/5 text-white/50 hover:text-white"
          }`}
        >
          ALL
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`font-orbitron text-[10px] sm:text-xs tracking-wider py-2 px-3 sm:px-4 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === cat.id
                ? "bg-stellar-gold text-cosmic-dark"
                : "bg-white/5 text-white/50 hover:text-white"
            }`}
          >
            <span className="mr-1">{cat.icon}</span>
            <span className="hidden sm:inline">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Facts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFacts?.map((fact: { title: string; fact: string; category: string }, index: number) => (
          <div
            key={index}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
          >
            <CosmicFact fact={fact} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HistorySection({ claims }: { claims: Array<{
  _id: Id<"claims">;
  text: string;
  verdict?: string;
  explanation?: string;
  wittyResponse?: string;
  cosmicFact?: string;
  createdAt: number;
}> | undefined }) {
  const deleteClaim = useMutation(api.claims.remove);

  if (claims === undefined) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-2xl mb-4">⟳</div>
        <p className="font-orbitron text-sm text-white/50 tracking-wider">
          LOADING MISSION LOGS...
        </p>
      </div>
    );
  }

  if (claims.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="text-4xl sm:text-5xl mb-4">🔭</div>
        <h3 className="font-orbitron text-base sm:text-lg text-white/60 mb-2 tracking-wide">
          NO CLAIMS ANALYZED YET
        </h3>
        <p className="font-crimson text-sm text-white/40">
          Submit your first claim to begin exploring cosmic truths.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl text-white mb-2 sm:mb-3 tracking-wide">
          Your <span className="text-cosmic-orange">Mission</span> History
        </h2>
        <p className="font-crimson text-sm sm:text-base text-white/50">
          {claims.length} claim{claims.length !== 1 ? "s" : ""} analyzed
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {claims.map((claim, index) => (
          <div
            key={claim._id}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
          >
            <ClaimCard claim={claim} onDelete={() => deleteClaim({ id: claim._id })} />
          </div>
        ))}
      </div>
    </div>
  );
}
