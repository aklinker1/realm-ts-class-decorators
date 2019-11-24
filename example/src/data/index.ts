import Realm from 'realm';

export async function openRealm(): Promise<Realm> {
  const realm = await Realm.open({});

  return realm;
}
