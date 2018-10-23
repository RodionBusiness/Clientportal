import { onboardingIdSide, onboardingIdType } from '@onboarding/Docs/enums';
import {
  makeFormData,
  makeOnfidoPayload,
  requestOnfido,
} from '@onboarding/Docs/helpers';
import { onboardingOnfidoMapper } from '@onboarding/Docs/mappers';
import {
  IOnfidoResponse,
  IOnfidoToken,
} from '@onboarding/Docs/types';

export class OnboardingOnfidoService {

  private readonly ONFIDO_TOKEN_ENDPOINT: string = 'https://token-factory.onfido.com/sdk_token';
  private readonly ONFIDO_DOCUMENTS_ENDPOINT: string = 'https://api.onfido.com/v2/documents';

  private authorizationHeader?: string;

  public async requestDocumentValidation(
    file: File,
    idType: onboardingIdType = onboardingIdType.passport,
    side: onboardingIdSide = onboardingIdSide.front,
    contentType?: string,
  ): Promise<IOnfidoResponse> {
    try {
      const request = await requestOnfido({
        method: 'POST',
        endpoint: this.ONFIDO_DOCUMENTS_ENDPOINT,
        payload: makeFormData(makeOnfidoPayload(file, idType, side)),
        token: this.authorizationHeader || await this.requestAuthorizationHeader(),
        header: (contentType != null) ? { 'Content-Type': contentType } : {},
      });
      return JSON.parse(request.response);
    } catch (request) {
      throw onboardingOnfidoMapper.mapValidationFromRequest(request);
    }
  }

  private async requestAuthorizationHeader(): Promise<string> {
    try {
      const request = await requestOnfido({
        method: 'GET',
        endpoint: this.ONFIDO_TOKEN_ENDPOINT,
      });
      const data: IOnfidoToken = JSON.parse(request.responseText);
      this.authorizationHeader = `Bearer ${data.message}`;
      return this.authorizationHeader;
    } catch (error) {
      throw new Error(error);
    }
  }

}

export const onboardingOnfidoService = new OnboardingOnfidoService();
