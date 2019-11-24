import { model, property, RealmModel } from 'realm-ts-class-decorators';

export interface PlanetData {
  id: number;
  name: string;
  rotationPeriod: string;
  orbitalPeriod: string;
  diameter: string;
  gravity: string;
  terrain: string;
  climate: string;
  surfaceWater: string;
  population: string;
  created: Date;
  edited: Date;

  // films: any[];
}

@model('Planet')
export default class Planet extends RealmModel implements Realm.Object, PlanetData {
  @property({ type: 'int', primaryKey: true }) public id!: number;

  // Regular properties
  @property('string') public name!: string;
  @property('string') public rotationPeriod!: string;
  @property('string') public orbitalPeriod!: string;
  @property('string') public diameter!: string;
  @property('string') public gravity!: string;
  @property('string') public terrain!: string;
  @property('string') public climate!: string;
  @property('string') public surfaceWater!: string;
  @property('string') public population!: string;
  @property('date') public created!: Date;
  @property('date') public edited!: Date;

  // Linked Properties
  // @property('Film[]') public films!: any[];
}
