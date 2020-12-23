export default class FullPageScroll {
  constructor(selector, options) {
    this.root = document.querySelector(selector);
    this.sections = this.root.querySelectorAll('.section');
    this.options = options;
    this.activeSlide = 0;
    this.clickTarget;
    this.setup();
    this.animated = false;
    this.navigationLinks = document.querySelectorAll('.navigation__link');
    this.maxSlide = this.sections.length;
  }

  createNavigation() {
    const navigation = document.createElement('nav');
    navigation.id = navigation.classList = 'navigation';
    const navigationList = document.createElement('ul');
    navigationList.classList = 'navigation__list';
    navigation.appendChild(navigationList);
    let navigationItem = '';
    this.sections.forEach((item, i) => {
      navigationItem += `<li class="navigation__item"><a data-navigation=${i + 1} href="#" class="navigation__link"></a></li>`
    });
    navigationList.innerHTML = navigationItem;
    navigationList.querySelectorAll('.navigation__link')[0].classList.add('is-active');

    if (this.options.dots) {
      this.root.appendChild(navigation);
    } else {
      return;
    }
  }

  activeNavigationItem(index) {
    if(this.options.dots) {
      this.navigationLinks[index].classList.add('is-active');
      this.navigationLinks.forEach((item, i) => {
        if (index !== i) {
          this.navigationLinks[i].classList.remove('is-active');
        }
      });
    } else {
      return;
    }
  }

  clickScroll() {
    document.querySelectorAll('.navigation__link').forEach(link => {
      link.addEventListener('click', e => {
        const el = e.target.dataset.navigation;
        if ((this.activeSlide + 1) !== el) {
          this.animated = true;
          this.activeSlide = el - 1;
          this.sections.forEach(section => {
            section.style.transform = `translateY(${-(el - 1) * 100}%)`;
            section.style.transition = `transform ${(this.options.duration / 1000) || 0.5}s ${this.options.timingFunction ? this.options.timingFunction : 'linear'}`;
          });
          setTimeout(() => {
            this.animated = false;
          }, this.options.duration || '0.5s');
          this.activeNavigationItem(this.activeSlide);
        }
      });
    });
  }

  slideUp() {
    if (this.activeSlide !== 0 && this.animated === false) {
      this.animated = true;
      this.activeSlide--;
      this.sections.forEach(section => {
        section.style.transform = `translateY(${-this.activeSlide * 100}%)`;
        section.style.transition = `transform ${(this.options.duration / 1000) || 0.5}s ${this.options.timingFunction ? this.options.timingFunction : 'linear'}`;
      });
      setTimeout(() => {
        this.animated = false;
      }, this.options.duration || '0.5s');
      this.activeNavigationItem(this.activeSlide);
    }
  }

  slideDown() {
    if ((this.activeSlide + 1) < this.maxSlide && this.animated === false) {
      this.animated = true;
      this.activeSlide++;
      this.sections.forEach(section => {
        section.style.transform = `translateY(${-this.activeSlide * 100}%)`;
        section.style.transition = `transform ${(this.options.duration / 1000) || 0.5}s ${this.options.timingFunction ? this.options.timingFunction : 'linear'}`;
      });
      setTimeout(() => {
        this.animated = false;
      }, this.options.duration || '0.5s');
      this.activeNavigationItem(this.activeSlide);
    }
  }

  setup() {
    this.createNavigation();
    this.clickTarget = this.clickScroll();
    this.root.addEventListener("wheel", e => {
      if (e.deltaY > 0) {
        this.slideDown();
      } else {
        this.slideUp();
      }
    });
  }
}
