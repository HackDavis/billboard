const padDigit = digit => {
  return digit < 10 ? '0' + digit : digit;
};

const deadline = moment('2019-02-10T12:00:00-08:00')

var interval = null;

const calculateTime = () => {
  const now = moment.now();
  const timeDiff = deadline.diff(now);
  if (timeDiff < 0) {
    return {
      hours: 0,
      minutes: 0,
      deadlinePassed: true
    }
  }

  const timeRemaining = deadline.countdown();
  const hours = timeRemaining.days * 24 + timeRemaining.hours;
  const minutes = timeRemaining.minutes;
  return {
    hours,
    minutes,
    deadlinePassed: false
  }
}

const setTime = () => {
  time = calculateTime();
  $('#hours').html(padDigit(time.hours));
  $('#minutes').html(padDigit(time.minutes));

  if (time.deadlinePassed) {
    clearInterval(interval);
  }
};

setTime();
interval = setInterval(setTime, 5000);

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
  logoElement.animateCss('flip', () => {
    setTimeout(() => {
      logoElement.animateCss('flipOutY', () => {
        logoElement.hide();
        countdownElement.show();
      });
    }, 2500);
  });
};

logoElement.hide();
const logoAnimationInterval = setInterval(animateLogo, 15000);
