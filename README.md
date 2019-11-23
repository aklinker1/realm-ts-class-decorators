# Realm TS Class Decorators

This is a utility library for :exclamation: ___ONLY___ :exclamation: __react-native__ applications. If you use typescript and use classes to define your models and/or use typescript, this library includes 2 main utilities:

- Better type support for model classes
- Decorators for models and properties

## Basic Usage

The [Realm JavaScript docs](https://realm.io/docs/javascript/latest/#classes) suggest defining classes this way:

```ts
class Person {
  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}

Person.schema = {
  name: 'Person',
  properties: {
    firstName: 'string',
    lastName: 'string'
  }
};
```

There are several things wrong with this for Typescript and class usage in general:

1. The class __needs__ to extend `Realm.Object`
   - Functions like `addListener` or `isValid` on models from `realm.objectForPrimaryKey` will NOT be present (See [realm-js #2430](https://github.com/realm/realm-js/issues/2430) for more info)
2. The class __can't__ extend `Realm.Object` because of bad typing...
3. The `firstName` and `lastName` properties are not defined in the class, so they cannot be accessed like `person.firstName`.

To work around all these issues and make defining the schema easier, the same `"Person"` class can be defined as:

```ts
import RealmModel, { model, property } from 'realm-ts-class-decorators';

@model("Person")
class Person extends RealmModel {
  @property("string") firstName!: string;
  @property("string") lastName!: string;

  get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
  }
}
```

To add this model to realm, nothing has changed. Simply include the class like realm suggests:

```ts
Realm.open({ schema: [Person] })
  .then( /* ... */ );
```
