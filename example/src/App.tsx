import React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TouchableNativeFeedback,
  RefreshControl,
} from 'react-native';
import { openRealm } from './data';
import AppViewModel from './AppViewModel';
import Person from './data/models/Person';

interface State {
  lastUpdated: number;
  isLoading: boolean;
}

export default class App extends React.Component<any, State> {
  public people: Realm.Results<Person> = [] as any;
  public state: State = {
    lastUpdated: Date.now(),
    isLoading: false,
  };
  public viewModel?: AppViewModel;

  public constructor(props: any) {
    super(props);
    openRealm().then(this.realmOpened);
  }

  public componentWillUnmount(): void {
    if (this.people.removeListener) {
      this.people.removeListener(this.onChangePeople);
    }
  }

  public realmOpened = (realm: Realm): void => {
    this.viewModel = new AppViewModel(realm);
    this.viewModel.addLoadingListener(this.onChangeLoading);
    this.loadPeople();
  };

  public loadPeople = (): void => {
    if (this.viewModel) {
      if (this.people.removeListener) this.people.removeListener(this.onChangePeople);
      this.people = this.viewModel.getPeople();
      this.people.addListener(this.onChangePeople);
    }
  };

  public onChangeLoading = (isLoading: boolean): void => {
    console.log({ isLoading });
    this.setState({ isLoading });
  };

  public onChangePeople = (): void => {
    this.setState({ lastUpdated: Date.now() });
    // this.forceUpdate();
  };

  public renderListHeader = (): JSX.Element => (
    <View testID="header" style={[styles.header]}>
      <Text style={[styles.text, styles.headerText]}>{this.people.length} Star Warsians</Text>
    </View>
  );

  public renderListItem = ({ item }: ListRenderItemInfo<Person>): JSX.Element => (
    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} useForeground>
      <View testID="item" style={[styles.listItem]}>
        <View style={styles.listItemProfile} />
        <View style={styles.column}>
          <Text style={[styles.text, styles.listItemName]}>{item.name}</Text>
          <Text style={[styles.textSecondary, styles.listItemHomeworld]}>
            Homeworld: {item.homeworld?.name ?? 'Unknown'}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  public render(): JSX.Element {
    return (
      <FlatList
        testID="list"
        data={this.people}
        extraData={this.state.lastUpdated}
        ListHeaderComponent={this.renderListHeader}
        renderItem={this.renderListItem}
        keyExtractor={(item): string => `${item.id}`}
        refreshing={this.state.isLoading}
        refreshControl={<RefreshControl refreshing={this.state.isLoading} onRefresh={this.loadPeople} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#f8f8f8',
  },
  textSecondary: {
    fontSize: 14,
    color: '#b4b4b4',
  },
  header: {
    height: 48,
    backgroundColor: '#202020',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  listItemProfile: {
    backgroundColor: '#484848',
    borderRadius: 100,
    width: 36,
    height: 36,
    alignSelf: 'center',
    marginRight: 18,
  },
  listItemName: {
    fontWeight: '600',
  },
  listItemHomeworld: {
    marginTop: 2,
  },
});
