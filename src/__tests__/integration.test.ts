import Realm from 'realm';
import { model, property } from '../decorators';
import RealmModel from '../RealmModel';
import UpdateMode = Realm.UpdateMode;

@model('Person')
class Person extends RealmModel {
  @property({ type: 'string', primaryKey: true }) id: string | undefined;
  @property('string') firstName: string | undefined;
  @property('string') lastName: string | undefined;
  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}

let realm: Realm;
describe('loads realm and add people object', () => {
  afterAll(() => {
    realm.close();
  });

  it('es6 classes now work in NodeJS', async () => {
    realm = await Realm.open({
      inMemory: true,
      schema: [Person],
    });
    realm.write(() => {
      realm.create(Person.schema.name, { id: '1', firstName: 'John', lastName: 'Doe' }, UpdateMode.Modified);
    });

    const peoples = realm.objects<Person>(Person.schema.name);

    expect(peoples[0].fullName).toEqual('John Doe');
  });
});
