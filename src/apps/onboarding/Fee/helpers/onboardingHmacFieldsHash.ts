import * as crypto from 'crypto';

const HMAC_DIGEST_TYPE = 'sha1';

export interface IHMACValues {
  [prop: string]: string | number;
}

export interface IHmacFieldsHash {
  hash: string;
  fields: IHMACValues;
}

export function hmacHash(input: string, secret: string, type: string = HMAC_DIGEST_TYPE): string {
  const hmac = crypto.createHmac(type, secret);
  hmac.update(input);
  return hmac.digest('hex');
}

export function hmacFieldsHash(fields: IHMACValues, secretKey: string): IHmacFieldsHash {
  const keys = Object.keys(fields).concat('hmac_fields').sort();
  const hmacFields = keys.join(',');
  const extendedFields: IHMACValues = {
    ...fields,
    hmac_fields: hmacFields,
  };
  const input = keys.map(key => `${key}=${extendedFields[key]}`).join('&');
  return {
    hash: hmacHash(input, secretKey, HMAC_DIGEST_TYPE),
    fields: extendedFields,
  };
}
