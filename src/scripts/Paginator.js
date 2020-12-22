import PubSub from 'pubsub-js';

export default class Paginator {
  constructor(selector) {
    this.$root = document.querySelector(selector);
    this.section = this.$root.querySelectorAll('.section');
    this.scrollEvents();
    this.clickEvents();
    this.activeSlide = 1;
    this.canGo = 1;
    this.maxSlide = this.section.length;
    this.delay = 1500;
  }

  scrollEvents() {
    const self = this;
    $(window).on('wheel', function (e) {
      if (!self.canGo) {
        return;
      }

      e = e.originalEvent;
      const direction = e.deltaY > 0 ? 1 : -1;
      const newSlide = self.activeSlide + direction;
      if (newSlide > self.maxSlide || newSlide < 1) {
        return;
      }
      self.canGo = false;
      PubSub.publish('goToSlide', { from: self.activeSlide, to: newSlide });
      self.activeSlide = newSlide;
      setTimeout(function () {
        self.canGo = true;
      }, self.delay);
    });
  }

  clickEvents() {
    const self = this;
    document.querySelectorAll('.side-menu__link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault;
        if (!self.canGo) {
          return;
        }
        self.canGo = false;
        const newSlide = e.target.dataset.gotoslide;
        if (newSlide !== self.activeSlide) {
          PubSub.publish('goToSlide', { from: self.activeSlide, to: newSlide });
          self.activeSlide = newSlide;
          setTimeout(function () {
            self.canGo = true;
          }, self.delay)
        }
      });
    })
  }
}
