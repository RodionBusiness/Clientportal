import { animateScroll } from 'react-scroll';

export function onboardingScrollTop() {
  const element = document.body.querySelector('.onboarding-panel-scroll-target');
  if (element != null) {
    animateScroll.scrollTo(-element.getBoundingClientRect().top);
  }
}
