import { RealmModel, property, model } from 'realm-ts-class-decorators';
import Realm from 'realm';
import path from 'path';

@model('Model')
class Model extends RealmModel {
  // @property('string') public primaryKey!: string;
  public primaryKey!: string;
}

(async function main() {
  const realm = await Realm.open({
    schema: [Model],
    path: path.join(__dirname, '..', 'realm'),
    inMemory: true,
  });
  const model = realm.create<Model>(Model.schema.name, {
    primaryKey: 'test',
  });
  console.log(model);
})();
