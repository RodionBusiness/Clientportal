import * as React from 'react';

import { ApplFAQData, ApplFAQItem, IFAQItemData } from '@appl/components/ApplFAQ';

interface IApplFAQContentState {
  collapsedState: boolean[][];
}

export class ApplFAQContent extends React.Component<{}, IApplFAQContentState> {
  private structure = ApplFAQData;

  constructor(props: {}) {
    super(props);

    this.state = {
      collapsedState: this.structure.map(section => section.items.map(() => false)),
    };
  }

  public render() {
    const { collapsedState } = this.state;

    return (
      <div>
        <p>
          For further questions about our products and services, please review our Getting Started Guide,
          Trading Procedures, and Product Specifications. For questions relating to the Client
          Portal we refer to our FAQ inside the portal. For other questions please
          email <a href='mailto:support@blocksettle.com'>support@blocksettle.com</a>.
        </p>

        <div className='faq-list'>
          {
            this.structure.map((section, i) => (
              <div key={i}>
                <h3 className='pt-3'>{section.header}</h3>
                {
                  section.items.map((item, j) => (
                    <ApplFAQItem
                      key={j}
                      item={item}
                      collapsed={collapsedState[i][j]}
                      onHeaderClick={this.onHeaderClick}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  private onHeaderClick = (item: IFAQItemData) => {
    let sectionIndex: number;
    let itemIndex: number;

    this.structure.every((section, sIndex) => {
      itemIndex = section.items.indexOf(item);

      if (itemIndex >= 0) {
        sectionIndex = sIndex;

        return false;
      }

      return true;
    });

    const collapsedState: boolean[][] = this.structure.map((section, sIndex) =>
      section.items.map((_, iIndex) => {
        if (sectionIndex === sIndex) {
          return itemIndex === iIndex ? !this.state.collapsedState[sIndex][iIndex] : false;
        }

        return false;
      }),
    );

    this.setState({
      collapsedState,
    });
  }
}
