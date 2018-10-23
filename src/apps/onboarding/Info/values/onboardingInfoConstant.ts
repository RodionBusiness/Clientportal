import moment from 'moment';

import { TOption } from '@common/components';
import { onboardingInfoCountries } from '@onboarding/Info/values/onboardingInfoCountries';

export const countriesBlacklist = ['United States'];
export const maxDateOfBirth = moment().add(-18, 'years').add(-1, 'day').endOf('day');

export const maxInputLength = parseInt(
  String(process.env.ONBOARDING_INPUTS_MAX_LEN || 15),
  10,
);

export const countryOptions: TOption[] = onboardingInfoCountries
  .map(country => ({ value: country }));
