import * as React from 'react';
import { Row } from 'reactstrap';

import { ApplPanel } from '@appl/components/Appl';
import { ApplSupportForm, ApplSupportTable } from '@appl/components/ApplSupport';
import { AppTitle, PageHeader } from '@common/components';

export class ApplSupportPanel extends React.Component {
  public render() {
    return (
      <ApplPanel>
        <AppTitle append='Support Queries / Messages'>
          <PageHeader title='Support Queries / Messages'>
            <p>
              You can use this to get support or request functionality.
            </p>

            <p>
              BlockSettle recommends that you use this function for shorter queries/support issues.
              For more extensive issues, if you have several questions or if you prefer you are welcome
              to email our <a href='mailto:support@blocksettle.com'>support@blocksettle.com</a> directly.
            </p>
          </PageHeader>

          <Row>
            <div className='col-12 col-md-3'>
              <h2 className='mb-4'>Send Support Query</h2>

              <ApplSupportForm />
            </div>

            <div className='col-12 col-md-9'>
              <h2 className='mb-4'>Support History</h2>

              <div className='helper__label-margin' />

              <ApplSupportTable />
            </div>
          </Row>
        </AppTitle>
      </ApplPanel>
    );
  }
}
