import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { SmallLayoutContainer } from '@common/components';
import { navigateToLoginPage } from '@forgot-password/core/actions';
import { IForgotPasswordState } from '@forgot-password/core/types';
import { IPubState } from '@pub/core/types';

interface IDispatchProps {
  onNavigateToLoginPage(): void;
}

interface IMapProps {
  forgotPasswordForm: IForgotPasswordState;
}

interface IForgotPasswordSuccessPanelProps {
  history: History;
}

export const ForgotPasswordSuccessPanel =
  connect<IMapProps, IDispatchProps, IForgotPasswordSuccessPanelProps, IPubState>(
    ({ forgotPasswordForm }) => ({ forgotPasswordForm }),
    (dispatch: ThunkDispatch<IPubState, never, AnyAction>, { history }) => ({
      onNavigateToLoginPage: () => dispatch(navigateToLoginPage(history)),
    }),
  )(props => (
    <SmallLayoutContainer
      title='Email was successfully sent'
      headerIcon='mail'
    >
      <p className='mb-5 text-center'>{props.forgotPasswordForm.successMessage}</p>

      <Button
        block={true}
        color='primary'
        type='button'
        onClick={props.onNavigateToLoginPage}
      >
        Back to login page
      </Button>
    </SmallLayoutContainer>
  ),
  );
