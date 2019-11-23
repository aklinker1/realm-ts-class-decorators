import { Object, Results, ObjectChangeCallback, ObjectSchema } from 'realm';

// @ts-ignore - Object is not a class, but this extension is required for class models to work properly.
export default class RealmModel extends Object {
  public static schema: ObjectSchema;
  public isValid!: () => boolean;
  public objectSchema!: () => ObjectSchema;
  public linkingObjects!: <T>(objectType: string, property: string) => Results<T & Realm.Object>;
  public linkingObjectsCount!: () => number;
  public addListener!: (callback: ObjectChangeCallback) => void;
  public removeListener!: (callback: ObjectChangeCallback) => void;
  public removeAllListeners!: () => void;
}
