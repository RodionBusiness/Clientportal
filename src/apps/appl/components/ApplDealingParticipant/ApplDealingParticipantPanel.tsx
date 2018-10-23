import * as React from 'react';
import { Col, Row } from 'reactstrap';

import { ApplPanel } from '@appl/components/Appl';
import { ApplDealingParticipantForm } from '@appl/components/ApplDealingParticipant';
import { AppTitle, PageHeader } from '@common/components';

export const ApplDealingParticipantPanel = () => (
  <ApplPanel>
    <AppTitle append='Dealing Participant Application'>
      <PageHeader title='Dealing Participant Application' />

      <Row>
        <Col xs='6'>
          <h3 className='mb-3'>XBT Dealing Status</h3>

          <p>
            BlockSettle encourages Market Participants to apply for Dealing Participant status
            and benefit from formulating responsive quotes to trading interest in bitcoin (Spot XBT).
          </p>

          <p>
            As a Dealing Participant, you can provide liquidity by actively responding to bid
            and ask quotes for Spot XBT.
          </p>

          <p>
            Upon having been accepted as a Dealing Participant you undertake to have:
          </p>

          <p>
            Minimum Fill-to-Quote ratio*: 85%
          </p>

          <p>
            Minimum Account Balance: EUR 5,000 or equivalent in another currency
          </p>

          <p>
            <em>
              *Fill-to-Quote ratio is determined by the amount of filled orders where the dealer submitted
              the most competitive quote.
            </em>
          </p>

          <ApplDealingParticipantForm />
        </Col>
      </Row>
    </AppTitle>
  </ApplPanel>
);
