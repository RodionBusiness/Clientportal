import * as React from 'react';

export const RegistrationInfoBlock = () => (
  <div>
    <h3 className='mb-4'>Onboarding Process</h3>
    <p>
      BlockSettle offers a tiered onboarding structure to accommodate
      the need of our users. The structure is as follows:
    </p>

    <h4 className='pt-4'>Market Data Participant</h4>
    <p>
      Once you are registered as a Market Data Participant you
      will be able to access our market data through the BlockSettle Terminal.
    </p>

    <h4 className='pt-4'>Market Participant</h4>
    <p>
      Upon becoming a Market Data Participant, you will be able to login to
      the Client Portal and undergo a due diligence review. Market Participants
      can submit RFQs and respond to trading interest in most products.
    </p>

    <h4 className='pt-4'>Dealing Participant</h4>
    <p>
      Market Participants who fulfil the Dealing Participant requirements
      can apply for Dealing Participant status though the Client Portal.
      Dealing Participants are free to respond to XBT trading interest.
    </p>
  </div>
);
