import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const seedFacts = [
  { title: "Spaghettification", fact: "If you fell into a black hole, you'd be stretched into a long thin strand like spaghetti due to tidal forces.", category: "black_holes" },
  { title: "Event Horizon", fact: "The event horizon is the boundary around a black hole beyond which nothing, not even light, can escape.", category: "black_holes" },
  { title: "Hawking Radiation", fact: "Black holes slowly evaporate over time through a process called Hawking radiation, eventually disappearing completely.", category: "black_holes" },
  { title: "Stellar Nurseries", fact: "Stars are born in giant clouds of gas and dust called nebulae, where gravity pulls matter together.", category: "stars" },
  { title: "Neutron Stars", fact: "A neutron star is so dense that a sugar-cube-sized piece of it would weigh about a billion tons.", category: "stars" },
  { title: "Galactic Cannibalism", fact: "Large galaxies grow by absorbing smaller galaxies — our Milky Way is currently consuming several dwarf galaxies.", category: "galaxies" },
  { title: "Cosmic Web", fact: "Galaxies are connected by filaments of dark matter forming a vast cosmic web spanning the observable universe.", category: "galaxies" },
  { title: "Time Dilation", fact: "Near a massive object like a black hole, time moves slower relative to distant observers — proven by Einstein's relativity.", category: "physics" },
  { title: "Quantum Entanglement", fact: "Two entangled particles remain connected regardless of distance — Einstein called this 'spooky action at a distance'.", category: "physics" },
  { title: "The Great Attractor", fact: "A mysterious gravitational anomaly is pulling our entire galaxy cluster toward it at 600 km/s, but we can't see what it is.", category: "mysteries" },
  { title: "Fast Radio Bursts", fact: "Mysterious millisecond-long radio signals from billions of light-years away have been detected, and their origin remains unknown.", category: "mysteries" },
  { title: "Dark Flow", fact: "Some galaxy clusters appear to be moving in a direction that can't be explained by any visible matter.", category: "mysteries" },
];

export const getRandom = query({
  args: {},
  handler: async () => {
    const randomIndex = Math.floor(Math.random() * seedFacts.length);
    return seedFacts[randomIndex];
  },
});

export const getByCategory = query({
  args: { category: v.string() },
  handler: async () => {
    return seedFacts;
  },
});

export const getAll = query({
  args: {},
  handler: async () => {
    return seedFacts;
  },
});
