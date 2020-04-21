# Realm TS Class Decorators

![NPM Version](https://img.shields.io/npm/v/realm-ts-class-decorators) ![License](https://img.shields.io/github/license/aklinker1/realm-ts-class-decorators) ![Issues](https://img.shields.io/github/issues/aklinker1/realm-ts-class-decorators)

![ ](coverage/badge-statements.svg) ![ ](coverage/badge-branches.svg) ![ ](coverage/badge-functions.svg) ![ ](coverage/badge-lines.svg)

This is a utility library for `react-native` and `node` applications. If you use classes to define your models and/or use TypeScript as well, this library includes 2 main utilities:

- Better type support for model classes
- Decorators for models and properties

> This library also works with plain JavaScript, providing similar typing benefits, along with the decorators

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

However, there are several things wrong with this for TypeScript and class usage in general:

1. The class __needs__ to extend `Realm.Object`
   - Functions like `addListener` or `isValid` on models from `realm.objectForPrimaryKey` will NOT be present (See [realm-js #2430](https://github.com/realm/realm-js/issues/2430) for more info)
2. The class __can't__ extend `Realm.Object` because of bad typing...
3. The `firstName` and `lastName` properties are not defined in the class, so they cannot be accessed like `person.firstName`.

To work around all these issues and make defining the schema easier, the same `"Person"` class can be defined as:

```ts
import { RealmModel, model, property } from 'realm-ts-class-decorators';

@model("Person")
class Person extends RealmModel {
  @property("string") firstName!: string;
  @property("string") lastName!: string;

  get fullName(): string {
      return this.firstName + ' ' + this.lastName;
  }
}
```

> The important parts of the code above are that:
>
> 1. The class has the `@model()` decorator before it
> 1. The class itself `extends RealmModel`
> 1. Every property stored in Realm has the `@property()` decorator before them

To add this model to Realm, nothing has changed! Simply include the class like Realm suggests:

```ts
Realm.open({ schema: [Person] })
  .then( /* ... */ );
```

## Advanced Usage

For more advanced usage, checkout the [example Star Wars App](https://github.com/aklinker1/realm-ts-class-decorators/tree/master/example)!

Since this library is written in TypeScript, all editors with some form of intellisense should also be able to provide strongly types suggestions for the decorators as well!
