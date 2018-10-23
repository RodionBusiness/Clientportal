import * as React from 'react';
import { Col, Row } from 'reactstrap';

import { ApplPanel } from '@appl/components/Appl';
import { ApplAddBankAccountFormContainer } from '@appl/components/ApplAddBankAccount';
import { AppTitle, PageHeader } from '@common/components';

export const ApplAddBankAccountPanel = () => (
  <ApplPanel>
    <AppTitle append='Add Bank Account'>
      <PageHeader title='Register New Bank Account' />

      <p className='mb-4'>
        You need to register one or several Designated Bank Account(s) to which you can withdraw funds.
        Note that all Designated Bank Accounts need to be in your name and controlled by you.
      </p>

      <Row>
        <Col xs='7'>
          <ApplAddBankAccountFormContainer />
        </Col>
      </Row>
    </AppTitle>
  </ApplPanel>
);
