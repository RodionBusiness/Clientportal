import * as React from 'react';
import { Col, Input, Row } from 'reactstrap';

import { TBankInfo } from '@appl/components/ApplAddBankAccount';

import { BSFormGroup, BSFormLabel } from '@common/components';

interface IApplBankAccountInfoProps {
  bankInfo: TBankInfo;
}

export const ApplBankAccountInfo: React.StatelessComponent<IApplBankAccountInfoProps> = ({
  bankInfo,
}) => (
  <div>
    <h4 className='mb-3 pt-3'>Bank Address</h4>

    <Row>
      <Col xs='6'>
        <BSFormGroup>
          <BSFormLabel>Name of Bank</BSFormLabel>
          <Input
            value={bankInfo.name || ''}
            type='text'
            disabled={true}
          />
        </BSFormGroup>

        <BSFormGroup>
          <BSFormLabel>Address 2</BSFormLabel>
          <Input
            value={bankInfo.address2 || ''}
            type='text'
            disabled={true}
          />
        </BSFormGroup>

        <BSFormGroup>
          <BSFormLabel>City</BSFormLabel>
          <Input
            value={bankInfo.city}
            type='text'
            disabled={true}
          />
        </BSFormGroup>

        <BSFormGroup>
          <BSFormLabel>ZIP/Postcode</BSFormLabel>
          <Input
            value={bankInfo.zip || ''}
            type='text'
            disabled={true}
          />
        </BSFormGroup>
      </Col>

      <Col xs='6'>
        <BSFormGroup>
          <BSFormLabel>Address 1</BSFormLabel>
          <Input
            value={bankInfo.address1 || ''}
            type='text'
            disabled={true}
          />
        </BSFormGroup>

        <BSFormGroup>
          <BSFormLabel>Branch</BSFormLabel>
          <Input
            value={bankInfo.branch || ''}
            type='text'
            disabled={true}
          />
        </BSFormGroup>

        <BSFormGroup>
          <BSFormLabel>State/Province</BSFormLabel>
          <Input
            value={bankInfo.state || ''}
            type='text'
            disabled={true}
          />
        </BSFormGroup>

        <BSFormGroup>
          <BSFormLabel>Account’s Country</BSFormLabel>
          <Input
            value={bankInfo.country || ''}
            type='text'
            disabled={true}
          />
        </BSFormGroup>
      </Col>
    </Row>
  </div>
);
