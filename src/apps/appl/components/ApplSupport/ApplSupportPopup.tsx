import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { ApplModalBody, ApplModalFooter, ApplPopup, IApplPopupAPI } from '@appl/components/Appl/ApplPopup';
import {
  ISupportCollectionItemModel,
  ISupportCollectionItemUpdateModel,
  supportServiceUpdate,
} from '@appl/components/ApplSupport';
import { IApplState, IUserState } from '@appl/core/types';
import { BSFormGroup, BSInput, BSNativeForm, DropzoneContainer } from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';

interface IPropsMap {
  onSubmit(): void;
  apiRef?(popupApi: IApplPopupAPI): void;
}

interface IStateMap {
  isSubmitting: boolean;
}

interface IStoreMap {
  user: IUserState;
}

class ApplSupportPopupComponent
extends React.Component<IPropsMap & IStoreMap & IDispatchNotifyActionsProps, IStateMap> {

  public state: IStateMap = {
    isSubmitting: false,
  };

  private popupApi?: IApplPopupAPI;

  public render() {
    return (
      <ApplPopup
        apiRef={this.getPopupApi}
        title='Support Message Detail'
      >
        {(popupApi, data: ISupportCollectionItemModel) => [
          <ApplModalBody key='body'>
            {data && (
              <div>
                <div className='row'>
                  <div className='col-sm-2'><span>Ref No:</span></div>
                  <div className='col-sm-10'>
                    {data.id}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-2'><span>Subject:</span></div>
                  <div className='col-sm-10'>
                    {data.subject}
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-2'><span>Status:</span></div>
                  <div className='col-sm-10'>
                    {data.status}
                  </div>
                </div>
                <hr className='mb-0'/>
                <div className='row'>
                  <div className='col-sm-12 mb-1 mt-2'>
                    <h4 className='pt-3'>Issue</h4>
                    <span>{data.issue}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-12 mb-1 mt-2'>
                    <h4 className='pt-3'>Response</h4>
                    {data.isNeededUserResponse
                      ? (
                        <BSNativeForm defaults={{ id: data.id } as any} onSubmit={this.onSubmit}>
                          {formApi => (
                            <div>
                              <BSFormGroup formApi={formApi} field='message'>
                                <BSInput
                                  className='helper__min-height--100'
                                  type='textarea'
                                  formLabel='Details'
                                  field='message'
                                  formApi={formApi}
                                />
                              </BSFormGroup>
                              <BSFormGroup formApi={formApi} field='document'>
                                <DropzoneContainer
                                  filename='unmatched_deposit_proof'
                                  formLabel='Document upload'
                                  formApi={formApi}
                                  field='document'
                                  notifyError={this.notifyUploadError}
                                />
                              </BSFormGroup>
                              <BSFormGroup>
                                <Button
                                  block={true}
                                  color='primary'
                                  type='submit'
                                  disabled={!formApi.valid()}
                                >
                                  Send
                                </Button>
                              </BSFormGroup>
                            </div>
                          )}
                        </BSNativeForm>
                      )
                      : (
                        (data.response && data.response !== '')
                          // tslint:disable-next-line:react-no-dangerous-html
                          ? <div dangerouslySetInnerHTML={{ __html: data.response }} />
                          : <span>No Response</span>
                      )}
                  </div>
                </div>
                <div className='mt-2'>
                  <h4 className='pt-3'>Attached files</h4>
                  {!data.files.length ? '—' : data.files.map((file, index) => (
                    <span key={index}>
                      {!!index && (<span> | </span>)}
                      <a href={file} target='_blank' rel='noopener noreferrer'>
                        File {index + 1}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </ApplModalBody>,
          <ApplModalFooter key='footer'>
            <Button onClick={popupApi.toggle}>
              Close
            </Button>
          </ApplModalFooter>,
        ]}
      </ApplPopup>
    );
  }

  private getPopupApi = (popupApi: IApplPopupAPI) => {
    const { apiRef = () => undefined } = this.props;
    this.popupApi = popupApi;
    apiRef(popupApi);
  }

  private notifyUploadError = (errorMessage: string) => {
    this.props.notifyError(errorMessage);
  }

  private onSubmit = async (data: ISupportCollectionItemUpdateModel) => {
    this.setState({ isSubmitting: true });
    try {
      await supportServiceUpdate(data);
      this.props.onSubmit();
      if (this.popupApi) {
        this.popupApi.toggle();
      }
    } catch (error) {
      this.props.notifyError(error.message || String(error));
    }
    this.setState({ isSubmitting: false });
  }

}

export const ApplSupportPopup = connect(
  ({ user }: IApplState): IStoreMap => ({ user }),
  mapDispatchNotifyActions,
)(ApplSupportPopupComponent);
