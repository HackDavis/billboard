$(document).ready(function() 
{
    const padDigit = digit => {
    return digit < 10 ? '0' + digit : digit;
    };

    const deadline = moment('2020-01-19T13:00:00')

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
    const logoElement = $('.svg');

    const animateLogo = () => 
    {
        $('.svg').show()
        $('.svg path').css('animation', '5s linear rainbow')
        $('div.circle').show()
        $('div.circle').css('transform', 'translate(-50%, -50%) scale(8)');
        setTimeout(() => {
            countdownElement.hide();
            $('div.circle').css('opacity', '0')
        }, 400);
        setTimeout(() => {
            $('div.circle').hide();
            $('div.circle').css('transform', 'translate(-50%, -50%) scale(0)');
            $('div.circle').css('opacity', '1');
        }, 1000);
        $('.svg path').css('stroke-dashoffset', '0vh')

        setTimeout(() => {// Wait for logo to draw

            $('.svg').css('animation', 'grow-shrink 0.3s ease-in-out')
            
            setTimeout(() => { // Wait a bit before doing anything
                $('div.circle').show()
                $('div.circle').css('transform', 'translate(-50%, -50%) scale(8)');
                setTimeout(() => {
                    countdownElement.show();
                    $('.svg').hide()
                    $('.svg path').css('stroke-dashoffset', '-75vh')
                    $('.svg').css('animation', 'none')
                    $('div.circle').css('opacity', '0')
                    $('.svg path').css('animation', 'none')
                }, 400);
                setTimeout(() => {
                    $('div.circle').hide();
                    $('div.circle').css('transform', 'translate(-50%, -50%) scale(0)');
                    $('div.circle').css('opacity', '1');
                }, 1000);

                setTimeout(() => {
                    animateLogo();
                }, logo_interval);
            }, 4000);
        }, 3000);

    }

    const logo_interval = 15000

    setTimeout(() => {
        animateLogo();
    }, logo_interval);
})
