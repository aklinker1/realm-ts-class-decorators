import { model, property, RealmModel } from 'realm-ts-class-decorators';
import Planet, { PlanetData } from './Planet';

export interface PersonData {
  id: number;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  created: Date;
  edited: Date;

  homeworld?: PlanetData;
}

@model('Person')
export default class Person extends RealmModel implements Realm.Object, PersonData {
  @property({ type: 'int', primaryKey: true }) public id!: number;

  // Regular properties
  @property('string') public name!: string;
  @property('string') public height!: string;
  @property('string') public mass!: string;
  @property('string') public hairColor!: string;
  @property('string') public skinColor!: string;
  @property('string') public eyeColor!: string;
  @property('string') public birthYear!: string;
  @property('string') public gender!: string;
  @property('date') public created!: Date;
  @property('date') public edited!: Date;

  // Linked Properties
  @property('Planet?') public homeworld?: Planet;
}
