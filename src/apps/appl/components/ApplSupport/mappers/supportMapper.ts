import { ISupportCollectionItemUpdateModel } from '@appl/components/ApplSupport';
import { IUserState } from '@appl/core/types';
import { IDocument } from '@common/core/types';

interface INewSupportMessageData {
  subject: string | null;
  issue: string | null;
  category: string;
  level: string;
  permissions: string;
  feedback: string | null;
  value: number;        // User id
  user: string;         // Current user email
  history: object;
  file_paths: string[];
}

export interface INewSupportMessage {
  subject?: string;
  message?: string;
  feedback?: string;
  document?: IDocument;
}

export const supportMapperMapTo = (
  user: IUserState,
  data: INewSupportMessage,
): INewSupportMessageData => {
  return {
    permissions: (user.roles && user.roles.length > 0) ? user.roles[0] : '',
    category: 'Service',
    feedback: null,
    history: {
      history: [],
    },
    issue: data.message || null,
    level: 'Important',
    subject: data.subject || null,
    user: user.userEmail,
    value: user.userId,
    file_paths: [],
  };
};

export const supportUpdateMapperMapTo = (
  response: ISupportCollectionItemUpdateModel,
): any => {
  return {
    issue_feedback_id: response.id,
    customer_response: response.message || null,
    file_paths: response.document ? [response.document.file] : [],
  };
};
