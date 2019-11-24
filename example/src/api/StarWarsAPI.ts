import Axios from 'axios';

export interface PageResponse<T> {
  count: number;
  next?: string;
  prev?: string;
  results: T[];
}

export interface SWAPIPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  created: string;
  edited: string;
  url: string;
}

export interface SWAPIPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  created: string;
  edited: string;
  url: string;
}

const axios = Axios.create({
  baseURL: 'https://swapi.co/api',
});

export default class StarWarsAPI {
  public static async listPeople(page: number): Promise<PageResponse<SWAPIPerson>> {
    const params = { page };
    const response = await axios.get('/people', { params });
    return response.data;
  }

  public static async person(id: number): Promise<SWAPIPerson> {
    const response = await axios.get(`/people/${id}`);
    console.log('Person response', response);
    return response.data;
  }

  public static async planet(id: number): Promise<SWAPIPlanet> {
    const response = await axios.get(`/planets/${id}`);
    return response.data;
  }
}
