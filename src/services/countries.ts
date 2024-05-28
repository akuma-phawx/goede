import { Country } from '@prisma/client';
export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`/api/countries`);
    const countries = await response.json();
    return countries.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
//create a function called getCountriesRefactor but instead of doing a fetch api call just load the json file from the root of the project
export const getCountriesRefactor = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`/countries.json`);
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error(error);
    return [];
  }
};
