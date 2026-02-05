import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Witty responses for different verdicts
const wittyResponses = {
  verified: [
    "The cosmos confirms: you've stumbled upon truth!",
    "Even black holes can't swallow this fact.",
    "Newton would nod approvingly.",
    "The universe says: yes, this checks out!",
    "Verified by the laws of physics themselves.",
  ],
  debunked: [
    "Houston, we have a problem with this claim.",
    "This theory has been sucked into the misinformation black hole.",
    "The stars have aligned against this one.",
    "Even a flat-earther would raise an eyebrow.",
    "This claim has less mass than a neutrino's credibility.",
  ],
  cosmic_mystery: [
    "This remains one of the universe's great unknowns.",
    "Not even Hawking could settle this one definitively.",
    "The jury of galaxies is still out.",
    "Some questions make even dark matter look transparent.",
    "This is quantum-level uncertain.",
  ],
};

const cosmicFacts = [
  "A teaspoon of neutron star material weighs about 6 billion tons.",
  "Black holes don't actually 'suck' — they pull with gravity like any other mass.",
  "There are more stars in the universe than grains of sand on Earth.",
  "Light from the Sun takes 8 minutes to reach Earth.",
  "The observable universe is 93 billion light-years in diameter.",
  "Venus rotates backwards compared to most planets.",
  "A year on Mercury is just 88 Earth days.",
  "The largest known star, UY Scuti, could fit 5 billion Suns inside it.",
];

// Simulate claim analysis
function analyzeClaim(text: string): { verdict: string; explanation: string } {
  const lowerText = text.toLowerCase();

  // Check for common misconceptions
  if (lowerText.includes("flat earth")) {
    return { verdict: "debunked", explanation: "Earth's spherical shape has been confirmed by countless observations, satellite imagery, and the fact that ships disappear bottom-first over the horizon." };
  }
  if (lowerText.includes("moon landing") && lowerText.includes("fake")) {
    return { verdict: "debunked", explanation: "The Apollo moon landings are verified by independent sources worldwide, including reflectors left on the lunar surface that scientists still use today." };
  }
  if (lowerText.includes("black hole") && lowerText.includes("dangerous")) {
    return { verdict: "cosmic_mystery", explanation: "While black holes are extreme objects, the nearest one is 1,500 light-years away. They only pose danger if you get very, very close." };
  }
  if (lowerText.includes("sun") && lowerText.includes("yellow")) {
    return { verdict: "debunked", explanation: "The Sun is actually white when viewed from space. It appears yellow through Earth's atmosphere due to light scattering." };
  }
  if (lowerText.includes("speed of light")) {
    return { verdict: "verified", explanation: "The speed of light in vacuum is approximately 299,792,458 meters per second — a fundamental constant of the universe." };
  }
  if (lowerText.includes("galaxy") && lowerText.includes("andromeda")) {
    return { verdict: "verified", explanation: "The Andromeda Galaxy is indeed on a collision course with the Milky Way, expected in about 4.5 billion years." };
  }
  if (lowerText.includes("dark matter") || lowerText.includes("dark energy")) {
    return { verdict: "cosmic_mystery", explanation: "Dark matter and dark energy make up about 95% of the universe, yet we still don't know exactly what they are. This is one of cosmology's greatest mysteries." };
  }

  // Default to cosmic mystery for unmatched claims
  const verdicts = ["verified", "debunked", "cosmic_mystery"];
  const randomVerdict = verdicts[Math.floor(Math.random() * 3)];
  return {
    verdict: randomVerdict,
    explanation: randomVerdict === "verified"
      ? "Based on current scientific consensus, this claim appears to hold up to scrutiny."
      : randomVerdict === "debunked"
      ? "This claim conflicts with established scientific understanding."
      : "The scientific community hasn't reached a definitive conclusion on this topic."
  };
}

export const submit = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const { verdict, explanation } = analyzeClaim(args.text);
    const wittyPool = wittyResponses[verdict as keyof typeof wittyResponses];
    const wittyResponse = wittyPool[Math.floor(Math.random() * wittyPool.length)];
    const cosmicFact = cosmicFacts[Math.floor(Math.random() * cosmicFacts.length)];

    return await ctx.db.insert("claims", {
      text: args.text,
      userId,
      verdict,
      explanation,
      wittyResponse,
      cosmicFact,
      createdAt: Date.now(),
      processedAt: Date.now(),
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("claims")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(20);
  },
});

export const getRecent = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("claims")
      .withIndex("by_created")
      .order("desc")
      .take(5);
  },
});

export const remove = mutation({
  args: { id: v.id("claims") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const claim = await ctx.db.get(args.id);
    if (!claim || claim.userId !== userId) throw new Error("Not found");

    await ctx.db.delete(args.id);
  },
});
