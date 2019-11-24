import Realm from 'realm';
import Person, { PersonData } from './data/models/Person';
import Planet, { PlanetData } from './data/models/Planet';
import StarWarsAPI, { SWAPIPerson } from './api/StarWarsAPI';

function idFromURL(url: string): number | undefined {
  const matches = url.match(/.*\/([0-9]+)\/?/);
  if (matches == null) {
    return undefined;
  }
  const idString = matches[1];
  const id = Number.parseInt(idString);
  if (isNaN(id)) {
    return undefined;
  }
  return id;
}

export default class AppViewModel {
  private realm: Realm;
  private loadingListener?: (isLoading: boolean) => void;

  constructor(realm: Realm) {
    this.realm = realm;
  }

  public addLoadingListener = (listener: (isLoading: boolean) => void): void => {
    this.loadingListener = listener;
  };

  public getPeople = (): Realm.Results<Person> => {
    if (this.loadingListener) this.loadingListener(true);
    const results: Realm.Results<Person> = this.realm.objects(Person);
    this.getPeoplePage(1);
    return results;
  };

  private getPeoplePage = async (page: number): Promise<void> => {
    const response = await StarWarsAPI.listPeople(page);
    const hasNextPage = response.next != null;
    const people = response.results;

    for (const person of people) {
      this.getPerson(person);
    }

    if (hasNextPage) {
      this.getPeoplePage(page + 1);
    } else {
      if (this.loadingListener) this.loadingListener(false);
    }
  };

  private getPerson = async (remotePerson: SWAPIPerson): Promise<PersonData | undefined> => {
    const id = idFromURL(remotePerson.url);
    if (id == null) {
      console.warn(`${remotePerson.name}'s id could not be parsed from "${remotePerson.url}"`);
      return;
    }

    const localPerson = this.realm.objectForPrimaryKey(Person, id) as Person | undefined;
    if (localPerson) {
      return;
    }

    const newLocalPerson: PersonData = {
      birthYear: remotePerson.birth_year,
      created: new Date(remotePerson.created),
      edited: new Date(remotePerson.edited),
      eyeColor: remotePerson.eye_color,
      gender: remotePerson.gender,
      hairColor: remotePerson.hair_color,
      height: remotePerson.height,
      id,
      mass: remotePerson.mass,
      name: remotePerson.name,
      skinColor: remotePerson.skin_color,

      homeworld: await this.getPlanet(remotePerson.homeworld),
    };
    this.realm.write(() => {
      this.realm.create('Person', newLocalPerson, true);
    });
    return newLocalPerson;
  };

  private getPlanet = async (url: string): Promise<PlanetData | undefined> => {
    const id = idFromURL(url);
    if (id == null) {
      console.warn(`Could not parse planet's id from "${url}"`);
      return;
    }

    const localPlanet = this.realm.objectForPrimaryKey(Planet, id) as Planet | undefined;
    if (localPlanet) {
      return localPlanet;
    }

    const remotePlanet = await StarWarsAPI.planet(id);
    return {
      climate: remotePlanet.climate,
      created: new Date(remotePlanet.created),
      diameter: remotePlanet.diameter,
      edited: new Date(remotePlanet.edited),
      gravity: remotePlanet.gravity,
      id,
      name: remotePlanet.name,
      orbitalPeriod: remotePlanet.orbital_period,
      population: remotePlanet.population,
      rotationPeriod: remotePlanet.rotation_period,
      surfaceWater: remotePlanet.surface_water,
      terrain: remotePlanet.terrain,
    };
  };
}
