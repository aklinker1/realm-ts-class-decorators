# Example App

This is an example app of how to define class based properties and models for Realm. __This is not__ an example on how to use Realm in general. I cut corners on the UI and setup side that I would not have done on a real app. Look for other guides on usage rather than following this one.

> One big thing to note is that I do no use redux at all (I didn't want to set it up). Instead, I made a basic version of [android architecture's `ViewModel`](https://developer.android.com/topic/libraries/architecture/viewmodel), which I think is a great design pattern. First time doing something like that and it went really well! Might consider following that approach in the future.

## Example `realm-ts-class-decorators` Usage

- `src/data/models/*` to see how the decorators are used
- `src/data/index.ts` for how to add the classes to the Realm schema when opening the database.

## Running

- Install React Native pre-requisites
- Install `node@10.X`
- `yarn install`
- Open Android Emulator/iOS Simulator
- `yarn android` or `yarn ios`

> This was developed on Ubuntu, so I don't know if iOS will build properly.

