import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { RegistrationAppComponent } from '@registration/components';
import { IPubState } from '@pub/core/types';
import { mapDispatchNotifyActions } from '@common/core/connectors';
import { IRegistrationModel } from '@registration/core/models/RegistrationModel';
import { submit, cancel } from '@registration/core/actions';
import { AnyAction } from 'redux';
import { withRouter } from 'react-router';

const mapStateToProps = (store: IPubState) => {
  return {
    ...store.registrationForm
  };
};

const mapDispatchProps = (dispatch: ThunkDispatch<IPubState, never, AnyAction>) => {
  return {
    ...mapDispatchNotifyActions(dispatch),

    onSubmit: (model: IRegistrationModel) => dispatch(submit(model)),
    onCancel: () => dispatch(cancel())
  };
};

export type IRegistrationAppProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchProps>;

export const RegistrationApp = withRouter(
  connect(
    mapStateToProps,
    mapDispatchProps
  )(RegistrationAppComponent)
);
