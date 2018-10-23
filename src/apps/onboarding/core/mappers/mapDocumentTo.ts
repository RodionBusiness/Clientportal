import { IDocument } from '@common/core/types';
import { TDocFile } from '@onboarding/core/types';
import { onboardingIdType } from '@onboarding/Docs/enums';

export const mapDocumentTo = (
  docFile: TDocFile,
  doc?: IDocument,
  docType: onboardingIdType | null = null,
): TDocFile => ({
  ...docFile,
  document_type: docType,
  _type: docFile._type || 'File',
  ...(doc ? {
    file_path: doc.file,
    label: doc.label,
  } : {
    file_path: null,
    label: 'None Loaded',
  }),
});
