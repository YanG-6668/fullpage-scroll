export default class FullPageScroll {
  constructor(selector, options) {
    this.root = document.querySelector(selector);
    this.sections = this.root.querySelectorAll('.section');
    this.navigation;
    //
    this.dots = options.dots;
    this.duration = options.duration || 500;
    this.timingFunction = options.timingFunction || 'linear';
    this.onLeave = options.onLeave;
    this.afterLoad = options.afterLoad;
    //
    this.activeSlide = 0;
    this.animated = false;
    this.maxSlide = this.sections.length;
    this.startTouchEvent;
    this.endTouchEvent;

    this.setup();
  }

  createNavigation() {
    this.navigation = document.createElement('nav');
    this.navigation.id = this.navigation.classList = 'navigation';
    const navigationList = document.createElement('ul');
    navigationList.classList = 'navigation__list';
    this.navigation.appendChild(navigationList);
    let navigationItem = '';
    this.sections.forEach((item, i) => {
      navigationItem +=
        `<li class="navigation__item">
        <a data-navigation=${i} href="#" class="navigation__link"></a>
      </li>`
    });
    navigationList.innerHTML = navigationItem;
    navigationList.querySelectorAll('.navigation__link')[0].classList.add('is-active');
  }

  activeNavigationItem(index) {
    const navigationLinks = document.querySelectorAll('.navigation__link');

    navigationLinks[index].classList.add('is-active');
    navigationLinks.forEach((item, i) => {
      if (index !== i) {
        navigationLinks[i].classList.remove('is-active');
      }
    });
  }

  actionToSlide() {
    this.animated = true;
    this.sections.forEach(section => {
      section.style.transform = `translateY(${-this.activeSlide * 100}%)`;
      section.style.transition = `transform ${this.duration}ms ${this.timingFunction}`;
    });
  }

  slideUp() {
    if (this.activeSlide !== 0 && !this.animated) {
      this.activeSlide--;
      this.actionToSlide();
      this.timeoutBetweenSlides();
      this.activeNavigationItem(this.activeSlide);
      this.onLeave()
    }
  }

  slideDown() {
    if ((this.activeSlide + 1) < this.maxSlide && !this.animated) {
      this.activeSlide++;
      this.actionToSlide();
      this.timeoutBetweenSlides();
      this.activeNavigationItem(this.activeSlide);
      this.onLeave()
    }
  }

  toSlide(e) {
    if (this.activeSlide !== e && !this.animated) {
      this.activeSlide = e;
      this.actionToSlide();
      this.timeoutBetweenSlides();
      this.activeNavigationItem(this.activeSlide);
      this.onLeave()
    }
  }

  timeoutBetweenSlides() {
    setTimeout(() => {
      this.animated = false;
    }, this.duration);
  }

  setup() {
    this.afterLoad();
    this.createNavigation();


    if (this.dots) {
      this.root.appendChild(this.navigation);
    }

    //events---------------------->>>
    document.querySelectorAll('.section__anchors').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = Number(e.target.dataset.toslide);
        this.toSlide(target);
      });
    });

    document.querySelectorAll('.navigation__link').forEach(link => {
      link.addEventListener('click', e => {
        const target = Number(e.target.dataset.navigation);
        this.toSlide(target);
      });
    });

    this.root.addEventListener('touchstart', e => {
      this.startTouchEvent = e.changedTouches[0].pageY;
    });

    this.root.addEventListener('touchend', e => {
      this.endTouchEvent = e.changedTouches[0].pageY;
      this.startTouchEvent > this.endTouchEvent ? this.slideDown() :
      this.startTouchEvent < this.endTouchEvent ? this.slideUp() :
      false;
    });

    this.root.addEventListener('wheel', e => {
      e.deltaY > 0 ? this.slideDown() : this.slideUp();
    });
  }
}
