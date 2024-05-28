import { Card } from "@prisma/client";
//create card interface
export interface TheCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom: string;
  rules: string[];
  attacks: any[];
  weaknesses: any[];
  resistances: any[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: Images;
}
interface Images {
  small: string;
  large: string;
}
interface Legalities {
  unlimited: string;
  standard: string;
  expanded: string;
}
interface Set {
  id: string;
  name: string;
  series: string;
  printed_total: number;
  total: number;
  legality: string;
  ptcgo_code: string;
  release_date: Date;
  updated_at: Date;
  symbol_url: string;
  logo_url: string;
}

// Function to fetch cards from backend
export const fetchCards = async () => {
  try {
    const response = await fetch(
      "https://pkmntrackerserver-a02b64f0ae1c.herokuapp.com/api/cards/"
    );
    const cards = await response.json();
    return cards; // Assuming your backend returns an array of cards
  } catch (error) {
    console.error("Error fetching cards:", error);
    return []; // Return an empty array or handle the error appropriately
  }
};

export const getCardById = async (id: string): Promise<Card | undefined> => {
  try {
    const response = await fetch(
      `https://pkmntrackerserver-a02b64f0ae1c.herokuapp.com/api/cards/${id}`
    );
    const card = await response.json();
    return card;
  } catch (error) {
    return undefined;
  }
};

export const getCardByName = async (
  name: string
): Promise<Card | undefined> => {
  try {
    const response = await fetch(`/api/cards/${name}`);
    const card = await response.json();
    return card;
  } catch (error) {
    return undefined;
  }
};
