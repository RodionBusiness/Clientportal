interface IOnfidoError {
  /* tslint:disable:no-reserved-keywords */
  type: string;
  message: string;
  fields: Record<string, string[]>;
}

const validationMessagesMap = {
  INVALID_CAPTURE: [
    'No document detected',
    'Make sure all the document is in the photo',
  ],
  INVALID_TYPE: [
    'File not uploading',
    'Try using another file type',
  ],
  UNSUPPORTED_FILE: [
    'Unsupported file type',
    'Try using a .jpg or .png file',
  ],
  NO_FACE_ERROR: [
    'No face found',
    'Your face is needed in the selfie',
  ],
  MULTIPLE_FACES_ERROR: [
    'Multiple faces found',
    'Only your face can be in the selfie',
  ],
  SERVER_ERROR: [
    'Connection lost',
    'Please try again',
  ],
  GENERIC_CLIENT_ERROR: [
    'Something\'s gone wrong',
    'You\’ll need to restart your verification on your computer',
  ],
  GLARE_DETECTED: [
    'Glare detected',
    'All details should be clear and readable',
  ],
};

const makeValidationMessage = (errorKey: keyof typeof validationMessagesMap) => {
  return validationMessagesMap[errorKey].join('. ');
};

export const onboardingOnfidoMapper = {

  mapValidationFromRequest(request: XMLHttpRequest): string {
    if (request.status !== 422) {
      return makeValidationMessage('SERVER_ERROR');
    }

    const error: IOnfidoError = JSON.parse(request.response).error;

    if (error.type !== 'validation_error') {
      throw request;
    }

    return Object
      .keys(error.fields)
      .map((key) => {
        if (key === 'document_detection') {
          return 'INVALID_CAPTURE';
        }
        if (key === 'detect_glare') {
          return 'GLARE_DETECTED';
        }
        if (key === 'file') {
          return 'INVALID_TYPE';
        }
        if (key === 'attachment' || key === 'attachment_content_type') {
          return 'UNSUPPORTED_FILE';
        }
        if (key === 'face_detection') {
          return (error.fields[key][0].indexOf('Multiple faces') === -1)
            ? 'NO_FACE_ERROR'
            : 'MULTIPLE_FACES_ERROR';
        }

        return 'GENERIC_CLIENT_ERROR';
      })
      .map(makeValidationMessage)
      .join('. ');
  },

};
