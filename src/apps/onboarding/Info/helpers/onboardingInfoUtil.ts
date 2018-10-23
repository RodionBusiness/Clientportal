import moment from 'moment';

export function formatSwedenPersonalId(dateOfBirth?: string, swedenPersonalId?: string): string {
  const numberPart = String(swedenPersonalId || '-').split('-')[1];
  return dateOfBirth
    ? `${moment(dateOfBirth).format('YYMMDD')}-${numberPart || ''}`
    : '';
}
