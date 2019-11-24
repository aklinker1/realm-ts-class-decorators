# Star Wars Example

This is an example app of how to define class based properties and models for Realm. __This is not__ an example on how to use Realm in general. I cut corners on the UI and setup side that I would not have done on a real app. Look for other guides on usage rather than following this one.

> One big thing to note is that I do no use redux at all (I didn't want to set it up). Instead, I made a basic version of [android architecture's `ViewModel`](https://developer.android.com/topic/libraries/architecture/viewmodel), which I think is a great design pattern. First time doing something like that and it went really well! Might consider following that approach in the future.

## Example `realm-ts-class-decorators` Usage

- `src/data/models/*` to see how the decorators are used
- `src/data/index.ts` for how to add the classes to the Realm schema when opening the database.

### Implementing Interfaces

In general, you will want 1-2 interfaces defining the fields for your models.

1. The API response fields
2. The Realm fields (data before it goes into `realm.create()`)

The second interface is optional if the API response is different than what you plan on storing in Realm. For example, the star wars API returned fields in `snake_case` while I was using `camelCasing`. So I made an interface using snake_case for the API responses, and another that represented what was in Realm. The RealmModel classes implement the second interface, and will throw a typescript error if they don't include all the fields the interface requires.

Here are the parts of the code that define the two interfaces and the model's class for `Person`.

- [`src/api/StarWarsAPI.ts#10`](https://github.com/aklinker1/realm-ts-class-decorators/blob/d6a6f17c7b1f93abc3f39a50556fed7fb6dafcc4/example/src/api/StarWarsAPI.ts#L10) - Defining the API response interface
- [`src/data/models/Person.ts#4`](https://github.com/aklinker1/realm-ts-class-decorators/blob/d6a6f17c7b1f93abc3f39a50556fed7fb6dafcc4/example/src/data/models/Person.ts#L4) - Defining the Realm Interface
- [`src/data/models/Person.ts#20`](https://github.com/aklinker1/realm-ts-class-decorators/blob/d6a6f17c7b1f93abc3f39a50556fed7fb6dafcc4/example/src/data/models/Person.ts#L20) - Defining the class for the RealmModel

## Running

- Follow [React Native's "Getting Started"](https://facebook.github.io/react-native/docs/getting-started) to install all the necessary tools
- Install `node@10.X`
  - For [`nvm`](https://github.com/nvm-sh/nvm) users: `nvm install 10`
- `yarn install`
- Open Android Emulator, iOS Simulator, or a device
- `yarn android` or `yarn ios`

> This was developed on Ubuntu, so I don't know if iOS will build properly.
