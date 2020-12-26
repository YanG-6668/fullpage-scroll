import FullPageScroll from './FullPageScroll';
import { TimelineMax } from 'gsap';

const fps = new FullPageScroll('#pagescroll', {
  dots: true,  // default false 
  duration: 1000, // default 500
  timingFunction: 'ease', //default linear
  onLeave: () => {
    const tl = new TimelineMax();

    tl.fromTo(document.querySelectorAll('.section__title'), { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, 1);
  },
  afterLoad: () => {
    const tl = new TimelineMax();

    tl.fromTo(document.querySelectorAll('.section__title'), { y: -100, opacity: 0 }, { y: 0, opacity: 1 });
  }
});
