import React from 'react';
import { View, Text } from 'react-native';
import { openRealm } from './data';

export default class App extends React.Component {
  public constructor(props: any) {
    super(props);
    openRealm().then(this.realmOpened);
  }

  public realmOpened = (realm: Realm): void => {};

  public render(): JSX.Element {
    return (
      <View>
        <Text>Hello world</Text>
      </View>
    );
  }
}
