interface CosmicFactProps {
  fact: {
    title: string;
    fact: string;
    category: string;
  };
  featured?: boolean;
}

const categoryIcons: Record<string, string> = {
  black_holes: "🕳️",
  stars: "⭐",
  galaxies: "🌌",
  physics: "⚛️",
  mysteries: "❓",
};

const categoryColors: Record<string, string> = {
  black_holes: "border-stellar-gold/40 bg-stellar-gold/5",
  stars: "border-cosmic-orange/40 bg-cosmic-orange/5",
  galaxies: "border-plasma-cyan/40 bg-plasma-cyan/5",
  physics: "border-white/40 bg-white/5",
  mysteries: "border-nebula-purple bg-nebula-purple/20",
};

export function CosmicFact({ fact, featured = false }: CosmicFactProps) {
  const icon = categoryIcons[fact.category] || "✨";
  const colorClass = categoryColors[fact.category] || "border-white/20 bg-white/5";

  if (featured) {
    return (
      <div className={`cosmic-card rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 ${colorClass}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl sm:text-2xl">{icon}</span>
          <span className="font-orbitron text-[10px] sm:text-xs text-stellar-gold tracking-wider">
            FEATURED DISCOVERY
          </span>
        </div>
        <h3 className="font-orbitron text-lg sm:text-xl text-white mb-2 sm:mb-3 tracking-wide">
          {fact.title}
        </h3>
        <p className="font-crimson text-base sm:text-lg text-white/70 leading-relaxed">
          {fact.fact}
        </p>
        <div className="mt-4 pt-4 border-t border-white/10">
          <span className="font-orbitron text-[10px] text-white/30 tracking-wider uppercase">
            {fact.category.replace("_", " ")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`cosmic-card rounded-xl p-4 border ${colorClass}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl sm:text-2xl shrink-0">{icon}</span>
        <div className="min-w-0">
          <h4 className="font-orbitron text-xs sm:text-sm text-white mb-1 tracking-wide">
            {fact.title}
          </h4>
          <p className="font-crimson text-sm text-white/60 leading-relaxed">
            {fact.fact}
          </p>
        </div>
      </div>
    </div>
  );
}
