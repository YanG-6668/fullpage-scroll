import PubSub from 'pubsub-js';
import { TimelineMax } from 'gsap';

PubSub.subscribe('goToSlide', function (message, data) {

  const currentSlide = $(`[data-slide=${+data.from}]`);
  const newSlide = $(`[data-slide=${+data.to}]`);

  console.log($(`[data-slide=${+data.to}]`));

  const tl = new TimelineMax();

  tl.to(currentSlide, 1, { opacity: 0 })
    .fromTo(newSlide, 1, { opacity: 0 }, { opacity: 1 }, 0);
});

