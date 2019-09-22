import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isDate from 'lodash/isDate';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isNull from 'lodash/isNull';

let idCount = 0;
const getNewSchemaId: () => number = () => idCount++;

export interface Item {
  id: number;
  species: 'scalar' | 'array' | 'object';
}

export interface ScalarItem extends Item {
  species: 'scalar';
  type: string;
}

export interface ArrayItem extends Item {
  species: 'array';
  items: Array<ScalarItem | ArrayItem | ObjectItem>
}

export interface ObjectItem extends Item {
  species: 'object';
  properties: Array<{
    id: number;
    key: string;
    value: ScalarItem | ArrayItem | ObjectItem;
  }>
}

export type SchemaItem = ScalarItem | ArrayItem | ObjectItem;

const scalarTypes: Array<{
  type: string;
  checker: (v: any) => boolean;
  default: (v: any) => any;
}> = [
  {
    type: 'number',
    checker: isNumber,
    default: v => {
      v = parseFloat(v);
      return isNaN(v) ? 0 : v;
    }
  },
  {
    type: 'string',
    checker: isString,
    default: v => (isString(v) || isNumber(v) || isBoolean(v)) ? `${v}` : ''
  },
  {
    type: 'boolean',
    checker: isBoolean,
    default: v => !!v,
  },
  {
    type: 'null',
    checker: isNull,
    default: () => null,
  },
  {
    type: 'date',
    checker: isDate,
    default: () => new Date(),
  },
];

function detectScalarType (v: any): string | undefined {
  const foundedType = scalarTypes.find(t => t.checker(v));
  return foundedType && foundedType.type;
}

export function detectSchema (json: any): SchemaItem {
  let item: SchemaItem;
  if (isArray(json)) {
    item = {
      id: getNewSchemaId(),
      species: 'array',
      items: json.map(detectSchema),
    }
  } else if (isPlainObject(json)) {
    item = {
      id: getNewSchemaId(),
      species: 'object',
      properties: Object.keys(json).map(key => ({
        id: getNewSchemaId(),
        key,
        value: detectSchema(json[key])
      })),
    }
  } else {
    item = {
      id: getNewSchemaId(),
      species: 'scalar',
      type: detectScalarType(json) || 'string',
    }
  }

  return item;
}
