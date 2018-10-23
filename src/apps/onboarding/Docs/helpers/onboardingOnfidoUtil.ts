import { onboardingIdSide, onboardingIdType } from '@onboarding/Docs/enums';
import { IOnfidoPayload, IOnfidoRequestConfig } from '@onboarding/Docs/types';

export function makeFormData(data: Record<string, any>): FormData {
  return Object.keys(data).reduce(
    (formData, key) => {
      formData.append(key, data[key]);

      return formData;
    },
    new FormData(),
  );
}

export function requestOnfido(config: IOnfidoRequestConfig): Promise<XMLHttpRequest> {
  const { method, endpoint, payload, token, header = {} } = config;

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, endpoint);
    Object.keys(header).forEach(key => request.setRequestHeader(key, header[key]));
    if (token != null) {
      request.setRequestHeader('Authorization', token);
    }
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        resolve(request);
      } else {
        reject(request);
      }
    };
    request.onerror = () => reject(request);
    request.send(payload);
  });
}

export function makeOnfidoValidationsConfig(file: File): Record<string, string> {
  const detectDocument =  { detect_document: 'error' };

  return (file.type.split('/')[1] !== 'pdf')
    ? { ...detectDocument, detect_glare: 'error' }
    : detectDocument;
}

export function makeOnfidoPayload(
  file: File,
  idType: onboardingIdType,
  side: onboardingIdSide,
): IOnfidoPayload {
  return ({
    file,
    side,
    type: idType,
    sdk_source: 'onfido_web_sdk',
    sdk_version: '2.2.0',
    sdk_validations: JSON.stringify(makeOnfidoValidationsConfig(file)),
  });
}
