import { connect } from 'react-redux';

import { ApplAddBankAccountForm } from '@appl/components/ApplAddBankAccount';
import { mapDispatchNotifyActions } from '@common/core/connectors';

export const ApplAddBankAccountFormContainer =
  connect(null, mapDispatchNotifyActions)(ApplAddBankAccountForm);
