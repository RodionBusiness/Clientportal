import { IRegistrationNewDocumentsPayload } from '@onboarding/core/types';

export const onboardingInitializationMapper = {

  mapToNewFilePayload(filename: string): IRegistrationNewDocumentsPayload {
    return {
      file_details: [{
        filename,
        is_personal: true,
      }],
    };
  },

};
