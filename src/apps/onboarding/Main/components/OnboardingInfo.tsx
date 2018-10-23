import * as React from 'react';

export const OnboardingInfo: React.StatelessComponent = () => (
  <section>
    <h3 className='title mb-4'>
      Know Your Customer (KYC) and Anti Money Laundering (AML)
    </h3>
    <div className='mb-4'>
      <p>
        At BlockSettle we take our compliance obligations seriously.
        All Participants are considered Higher-Risk Customers and are
        required to undergo an enhanced due diligence process and be subject
        to continuous monitoring/analytics in relation to Anti Money Laundering
        and Terrorist Financing. Our processes are risk-based and include:
      </p>
      <ul>
        <li>Identity Verification</li>
        <li>Sanctions, PEPs, and Enforcement Data</li>
        <li>Account and Payment Screening</li>
      </ul>
    </div>
    <p className='mb-4'>
      BlockSettle AB is a licensed payment service provider in Sweden
      and under supervision of Sweden’s regulator Finansinspektionen since September 2016.
    </p>
    <p className='mb-4'>
      BlockSettle is committed to upholding the highest of standards with
      regards to knowing our customers, anti-money laundering and compliance.
    </p>
  </section>
);
