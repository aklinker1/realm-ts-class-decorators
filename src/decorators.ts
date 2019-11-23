import { ObjectSchemaProperty } from 'realm';

type PropertyDecorator = (target: any, key: string) => void;
type ClassDecorator = (constructor: any) => void;

type OptionalPropertyType = 'bool?' | 'int?' | 'float?' | 'double?' | 'string?' | 'data?' | 'date?';
type BasicPropertyType = 'bool' | 'int' | 'float' | 'double' | 'string' | 'data' | 'date';
interface BasicPropertyConfig {
  type: BasicPropertyType;
  optional?: boolean;
  default?: any;
  indexed?: boolean;
  mapTo?: string;
  primaryKey?: boolean;
}
type ListPropertyType = 'bool[]' | 'int[]' | 'float[]' | 'double[]' | 'string[]' | 'data[]' | 'date[]';
interface ListPropertyConfig {
  type: ListPropertyType;
  default?: any;
  mapTo?: string;
}
interface LinkedPropertyConfig {
  linkedModel: string;
  optional?: boolean;
  default?: any;
  indexed?: boolean;
  mapTo?: string;
}
type PropertyConfig = BasicPropertyConfig | ListPropertyConfig | LinkedPropertyConfig;

function initializeSchema(constructor: any): void {
  if (!constructor.schema) {
    constructor.schema = {
      properties: {},
    }
  } else if (!constructor.schema.properties) {
    constructor.schema.properties = {};
  }
}

export function property(type: BasicPropertyType | OptionalPropertyType | ListPropertyType): PropertyDecorator;
export function property(type: string): PropertyDecorator;
export function property(config: PropertyConfig): PropertyDecorator;
export function property(arg1: string | PropertyConfig): PropertyDecorator {
  return (target, key) => {
    let property: ObjectSchemaProperty | string;
    let isPrimaryKey = false;
    if (typeof arg1 === 'string') {
      property = arg1;
    } else {
      if ("linkedModel" in arg1) {
        property = {
          type: arg1.linkedModel,
          optional: arg1.optional,
          default: arg1.default,
          indexed: arg1.indexed,
          mapTo: arg1.mapTo,
        }
      } else {
        property = {
          ...arg1,
        };
        isPrimaryKey = 'primaryKey' in arg1 && !!arg1.primaryKey;
      }
    }

    initializeSchema(target.constructor);
    target.constructor.schema.properties[key] = property;
    if (isPrimaryKey) {
      target.constructor.schema.primaryKey = key;
    }
  }
}

/**
 * This will add the "name" field to the static schema object. While the name could be inferred from the class's
 * constructor, it is required because obfuscating the JS bundle in production builds changes the class names, and thus
 * produces inconsistent or duplicate Realm model names.
 * @param name The model name in realm. This can be different from the class name
 */
export function model(name: string): ClassDecorator {
  return (constructor) => {
    initializeSchema(constructor);
    constructor.schema.name = name;
  }
}
