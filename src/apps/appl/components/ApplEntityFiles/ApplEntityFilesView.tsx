import * as React from 'react';

import '@common/styles/components/entity-files-view.sass';

interface IApplEntityFilesViewProps {
  file: string | null;
}

interface IApplEntityFilesViewState {
  file: string | null;
}

const CLEARING_DOCUMENTS_BASE_URL = String(process.env.CLEARING_DOCUMENTS_BASE_URL || '/upload/');

export class ApplEntityFilesView extends React.Component<IApplEntityFilesViewProps, IApplEntityFilesViewState> {
  private DISPLAYABLE_FILES = ['html', 'json', 'txt', 'pdf'];

  constructor(props: IApplEntityFilesViewProps) {
    super(props);

    this.state = {
      file: props.file,
    };
  }

  public static buildFileUrl = (url: string) =>
    `${CLEARING_DOCUMENTS_BASE_URL}${(url || '')}`

  public async componentWillReceiveProps(nextProps: IApplEntityFilesViewProps) {
    this.setState({ file: nextProps.file });
  }

  public render() {
    const { file } = this.state;
    const fileUrl = file ? ApplEntityFilesView.buildFileUrl(file) : '';
    const fileExtension = file ? file.split('.').pop() : undefined;
    const couldBeShown = fileExtension && (this.DISPLAYABLE_FILES.indexOf(fileExtension) !== -1);

    return (
      <div className='entity-files-view'>
        {file && couldBeShown ? (
            fileExtension === 'pdf' ?
              <embed src={fileUrl} type='application/pdf'/>
              :
              <iframe frameBorder={0} sandbox={'allow-same-origin allow-scripts'} src={fileUrl} />
          ) : (
            <p className='text-center pt-4 mb-4'>
              Previewing a file of this type is not supported, try the download button
            </p>
          )}
      </div>
    );
  }
}
