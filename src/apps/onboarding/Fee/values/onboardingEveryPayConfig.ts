export const IFRAME_ID = 'iframe-everypay-payment-container';

export const EVERYPAY_API_TEST_DOMAIN_HOSTNAME_WHITELIST =
  JSON.parse(String(process.env.EVERYPAY_API_TEST_DOMAIN_HOSTNAME_WHITELIST));

export const EVERYPAY_API_IS_TEST_DOMAIN =
  EVERYPAY_API_TEST_DOMAIN_HOSTNAME_WHITELIST.indexOf(window.location.host) >= 0;

export const ONBOARDING_FEE_AMOUNT = parseFloat(String(process.env.ONBOARDING_FEE_AMOUNT));

export const EVERYPAY_PROD_CONFIG = {
  ACCOUNT_ID: String(process.env.EVERYPAY_ACCOUNT_ID || ''),
  API_USERNAME: String(process.env.EVERYPAY_API_USERNAME || ''),
  API_SECRET: String(process.env.EVERYPAY_API_SECRET || ''),
  SKIN_NAME: String(process.env.EVERYPAY_SKIN_NAME || 'default'),
  API_ENDPOINT: String(process.env.EVERYPAY_API_ENDPOINT),
};

export const EVERYPAY_TEST_CONFIG = {
  ACCOUNT_ID: String(process.env.EVERYPAY_TEST_ACCOUNT_ID || ''),
  API_USERNAME: String(process.env.EVERYPAY_TEST_API_USERNAME || ''),
  API_SECRET: String(process.env.EVERYPAY_TEST_API_SECRET || ''),
  SKIN_NAME: String(
    process.env.EVERYPAY_TEST_SKIN_NAME || process.env.EVERYPAY_SKIN_NAME || 'default',
  ),
  API_ENDPOINT: String(process.env.EVERYPAY_API_ENDPOINT_TEST_DOMAIN),
};

export const EVERYPAY_CONFIG =
  EVERYPAY_API_IS_TEST_DOMAIN ? EVERYPAY_TEST_CONFIG : EVERYPAY_PROD_CONFIG;

export const EVERYPAY_SUCCESS_SUBMIT_DELAY =
  parseInt(String(process.env.EVERYPAY_SUCCESS_SUBMIT_DELAY || 2000), 10);

if (
  !EVERYPAY_TEST_CONFIG.ACCOUNT_ID ||
  !EVERYPAY_TEST_CONFIG.API_USERNAME ||
  !EVERYPAY_TEST_CONFIG.API_SECRET
) {
  // tslint:disable-next-line no-console
  console.warn(
    `One of [EVERYPAY_TEST_ACCOUNT_ID, EVERYPAY_TEST_API_USERNAME, EVERYPAY_TEST_API_SECRET]
    is not provided. Test payments will not work!`,
  );
}

if (
  !EVERYPAY_PROD_CONFIG.ACCOUNT_ID ||
  !EVERYPAY_PROD_CONFIG.API_USERNAME ||
  !EVERYPAY_PROD_CONFIG.API_SECRET
) {
  // tslint:disable-next-line no-console
  console.warn(
    `One of [EVERYPAY_ACCOUNT_ID, EVERYPAY_API_USERNAME, EVERYPAY_API_SECRET] is not provided.
    Production payments will not work!`,
  );
}
