import Realm from 'realm';
import { model, property } from '../decorators';
import RealmModel from '../RealmModel';
import UpdateMode = Realm.UpdateMode;

@model('People')
class People extends RealmModel {
  @property({ type: 'string', primaryKey: true }) id: string | undefined;
  @property('string') firstName: string | undefined;
  @property('string') lastName: string | undefined;
  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}

describe('loads realm and add people object', () => {
  it('es6 classes now work in NodeJS', async () => {
    const realm = await Realm.open({
      schema: [People],
    });
    realm.write(() => {
      realm.create(People.schema.name, { id: '1', firstName: 'John', lastName: 'Doe' }, UpdateMode.Modified);
    });

    const peoples = realm.objects<People>(People.schema.name);

    expect(peoples[0].fullName).toEqual('John Doe');
  });
});
