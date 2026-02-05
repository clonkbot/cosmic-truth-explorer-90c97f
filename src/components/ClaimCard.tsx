import { Id } from "../../convex/_generated/dataModel";

interface ClaimCardProps {
  claim: {
    _id: Id<"claims">;
    text: string;
    verdict?: string;
    explanation?: string;
    wittyResponse?: string;
    cosmicFact?: string;
    createdAt: number;
  };
  onDelete: () => void;
}

export function ClaimCard({ claim, onDelete }: ClaimCardProps) {
  const verdictConfig = {
    verified: {
      label: "VERIFIED",
      icon: "✓",
      className: "verdict-verified",
    },
    debunked: {
      label: "DEBUNKED",
      icon: "✗",
      className: "verdict-debunked",
    },
    cosmic_mystery: {
      label: "COSMIC MYSTERY",
      icon: "?",
      className: "verdict-cosmic_mystery",
    },
  };

  const config = claim.verdict
    ? verdictConfig[claim.verdict as keyof typeof verdictConfig]
    : verdictConfig.cosmic_mystery;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="cosmic-card rounded-xl p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <p className="font-crimson text-base sm:text-lg text-white leading-relaxed break-words">
            "{claim.text}"
          </p>
        </div>
        <span className={`shrink-0 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-orbitron tracking-wider ${config.className}`}>
          <span className="mr-1">{config.icon}</span>
          <span className="hidden xs:inline sm:inline">{config.label}</span>
        </span>
      </div>

      {/* Explanation */}
      {claim.explanation && (
        <div className="mb-3 sm:mb-4 pl-3 sm:pl-4 border-l-2 border-stellar-gold/30">
          <p className="font-crimson text-sm sm:text-base text-white/70 leading-relaxed">
            {claim.explanation}
          </p>
        </div>
      )}

      {/* Witty Response */}
      {claim.wittyResponse && (
        <div className="mb-3 sm:mb-4 bg-white/5 rounded-lg p-3">
          <p className="font-crimson text-sm italic text-stellar-gold/80">
            "{claim.wittyResponse}"
          </p>
        </div>
      )}

      {/* Cosmic Fact Bonus */}
      {claim.cosmicFact && (
        <div className="mb-3 sm:mb-4 bg-plasma-cyan/5 rounded-lg p-3 border border-plasma-cyan/20">
          <p className="font-orbitron text-[10px] text-plasma-cyan/60 tracking-wider mb-1">
            BONUS COSMIC FACT
          </p>
          <p className="font-crimson text-xs sm:text-sm text-white/60">
            {claim.cosmicFact}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="font-orbitron text-[10px] text-white/30 tracking-wider">
          {formatDate(claim.createdAt)}
        </span>
        <button
          onClick={onDelete}
          className="font-orbitron text-[10px] text-white/30 hover:text-cosmic-orange transition-colors tracking-wider px-2 py-1"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
