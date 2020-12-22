import PubSub from 'pubsub-js';

PubSub.subscribe('goToSlide', function (message, data) {
  $('.side-menu__link').removeClass('is-active');
  $(`[data-gotoslide=${data.to}]`).addClass('is-active');
});
