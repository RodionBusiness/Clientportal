import { ThunkDispatch } from 'redux-thunk';
import { LoginAppComponent } from '@login/components';
import { connect } from 'react-redux';
import { IPubState } from '@pub/core/types';
import { submit, reset } from '@login/core/actions/loginActions';
import { AnyAction } from 'redux';
import { withRouter } from 'react-router-dom';
import { mapDispatchNotifyActions } from '@common/core/connectors';
import { ILoginModel } from '@login/core/models/ILoginModel';

const mapStateToProps = (state: IPubState) => {
  return {
    ...state.loginState
  };
};

const mapDispatchProps = (dispatch: ThunkDispatch<IPubState, never, AnyAction>) => {
  return {
    ...mapDispatchNotifyActions(dispatch),
    onSubmit: (loginModel: ILoginModel) => dispatch(submit(loginModel)),
    onCancel: () => dispatch(reset())
  };
};

export type ILoginAppContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchProps>;

export const LoginApp = withRouter(
  connect(
    mapStateToProps,
    mapDispatchProps
  )(LoginAppComponent)
);
