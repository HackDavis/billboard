const padDigit = digit => {
  return digit < 10 ? '0' + digit : digit;
};

const setTime = () => {
  const timeRemaining = moment('2018-01-21T12:00:00-07:00').countdown();
  const hours = timeRemaining.days * 24 + timeRemaining.hours;
  const minutes = timeRemaining.minutes;

  $('#hours').html(padDigit(hours));
  $('#minutes').html(padDigit(minutes));
};

setTime();
const interval = setInterval(setTime, 45000);

$.fn.extend({
  animateCss: function (animationName, callback) {
    const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, () => {
      $(this).removeClass('animated ' + animationName);
      if (callback) {
        callback();
      }
    });
    return this;
  }
});

const countdownElement = $('.countdown');
const logoElement = $('.logo');
const eventElement = $('.event');

const animateLogo = () => {
  countdownElement.hide();
  logoElement.show();
  logoElement.animateCss('flipInX', () => {
    setTimeout(() => {
      logoElement.animateCss('flipOutX', () => {
        logoElement.hide();
        countdownElement.show();
      });
    }, 2500);
  });
};

logoElement.hide();
const logoAnimationInterval = setInterval(animateLogo, 15000);
