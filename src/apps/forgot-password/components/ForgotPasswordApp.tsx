
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';

import { AppLayout, AppTitle } from '@common/components';
import { ForgotPasswordFormPanel, ForgotPasswordSuccessPanel } from '@forgot-password/components';
import { IForgotPasswordState } from '@forgot-password/core/types';
import { IPubState } from '@pub/core/types';

interface IMapProps {
  forgotPasswordForm: IForgotPasswordState;
}
const mapStateToProps = ({
  forgotPasswordForm,
}: IPubState): IMapProps => ({
  forgotPasswordForm,
});

interface IForgotPasswordAppProps {
  history: History;
}

export const ForgotPasswordApp =
  connect<IMapProps, never, IForgotPasswordAppProps, IPubState>(
    mapStateToProps,
  )((props: IMapProps & IForgotPasswordAppProps) => (
    <AppTitle append='Forgot Password'>
      <AppLayout theme='dark'>
        {
          !props.forgotPasswordForm.isSent ?
            <ForgotPasswordFormPanel />
            :
            <ForgotPasswordSuccessPanel history={props.history} />
        }
      </AppLayout>
    </AppTitle>
  ),
);
