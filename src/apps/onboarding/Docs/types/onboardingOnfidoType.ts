import { onboardingIdSide, onboardingIdType } from '@onboarding/Docs/enums';

export interface IOnfidoToken {
  applicant_id: string;
  message: string;
}

export interface IOnfidoPayload {
  file: Blob;
  type?: onboardingIdType;
  side?: onboardingIdSide;
  sdk_source: string;
  sdk_version: string;
  sdk_validations: string;
}

export interface IOnfidoRequestConfig {
  method: string;
  endpoint: string;
  payload?: FormData;
  token?: string;
  header?: Record<string, string>;
}

export interface IOnfidoResponse {
  [prop: string]: any;
}
