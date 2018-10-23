import { removeTags, trunc } from '@appl/core/helpers';
import { createPagination } from '@common/core/helpers';
import { ICollection, ICollectionWithFilters, ICollectionWithPagination, IDocument } from '@common/core/types';

const DISPLAY_MAX_LETTERS: number = 45;

export interface ISupportCollectionItemModel {
  id: number;
  date: string;
  subject: string;
  issue: string;
  issueDisplay: string;
  response: string;
  responseDisplay: string;
  status: string;
  author: string;
  isNeededUserResponse: boolean;
  files: string[];
}

export interface ISupportCollectionItemUpdateModel {
  id: number;
  message?: string;
  document?: IDocument;
}

interface ISupportCollectionItemData {
  id: number;
  dated: string;
  subject: string;
  issue: string;
  customer_response: string;
  closed: string;
  request_from_client: boolean;
  related_files: string[];
}

export interface ISupportCollectionData {
  count: number;
  items: ISupportCollectionItemData[];
}

export type TSupportCollection = ICollection<ISupportCollectionItemModel[]>
  & ICollectionWithPagination & ICollectionWithFilters;

export const supportCollectionItemMapFrom = (data: ISupportCollectionItemData): ISupportCollectionItemModel => {
  return {
    id: data.id,
    date: data.dated,
    subject: data.subject,
    issue: data.issue,
    issueDisplay: trunc(data.issue || '', DISPLAY_MAX_LETTERS),
    response: data.customer_response,
    responseDisplay: removeTags(trunc(data.customer_response || '', DISPLAY_MAX_LETTERS)),
    status: data.closed,
    author: data.request_from_client ? 'Me' : 'Support',
    isNeededUserResponse: !data.request_from_client && data.customer_response == null,
    files: data.related_files.map(file => `/upload/${file}`),
  };
};

export const supportCollectionMapFrom = (collection: TSupportCollection, data: ISupportCollectionData)
  : TSupportCollection => {
  const { limit, page } = collection.pagination;

  const pagination = createPagination(limit, page, data.count);
  const items = data.items.map(supportCollectionItemMapFrom);

  return {
    ...collection,
    pagination,
    items,
  };
};
