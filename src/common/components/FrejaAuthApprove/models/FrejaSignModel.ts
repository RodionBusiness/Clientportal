export class FrejaSignModel {
  constructor(public title: string = '', public message: string = '') {}
}

export interface IFrejaSignRequestData {
  sign_ref: string;
}

/**
 * STARTED (the transaction has been started but not yet delivered to Freja eID
 * application associated with the end user), DELIVERED_TO_MOBILE (the Freja eID app
 * has downloaded the transaction), OPENED (the user has opened and seen the
 * signature request but neither cancelled nor approved it yet), CANCELLED (the end user
 * declined the signature request), EXPIRED (the signature request was not approved by the
 * end user within the signature validity limit as requested when the signature was initialized),
 * APPROVED (the signature was successful).
 */
export type FrejaStatuses =
  | 'STARTED'
  | 'CANCELED'
  | 'DELIVERED_TO_MOBILE'
  | 'OPENED'
  | 'APPROVED'
  | 'EXPIRED'
  | 'RP_CANCELED';

export interface IFrejaSignResultData {
  status: FrejaStatuses;
}
