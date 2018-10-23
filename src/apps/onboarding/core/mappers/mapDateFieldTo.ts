import * as moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const mapDateFieldTo = (field?: string): string => moment(field).format(DATE_FORMAT);
