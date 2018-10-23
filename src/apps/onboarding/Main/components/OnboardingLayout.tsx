import * as React from 'react';

import {
  SmallLayoutContainer,
  SmallLayoutContainerInfoToggle,
} from '@common/components/SmallLayoutContainer';
import { OnboardingInfo } from '@onboarding/Main/components';

interface IPropsMap {
  title: string;
  className?: string;
}

export const OnboardingLayout: React.StatelessComponent<IPropsMap> = (
  { title, className, children },
) => {
  const titleGetter = (isToggled: boolean): string => (
    isToggled ? 'Know Your Customer Process Information' : title
  );
  const getChildren = (typeof children !== 'function') ? () => children : children;
  return (
    <SmallLayoutContainer className={className}>
      <SmallLayoutContainerInfoToggle title={titleGetter}>
        {isToggled => (isToggled ? (<OnboardingInfo />) : getChildren())}
      </SmallLayoutContainerInfoToggle>
    </SmallLayoutContainer>
  );
};
