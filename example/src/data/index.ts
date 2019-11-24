import Realm from 'realm';
import Person from './models/Person';
import Planet from './models/Planet';

export async function openRealm(): Promise<Realm> {
  const realm = await Realm.open({
    schema: [Person, Planet],
  });

  return realm;
}
