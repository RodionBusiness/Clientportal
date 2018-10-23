import * as crypto from 'crypto';

export interface IEveryPayPaymentReference {
  nonce: string;
  orderReference: string;
}

const BYTES_LEN = 24;

export const getPaymentReference = async (
  email: string,
): Promise<IEveryPayPaymentReference> => {
  const hex = crypto.randomBytes(BYTES_LEN).toString('hex');
  return Promise.resolve({
    nonce: hex,
    orderReference: `${email}__application__fee`,
  });
};
