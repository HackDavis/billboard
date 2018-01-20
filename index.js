const padDigit = digit => {
  return digit < 10 ? '0' + digit : digit;
};

const setTime = () => {
  const timeRemaining = moment('2018-01-21T12:00:00-07:00').countdown();
  console.log(timeRemaining);
  const hours = timeRemaining.days * 24 + timeRemaining.hours;
  const minutes = timeRemaining.minutes;

  document.getElementById('hours').innerHTML = padDigit(hours);
  document.getElementById('minutes').innerHTML = padDigit(minutes);
};

setTime();
const interval = setInterval(setTime, 45000);

