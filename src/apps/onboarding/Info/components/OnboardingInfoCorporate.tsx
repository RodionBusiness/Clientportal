import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  BSFormGroup,
  BSInput,
  BSNativeForm,
  BSSelect,
  IBSNativeFormDefaults,
  IntlTelInput,
} from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { saveStepDataPersistent } from '@onboarding/core/actions';
import { IOnboardingStore, IRegistrationContactData } from '@onboarding/core/types';
import { countriesBlacklist, countryOptions, maxInputLength } from '@onboarding/Info/values';
import { OnboardingLayout, OnboardingProgress } from '@onboarding/Main/components';
import { IOnboardingStepsContentProps } from '@onboarding/Main/types';

type TPropsMap =
  & IDispatchNotifyActionsProps
  & IOnboardingStepsContentProps
  & IStoreMap
  & IDispatchMap;

interface IStateMap {
  nationalityCustomValidity?: string;
  countryCustomValidity?: string;
}

interface IStoreMap {
  info: IRegistrationContactData;
}

interface IDispatchMap {
  saveData(values: IRegistrationContactData): void;
}

class OnboardingInfoCorporateComponent extends React.Component<TPropsMap, IStateMap> {

  public state: IStateMap = {};

  public render(): React.ReactNode {
    const { info } = this.props;
    const { countryCustomValidity, nationalityCustomValidity } = this.state;
    return (
      <OnboardingLayout
        title='Complete participant onboarding process'
        className='onboarding-panel-scroll-target'
      >
        <OnboardingProgress />
        <BSNativeForm<{}, IRegistrationContactData>
          onSubmit={this.submitStep}
          defaults={info as IBSNativeFormDefaults}
        >
          {(formApi, values) => {
            const { nationality, country } = values;
            return (
              <section>
                <h3 className='text-center mb-4'>
                  Please continue process
                  <br />
                  by completing the form
                </h3>
                <BSFormGroup formApi={formApi} field='domincle'>
                  <BSSelect
                    field='domincle'
                    formLabel='Company Domincle *'
                    placeholder='Domincle'
                    label='Choose company domincle...'
                    formApi={formApi}
                    options={countryOptions}
                    required={true}
                    onSelectValue={this.onCountryFieldChange('nationalityCustomValidity')}
                    customValidity={nationalityCustomValidity || ''}
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='companyRegistrationNumber'>
                  <BSInput
                    formApi={formApi}
                    field='companyRegistrationNumber'
                    required={true}
                    formLabel='Company Registration No. *'
                    placeholder='Company Registration No.'
                    maxLength={maxInputLength}
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='address'>
                  <BSInput
                    formApi={formApi}
                    field='address'
                    required={true}
                    formLabel='Address *'
                    placeholder='Address'
                    maxLength={maxInputLength}
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='address2'>
                  <BSInput
                    formApi={formApi}
                    field='address2'
                    formLabel='Address 2'
                    placeholder='Address 2'
                    maxLength={maxInputLength}
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='postcode'>
                  <BSInput
                    formApi={formApi}
                    field='postcode'
                    required={true}
                    formLabel='Postcode *'
                    placeholder='Postcode'
                    maxLength={maxInputLength}
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='city'>
                  <BSInput
                    formApi={formApi}
                    field='city'
                    required={true}
                    formLabel='City *'
                    placeholder='City'
                    maxLength={maxInputLength}
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='country'>
                  <BSSelect
                    formApi={formApi}
                    field='country'
                    required={true}
                    formLabel='Country *'
                    label='Choose country...'
                    options={countryOptions}
                    onSelectValue={this.onCountryFieldChange('countryCustomValidity')}
                    customValidity={countryCustomValidity || ''}
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='phone'>
                  <IntlTelInput
                    field='phone'
                    formApi={formApi}
                    defaultCountry={country || nationality}
                    formLabel='Phone number of authorised representative'
                    required={true}
                  />
                </BSFormGroup>
                <BSFormGroup>
                  <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled={!formApi.valid()}
                  >
                    Continue
                  </button>
                </BSFormGroup>
              </section>
            );
          }}
        </BSNativeForm>
      </OnboardingLayout>
    );
  }

  private onCountryFieldChange: (field: string) => (value: string) => void = field => (value) => {
    if (countriesBlacklist.includes(value)) {
      this.props.notifyError(`US citizens cannot register`);
      this.setState({ [field]: 'US residents cannot register' });
    } else {
      this.setState({ [field]: '' });
    }
  }

  private submitStep: (values: IRegistrationContactData) => void = (values) => {
    const { saveData, stepSubmit } = this.props;
    saveData(values);
    stepSubmit();
  }

}

const mapStateToProps: MapStateToProps<IStoreMap, {}, IOnboardingStore> =
  ({ registrationData: { contacts } }) => ({ info: contacts });

const mapDispatchToProps: MapDispatchToProps<IDispatchNotifyActionsProps & IDispatchMap, {}> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  ...mapDispatchNotifyActions(dispatch),

  saveData(values) {
    dispatch(saveStepDataPersistent('contacts', values));
  },

});

export const OnboardingInfoCorporate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingInfoCorporateComponent);
