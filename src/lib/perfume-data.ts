import bottleClassic from "@/assets/bottle-classic.png";
import bottleNoir from "@/assets/bottle-noir.png";
import bottleRoyale from "@/assets/bottle-royale.png";
import bottlePhantom from "@/assets/bottle-phantom.png";

export type NoteLayer = "top" | "heart" | "base";

export interface ScentFamily { id: string; name: string; tagline: string; ingredients: string[]; accent: string; }
export const SCENT_FAMILIES: ScentFamily[] = [
  { id: "woody", name: "Woody", tagline: "Grounded. Timeless. Territorial.", ingredients: ["Cedar", "Sandalwood", "Oud", "Vetiver"], accent: "oklch(0.45 0.07 70)" },
  { id: "fresh", name: "Fresh", tagline: "Clean air at altitude.", ingredients: ["Bergamot", "Lemon", "Mint", "Marine accords"], accent: "oklch(0.62 0.11 210)" },
  { id: "oriental", name: "Oriental", tagline: "Warmth that lingers in the room.", ingredients: ["Amber", "Saffron", "Vanilla", "Musk"], accent: "oklch(0.6 0.13 60)" },
  { id: "spicy", name: "Spicy", tagline: "Heat, held with control.", ingredients: ["Pepper", "Cinnamon", "Cardamom", "Nutmeg"], accent: "oklch(0.55 0.15 35)" },
  { id: "floral", name: "Floral", tagline: "Softness worn with authority.", ingredients: ["Rose", "Jasmine", "Lavender", "Iris"], accent: "oklch(0.62 0.1 350)" },
];
export const NOTES: Record<NoteLayer, { title: string; caption: string; options: string[] }> = {
  top: { title: "Top Notes", caption: "The first impression.", options: ["Bergamot", "Lemon", "Grapefruit", "Apple", "Mint", "Pink Pepper"] },
  heart: { title: "Heart Notes", caption: "The personality of the fragrance.", options: ["Lavender", "Jasmine", "Rose", "Cardamom", "Cinnamon", "Iris"] },
  base: { title: "Base Notes", caption: "The long-lasting signature.", options: ["Oud", "Sandalwood", "Cedarwood", "Amber", "Vanilla", "Musk", "Patchouli"] },
};
export interface Personality { id: string; name: string; traits: string[]; line: string; words: string[]; }
export const PERSONALITIES: Personality[] = [
  { id: "king", name: "The King", traits: ["Powerful", "Dark", "Commanding"], line: "Built for the person who decides the tone of the room.", words: ["REIGN", "CROWN", "IMPERIAL", "SOVEREIGN"] },
  { id: "gentleman", name: "The Gentleman", traits: ["Clean", "Elegant", "Sophisticated"], line: "Restraint, tailored to precision.", words: ["ATELIER", "ABSOLUTE", "ROYALE", "CLARITY"] },
  { id: "rebel", name: "The Rebel", traits: ["Smoky", "Spicy", "Unpredictable"], line: "Written for the ones who refuse the script.", words: ["EMBER", "OUTLAW", "RIOT", "ECLIPSE"] },
  { id: "icon", name: "The Icon", traits: ["Luxurious", "Magnetic", "Memorable"], line: "Presence that is remembered long after the exit.", words: ["ICON", "LEGEND", "AURUM", "MONUMENT"] },
  { id: "phantom", name: "The Phantom", traits: ["Dark", "Mysterious", "Seductive"], line: "Arrives quietly. Leaves an impression.", words: ["PHANTOM", "SHADOW", "NOCTURNE", "MIDNIGHT"] },
];
export interface BottleStyle { id: string; name: string; subtitle: string; image: string; glow: string; base: number; }
export const BOTTLES: BottleStyle[] = [
  { id: "classic", name: "Sarkar Classic", subtitle: "Black + Royal Blue", image: bottleClassic, glow: "oklch(0.55 0.19 264)", base: 10000 },
  { id: "noir", name: "Sarkar Noir", subtitle: "Full Black", image: bottleNoir, glow: "oklch(0.4 0.02 265)", base: 10000 },
  { id: "royale", name: "Sarkar Royale", subtitle: "Deep Blue + Metallic details", image: bottleRoyale, glow: "oklch(0.5 0.16 258)", base: 10000 },
  { id: "phantom", name: "Sarkar Phantom", subtitle: "Smoky Black + Dark Grey", image: bottlePhantom, glow: "oklch(0.45 0.02 250)", base: 10000 },
];
export const CAP_FINISHES = [
  { id: "chrome", name: "Polished Chrome", extra: 0 },
  { id: "matte", name: "Matte Gunmetal", extra: 150 },
  { id: "onyx", name: "Onyx Black", extra: 200 },
];
export const LABEL_STYLES = [
  { id: "engraved", name: "Engraved Plate", extra: 0 },
  { id: "minimal", name: "Minimal Type", extra: 0 },
  { id: "crest", name: "King's Crest", extra: 250 },
];
export const SIZES = [
  { id: "50", name: "50 ML", multiplier: 0.68 },
  { id: "100", name: "100 ML", multiplier: 1 },
];
export interface Creation { family: string | null; top: string[]; heart: string[]; base: string[]; personality: string | null; bottle: string; cap: string; label: string; size: string; name: string; }
export const EMPTY_CREATION: Creation = { family: null, top: [], heart: [], base: [], personality: null, bottle: "classic", cap: "chrome", label: "engraved", size: "100", name: "" };
export function getFamily(id: string | null) { return SCENT_FAMILIES.find((f) => f.id === id) ?? null; }
export function getPersonality(id: string | null) { return PERSONALITIES.find((p) => p.id === id) ?? null; }
export function getBottle(id: string) { return BOTTLES.find((b) => b.id === id) ?? BOTTLES[0]!; }
export function priceOf(_c: Creation) { return 10000; }
const NOTE_WORDS: Record<string, string> = { Oud: "OUD", Amber: "AMBER", Vanilla: "VELVET", Musk: "MUSK", Sandalwood: "SANTAL", Cedarwood: "CEDRAT", Patchouli: "TERRA", Bergamot: "BLUE", Lemon: "LUMEN", Grapefruit: "SOLAR", Mint: "GLACIER", "Pink Pepper": "EMBER", Lavender: "AZUR", Jasmine: "NOIRE", Rose: "ROUGE", Cardamom: "SPICE", Cinnamon: "FLAME", Iris: "IVORY", Apple: "VERDE" };
export function generateName(c: Creation) {
  const p = getPersonality(c.personality); const heroNote = [...c.base, ...c.heart, ...c.top][0]; const left = heroNote ? (NOTE_WORDS[heroNote] ?? heroNote.toUpperCase()) : "SARKAR"; const right = p ? p.words[Math.floor(Math.random() * p.words.length)] : "ABSOLUTE";
  const patterns = [`${left} ${right}`, `${right} ${left}`, `SARKAR ${right}`, `${right}`, `${left} REIGN`]; const pick = patterns[Math.floor(Math.random() * patterns.length)]!; return pick.replace(/\s+/g, " ").trim();
}
export function describe(c: Creation) {
  const p = getPersonality(c.personality); const family = getFamily(c.family); const top = c.top.length ? c.top.slice(0, 2).join(" and ").toLowerCase() : "cool citrus"; const heart = c.heart.length ? c.heart.slice(0, 2).join(" and ").toLowerCase() : "soft spice"; const base = c.base.length ? c.base.slice(0, 2).join(" and ").toLowerCase() : "warm woods"; const mood = p ? p.traits.slice(0, 2).join(" and ").toLowerCase() : "quiet and composed"; const closing = p?.line ?? "Designed for those who enter quietly and leave an impression.";
  return `A ${mood} ${family ? family.name.toLowerCase() : "signature"} composition opening on ${top}, settling into ${heart}, and resolving in ${base}. ${closing}`;
}
export interface CollectionItem { id: string; name: string; family: string; description: string; price: number; image: string; }
export const COLLECTION: CollectionItem[] = [
  { id: "classic", name: "Sarkar Classic", family: "Woody Aromatic", description: "Bergamot and cedar over a spine of vetiver. The original statement.", price: 10000, image: bottleClassic },
  { id: "noir", name: "Sarkar Noir", family: "Smoky Oriental", description: "Oud, leather and black pepper. Worn after dark, remembered longer.", price: 10000, image: bottleNoir },
  { id: "royale", name: "Sarkar Royale", family: "Blue Ambery", description: "Marine bergamot lifted by saffron, grounded in amber and musk.", price: 10000, image: bottleRoyale },
  { id: "phantom", name: "Sarkar Phantom", family: "Dark Spicy Woods", description: "Cardamom smoke, iris and patchouli. Presence without announcement.", price: 10000, image: bottlePhantom },
];
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
