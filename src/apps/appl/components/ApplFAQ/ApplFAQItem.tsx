import * as React from 'react';
import { Collapse } from 'reactstrap';

import { IFAQItemData } from '@appl/components/ApplFAQ/types';

interface IApplFAQItemProps {
  item: IFAQItemData;
  collapsed: boolean;
  onHeaderClick(item: IFAQItemData): void;
}

export class ApplFAQItem extends React.Component<IApplFAQItemProps> {
  public render() {
    const { item, collapsed } = this.props;

    return (
      <div className={`faq-list__item ${collapsed ? 'faq-list__item--active' : ''}`}>
        <h4 className='faq-list__item__header' onClick={this.onHeaderClick}>
          {item.title}
        </h4>

        <Collapse isOpen={collapsed}>
          <div className='faq-list__item__content'>
            {item.content}
          </div>
        </Collapse>
      </div>
    );
  }

  private onHeaderClick = () => {
    this.props.onHeaderClick(this.props.item);
  }
}
