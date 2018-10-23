import { TOption } from '@common/components';
import { BSWebSocket } from '@common/core/services';
import { onboardingInitializationMapper } from '@onboarding/core/mappers';
import { onboardingOnfidoDefaultDocs, onboardingOnfidoDocs } from '@onboarding/Docs/values';

export async function createNewFileEntity(_: File, name: string): Promise<void> {
  await BSWebSocket.invoke(
    'client_registration_service',
    'add_new_file_name_for_collected_docs',
    onboardingInitializationMapper.mapToNewFilePayload(name),
  );
}

export function documentOptionsByNationalty(nationality?: string): TOption[] {
  const countryDocuments = (nationality != null)
    ? onboardingOnfidoDocs[nationality] || onboardingOnfidoDefaultDocs
    : onboardingOnfidoDefaultDocs;
  return countryDocuments.map(countryDocument => ({
    value: countryDocument.docType,
    label: countryDocument.docTypeLabel,
  }));
}
