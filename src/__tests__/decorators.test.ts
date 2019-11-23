import { property, model } from '../decorators';

describe('decorators', () => {
  describe('property(type)', () => {
    it('should set the properties field to the type passed in', () => {
      const type = 'int';

      class Test {
        public static schema: Realm.ObjectSchema;
        @property(type) public test!: number;
      }

      expect(Test.schema).toEqual({
        properties: {
          test: type,
        },
      });
    });
  });

  describe('property(linkedModelName)', () => {
    it("should set the properties field to the type and optional when the type isn't an array", () => {
      const linkedModelName = 'LinkedModelName';

      class Test {
        public static schema: Realm.ObjectSchema;
        @property(linkedModelName) public test!: any;
      }

      expect(Test.schema).toEqual({
        properties: {
          test: linkedModelName,
        },
      });
    });
  });

  describe('property({config})', () => {
    it('should spread the config object into the property on the schema', () => {
      const config = {
        type: 'int' as const,
        optional: true,
      };

      class Test {
        public static schema: Realm.ObjectSchema;
        @property(config) public test!: any;
      }

      expect(Test.schema).toEqual({
        properties: {
          test: config,
        },
      });
    });

    it('should set the primary key when included', () => {
      const config = {
        type: 'int' as const,
        optional: true,
        primaryKey: true,
      };

      class Test {
        public static schema: Realm.ObjectSchema;
        @property(config) public test!: any;
      }

      expect(Test.schema).toEqual({
        primaryKey: 'test',
        properties: {
          test: config,
        },
      });
    });

    it('should map the linked model properties to a regular property', () => {
      const config = {
        linkedModel: 'OtherModel',
        optional: true as any,
        default: 'test' as any,
        indexed: 'index' as any,
        mapTo: 'map to' as any,
      };

      class Test {
        public static schema: Realm.ObjectSchema;
        @property(config) public test!: any;
      }

      expect(Test.schema).toEqual({
        properties: {
          test: {
            type: config.linkedModel,
            optional: true,
            default: 'test',
            indexed: 'index',
            mapTo: 'map to',
          },
        },
      });
    });
  });

  describe('model(name)', () => {
    it('should set the name field on the schema', () => {
      const modelName = 'Name of Model';

      @model(modelName)
      class Test {
        public static schema: Realm.ObjectSchema;
      }

      expect(Test.schema).toEqual({
        name: modelName,
        properties: {},
      });
    });

    it('should add to an existing schema', () => {
      const modelName = 'Name of Model';

      @model(modelName)
      class Test {
        public static schema = {
          primaryKey: 'test',
        };
      }

      expect(Test.schema).toEqual({
        name: modelName,
        primaryKey: 'test',
        properties: {},
      });
    });
  });

  describe('model and properties', () => {
    @model('TestItem')
    class TestItem {
      public static schema: Realm.ObjectSchema;

      @property({ type: 'int', primaryKey: true }) public id!: number;
      @property('int') public index!: number;
      @property({ linkedModel: 'OtherItem' }) public otherItem?: any;
      @property('FinalItem?') public finalItem?: any;
    }

    it('should have the name set to "TestItem"', () => {
      expect(TestItem.schema.name).toBe('TestItem');
    });

    it('should have the id as the primary key', () => {
      expect(TestItem.schema.primaryKey).toBe('id');
    });

    it('should have id as an "int"', () => {
      expect(TestItem.schema.properties.id).toEqual({
        type: 'int',
        primaryKey: true,
      });
    });

    it('should have index as an "int"', () => {
      expect(TestItem.schema.properties.index).toEqual('int');
    });

    it('should have otherItem as an "OtherItem"', () => {
      expect(TestItem.schema.properties.otherItem).toEqual({
        type: 'OtherItem',
      });
    });

    it('should have finalItem as a "FinalItem?"', () => {
      expect(TestItem.schema.properties.finalItem).toEqual('FinalItem?');
    });
  });
});
