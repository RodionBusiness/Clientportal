import * as React from 'react';
import { Link } from 'react-router-dom';

import { TApplFAQStructure } from '@appl/components/ApplFAQ';

// const DEPOSIT_ACCOUNT_BIC_SWIFT = String(process.env.DEPOSIT_ACCOUNT_BIC_SWIFT);
// const DEPOSIT_ACCOUNT_IBAN = String(process.env.DEPOSIT_ACCOUNT_IBAN);

export const ApplFAQData: TApplFAQStructure = [
  {
    header: 'General',
    items: [
      {
        title: 'Client Portal Overview',
        content: (
          <div>
            <p>
              The BlockSettle Client Portal is where you can view and manage your account with us.
              The main functions performed in the Client Portal include:
            </p>

            <ul>
              <li>Viewing Trades and Open Orders</li>
              <li>Registering external bank accounts</li>
              <li>Making deposits into your Account</li>
              <li>Requesting withdrawals from your Account</li>
              <li>Viewing account history</li>
              <li>Generating Reports</li>
              <li>Apply for Dealing Participant status</li>
              <li>Contacting Support</li>
            </ul>
          </div>
        )
      },
      {
        title: 'Login',
        content: (
          <div>
            <p>
              Your BlockSettle account is protected by the Authenticator App. Make sure you choose a
              strong PIN code.
            </p>
            <p>
              Changing your PIN code in the Authenticator App will update the login to the Client
              Portal as well as the login to the BlockSettle API available through the Terminal.
            </p>
          </div>
        )
      },
      {
        title: 'Why you cannot see your bitcoin balances in Client Portal',
        content: (
          <div>
            <p>
              Our premise removes custody risks through the provision of The BlockSettle Terminal
              which provides its users with operational control over their blockchain balances. As
              we cannot access them, they are solely available for you through the Terminal.
            </p>

            <p>BlockSettle uses Google Authenticator for Two-factor Authentication.</p>
          </div>
        )
      },
      {
        title: 'Deposit Insurance',
        content: (
          <div>
            <p>
              Deposits in the banks operating in Estonia on the basis of an authorisation, including
              money on settlement accounts, are secured by the Estonian deposit guarantee scheme,
              the operation principles of which arise from the Deposit Guarantee Act.
            </p>

            <p>
              Deposits, together with the interest thereon as at the date on which the deposits
              become unavailable, are guaranteed by the Deposit Guarantee Sectoral Fund (DGSF) to
              the extent of 100 per cent but not more than in the amount of EUR 100,000 per
              depositor and per company in any one credit institution.
            </p>
          </div>
        )
      },
      {
        title: 'Fees and Commissions',
        content: (
          <div>
            <p>
              BlockSettle’s currency of account is EUR. Fees relating to Onboarding, Private Market
              trades, and Authentication Addresses will be charged to the EUR account. The EUR
              account may become negative as a result of fees and commissions, which the participant
              is obligated to honour. Negative EUR balances may result in a temporary suspension of
              service.
            </p>

            <p>
              BlockSettle has a policy of charging participants for services which are a cost to our
              company, including but not limited to, deposits, withdrawals, and authentication
              schemes.
            </p>
          </div>
        )
      },
      {
        title: 'Customer Support',
        content: (
          <div>
            <p>
              Our service is built around the recognition that the needs of our participants should
              come first. Whether it’s an inquiry with customer support, a need for technical
              assistance, or a Terminal question, we’re here to{' '}
              <Link to="/appl-support">support</Link> your needs whenever and wherever you need us.
            </p>
          </div>
        )
      }
    ]
  },
  {
    header: 'Overview',
    items: [
      {
        title: 'Cash Position Summary',
        content: (
          <div>
            <p>
              The Cash Position Summary shows the balance, on a per currency basis, held on account
              and available for trading.
            </p>

            <p>
              The EUR account can become negative as a result of fees being charged to that account
              only.
            </p>
          </div>
        )
      },
      {
        title: 'Equity Position Summary',
        content: (
          <div>
            <p>
              The Equity Position Summary shows the balance, on a per equity basis, held on account
              and available for trading.
            </p>
          </div>
        )
      },
      {
        title: 'Account Reservations',
        content: (
          <div>
            <p>
              Shows the balance which is reserved for open orders during the settlement process and
              for pending withdrawals.
            </p>
            <p>
              The reserved balance changes when orders are matched, settled, cancelled, and when a
              withdrawal request has been submitted but not yet approved.
            </p>
          </div>
        )
      },
      {
        title: 'Order Summary',
        content: (
          <div>
            <p>
              The Order Summary shows the average price of realised buys and sells for each product
              in which trades have been executed.
            </p>
          </div>
        )
      }
    ]
  },
  {
    header: 'Account Management',
    items: [
      {
        title: 'Accounts',
        content: (
          <div>
            <p>
              Shows a list of your accounts. Your bank account, your broker account, and for dealing
              participants your trading account. The broker account is used to settle all trades and
              the trading account is used to execute all trades.
            </p>
          </div>
        )
      },
      {
        title: 'Add Bank Account',
        content: (
          <div>
            <p>
              Bank accounts can be registered with the service through following the steps in the
              Add Bank Account tab.
            </p>

            <ul>
              <li>
                {' '}
                For IBAN accounts all you need to do is add the IBAN and proof of account ownership.
              </li>
              <li>
                For other accounts you need to manually add all the requested information, and
                include a proof of account ownership.
              </li>
              <li>
                Proof of ownership is a bank statement proving your control over the bank account.
              </li>
            </ul>

            <p>
              For withdrawals to be processed, BlockSettle must ensure that the bank account is in
              the name of the participant. Once a bank account is approved, it will be saved in the
              system to facilitate faster processing for subsequent withdrawal requests.
            </p>

            <p>Third party payments are prohibited.</p>
          </div>
        )
      },
      {
        title: 'Deposit',
        content: (
          <div>
            <p>
              Participants must create a deposit request before depositing money with the service.
              Creating a deposit request allows us to programmatically detect your payment and
              instantly credit your account in real-time when the bank clearing cycle is complete.
            </p>

            <p>Visit the Deposit page to make a deposit request.</p>

            <p>
              Notice! A fee of either (EUR 10, GBP 10, JPY 1000 or SEK 100) is deducted for all
              non-European Payments*
            </p>
            <p>
              <small>
                *European payment is a payment in euros in SEPA area. SEPA area is a single euro
                payments area, which includes all member states of the European Union and Norway,
                Iceland, Liechtenstein, Switzerland and Monaco. The service fee type is 'shared'.
                Indicating the correct IBAN and BIC is mandatory. Accrual of remitter's account
                takes place at the latest on the following banking day.{' '}
              </small>
            </p>

            <p>
              Deposits made from within the SEPA area should be in your account during the next bank
              clearing cycle.
            </p>

            <p>Cross border deposits may take up to 5 days before they show up on your account.</p>

            <p>
              Deposits made without the correct reference might cause delays in the process of
              crediting your account and may require you to submit deposit statements from your
              originating bank.
            </p>

            <p>
              <em>Approved:</em> deposit reference is created, and we are awaiting your payment.
            </p>

            <p>
              <em>Settled:</em> the deposit is registered on your BlockSettle account.
            </p>

            <p>
              <em>Partial:</em> the deposit will be manually verified by BlockSettle since it has
              been sent using an old reference, the amount or currency doesn’t match, or some other
              information is missing.
            </p>

            <p>Fees will be deducted after the deposit has been registered on your account.</p>

            <p>
              If you have any questions regarding a deposit you are welcome to contact our support
              by using the support function in the Client portal. Please add your email address,
              deposit ref ID, amount and currency to facilitate the process.
            </p>
          </div>
        )
      },
      {
        title: 'Withdraw',
        content: (
          <div>
            <p>
              All your current and previous withdrawal requests and their status remain presented
              here.
            </p>

            <p>Withdrawals from your account are subject to approval from BlockSettle.</p>

            <p>BlockSettle will keep you updated about the progress of your request by mail.</p>

            <p>
              Withdrawals made to an account within the SEPA area should be received by the
              beneficiary bank during the next bank clearing cycle.
            </p>

            <p>
              For cross boarder payments, the service fee is shared, that is, BlockSettle covers the
              service fees of our bank and the beneficiary those of the beneficiary´s bank. Cross
              boarder payments should be received by the beneficiary between 1 and 5 banking days
              after the payment is made.
            </p>

            <p>
              Only <em>one withdrawal</em> at the time and per day is permitted.
            </p>

            <p>
              <em>Pending:</em> the withdrawal is in process. Your requested Withdrawal amount will
              be reserved on your account.
            </p>

            <p>
              <em>Compliance:</em> Your withdrawal requests may be subject to nonspecific compliance
              checks.
            </p>

            <p>
              <em>Cancelled:</em> The Withdrawal has been cancelled.
            </p>

            <p>
              <em>Settled:</em> The Withdrawal has been settled.
            </p>

            <p>
              Notice! A fee of either (EUR 10, GBP 10, JPY 1000 or SEK 100) is deducted for all
              non-European Payments*
            </p>
            <p>
              <small>
                *European payment is a payment in euros in SEPA area. SEPA area is a single euro
                payments area, which includes all member states of the European Union and Norway,
                Iceland, Liechtenstein, Switzerland and Monaco. The service fee type is 'shared'.
                Indicating the correct IBAN and BIC is mandatory. Accrual of remitter's account
                takes place at the latest on the following banking day.{' '}
              </small>
            </p>

            <p>
              If you have any questions regarding a withdrawal you are welcome to contact our
              support staff by using the support function in the Client portal. Please add your
              email address, request date, from account, amount and currency to facilitate the
              process.
            </p>
          </div>
        )
      },
      {
        title: 'Dealing participant',
        content: (
          <div>
            <p>
              BlockSettle encourages participants to actively formulate responsive quotes in
              response to trading interest. Any BlockSettle participant can formulate responsive
              quotes in SpotFX and Private Listing products. For SpotXBT products, participants need
              to apply for dealing status as a higher level of requirement is placed on such users.
            </p>
            <p>
              Participants can apply for Dealing Participant status by selecting Account Management
              -> Dealing participant -> Apply
            </p>
          </div>
        )
      },
      {
        title: 'Entity Files',
        content: (
          <div>
            <p>
              Any report or statement generated by BlockSettle, or the Participant, will be saved to
              the participant and available through the Entity Files section.
            </p>

            <p>
              The Entity Files section allows the participant to view and download any generated
              file.
            </p>

            <p>
              This section also includes customer account statements on a daily, monthly and yearly
              basis. The daily account statement is only sent out if there has been any account
              activity. The statements provide you with basic information relating to the value of
              your portfolio, deposits, withdrawals, trades, volumes, end-of-day pricing and
              realised prices.
            </p>
          </div>
        )
      }
    ]
  },
  {
    header: 'History',
    items: [
      {
        title: 'Trades',
        content: (
          <div>
            <p>
              Displays the trade history of the account, including date, acquirer, status,
              instrument, quantity, price, and type.
            </p>
          </div>
        )
      },
      {
        title: 'Balances',
        content: (
          <div>
            <p>
              Displays the cash balances in the various currencies on account on an end-of-day
              basis, filtered for days in which no activity occurred. Reports can be generated on
              demand. Any saved file is available for viewing and downloads under the Entity Files
              section.
            </p>
          </div>
        )
      },
      {
        title: 'Transfers',
        content: (
          <div>
            <p>Shows the deposit and withdrawal history over the lifetime of the account.</p>
          </div>
        )
      }
    ]
  },
  {
    header: 'Reports',
    items: [
      {
        title: 'Commissions',
        content: (
          <div>
            <p>
              Shows specifics about how much fee that was deducted from your trade(s). If you have
              questions about any trade or fees, please submit a support ticket by using the support
              function in the Client portal and we will be happy to help. Don’t forget to specify
              which trade you are having questions about by entering trade details such as; Trade ID
              and Trade Date.
            </p>
          </div>
        )
      },
      {
        title: 'Cash Balances',
        content: (
          <div>
            <p>
              Shows all your current and previous cash balance changes due to settled trades,
              unsettled <br />
              trades, deposits and withdrawals. Notes with empty fields indicates settled
              transactions.
            </p>
            <p className="mb-2">
              <i>Notes</i> you might find the following descriptions:
            </p>

            <ul>
              <li>
                <em>XBT Reserve</em>: an amount is reserved when you have a match awaiting the final
                settlement.
              </li>

              <li>
                <em>XBT Reserve Unwind</em>: the trade was not settled by the counterpart and the
                amount is sent back to you.
              </li>

              <li>
                <em>XBT Reserve CC Fee</em>: the fee that is reserved in EUR when trading between
                XBT and BLK.
              </li>

              <li>
                <em>New Auth Address Fee</em>: fee for new Authentication Address verification.
              </li>
            </ul>
          </div>
        )
      }
    ]
  }
];
