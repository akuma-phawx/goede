import { Set, Card } from "@prisma/client";

export type ExtendedCard = Card & {
  set: Omit<Set, "releaseDate" | "cards">;
};
export interface TheSet {
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
export type SetWithCards = Set & {
  cards: ExtendedCard[];
};
// export const getSets = async (): Promise<(Set & { _count: { cards: number } })[]> => {
//   try {
//     const request = await fetch(`/api/sets`);
//     const setsJson = await request.json();
//     return setsJson.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
export const fetchSets = async () => {
  try {
    const response = await fetch(
      "https://pkmntrackerserver-a02b64f0ae1c.herokuapp.com/api/sets/"
    );
    const sets = await response.json();
    return sets; // Assuming your backend returns an array of cards
  } catch (error) {
    console.error("Error fetching sets:", error);
    return []; // Return an empty array or handle the error appropriately
  }
};

export const getSetById = async (
  id: string
): Promise<SetWithCards | undefined> => {
  try {
    const response = await fetch(`/api/sets/${id}`);
    const res = await response.json();
    const set = res.data;
    return set;
  } catch (error) {
    return undefined;
  }
};

export const getSetByName = async (name: string): Promise<Set | undefined> => {
  try {
    const response = await fetch(`/api/sets/${name}`);
    const set = await response.json();
    return set;
  } catch (error) {
    return undefined;
  }
};
