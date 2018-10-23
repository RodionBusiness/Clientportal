import { EUserRoles, TMenu } from '@common/core/types';

import { ApplAccountsPanel } from '@appl/components/ApplAccountsPanel';
import { ApplAddBankAccountPanel } from '@appl/components/ApplAddBankAccount';
import { ApplBalancesPanel } from '@appl/components/ApplBalances/ApplBalancesPanel';
import { ApplDealingParticipantPanel } from '@appl/components/ApplDealingParticipant';
import { ApplDepositPanel } from '@appl/components/ApplDepositPanel/ApplDepositPanel';
import { ApplEntityFilesPanel } from '@appl/components/ApplEntityFiles/ApplEntityFilesPanel';
import { ApplFAQPanel } from '@appl/components/ApplFAQ';
import { ApplOverviewPanel } from '@appl/components/ApplOverviewPanel';
import { ApplReportsPanel } from '@appl/components/ApplReportsPanel';
import { ApplSupportPanel } from '@appl/components/ApplSupport';
import { ApplTradesPanel } from '@appl/components/ApplTradesPanel';
import { ApplTransfersPanel } from '@appl/components/ApplTransfersPanel';
import { ApplWithdrawPanel } from '@appl/components/ApplWithdraw/ApplWithdrawPanel';

export const menu: TMenu = {
  main: [{
    label: 'Overview',
    link: '/appl-overview',
    component: ApplOverviewPanel,
  }, {
    label: 'Account Management',
    items: [{
      label: 'Accounts',
      link: '/appl-accounts',
      forRoles: [EUserRoles.EntityAdmin],
      component: ApplAccountsPanel,
    }, {
      label: 'Add Bank Account',
      link: '/appl-add-bank-account',
      forRoles: [EUserRoles.EntityAdmin],
      component: ApplAddBankAccountPanel,
    }, {
      label: 'Deposit',
      link: '/appl-deposit',
      component: ApplDepositPanel,
    }, {
      label: 'Withdraw',
      link: '/appl-withdraw',
      component: ApplWithdrawPanel,
    }, {
      label: 'Dealing Participant',
      link: '/appl-dealing-participant',
      forRoles: [EUserRoles.EntityAdmin],
      component: ApplDealingParticipantPanel,
    },{
      label: 'Entity Files',
      link: '/appl-entity-files',
      component: ApplEntityFilesPanel,
    }],
  }, {
    label: 'History',
    items: [{
      label: 'Trades',
      link: '/appl-trades',
      forRoles: [EUserRoles.EntityAdmin],
      component: ApplTradesPanel,
    }, {
      label: 'Balances',
      link: '/appl-balances',
      component: ApplBalancesPanel,
    }, {
      label: 'Transfers',
      link: '/appl-transfers',
      component: ApplTransfersPanel,
    }],
  }, {
    label: 'Reporting',
    link: '/appl-reporting',
    component: ApplReportsPanel,
  }],

  settingsDropdown: [/*{
    label: 'Two Factor Auth',
    link: '/appl-twofa',
    component: ApplTFAPanel,
  }, {
    label: 'Change Password',
    link: '/appl-change-password',
    component: ApplChangePasswordPanel,
  }*/],

  secondary: [{
    label: 'FAQ',
    link: '/appl-faq',
    component: ApplFAQPanel,
  }, {
    label: 'Support',
    link: '/appl-support',
    component: ApplSupportPanel,
  }, {
    label: 'Logout',
    href: '/login?action=logout',
  }],
};
