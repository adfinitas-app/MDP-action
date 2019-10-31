$(document).ready(function () {

    $('.anchor').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
    });

    $('#plus').click(function (e) {
        e.preventDefault();
        var display = $('#text-plus').css('display');
        if (display === 'none') {
            $(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/MDP-LP-No%C3%ABl/x.png');
            $('#guillemet-toggle').css('display', 'none');
        }
        $('#text-plus').slideToggle();
        $('#text-plus2').slideToggle();
        $('#nono').slideToggle();
        $('#confidentialite').slideToggle();

        if (display !== 'none') {
            $(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/MDP-LP-No%C3%ABl/%2B.png');
            $('#guillemet-toggle').css('display', 'inline');
        }
    });

    function isMobile() {
        if ($(window).width() < 640)
            return true;
        return false;
    }

    $(window).resize(function () {
        if (!isLar && isLarge()) {
            // passage medium -> large
            isLar = true;
            restartAnimation();
        } else if (isLar && !isLarge()) {
            // passage large -> medium
            isLar = false;
            restartAnimation();
        }


        if (isMob && !isMobile()) {
            // passage mobile -> medium
            isMob = false;
            $('.stickybtn').css('position', 'fixed');
            restartAnimation();
        } else if (!isMob && isMobile()) {
            // passage medium -> mobile
            isMob = true;
            $('.stickybtn').css('position', 'absolute');
            if ($(window).scrollTop() > 100) {
                $('.stickybtn2').show();
            }
            else {
                $('.stickybtn2').hide();
            }
            restartAnimation();
        }
    });

    $(window).scroll(function () {
        if (isMob) {
            if ($(window).scrollTop() > 100) {
                $('.stickybtn2').show();
            }
            else {
                $('.stickybtn2').hide();
            }
        }
    });

    $('#logo').click(function () {
        woopra.track('interaction', {
            category: "LOGO_FA18",
            action: "clic",
            url: document.location.href,
            title: document.title
        });
    });

    $('.stickybtn, .stickybtn2').parent('a').click(function () {
        //var str = changelink();
        //$(this).attr('href', 'https://donner.miedepain.asso.fr/b?cid=49&utm_source=LP&utm_campaign=NOEL17&utm_content=DON-CTA&amount=10000' + str);
        woopra.track('interaction', {
            category: "DON-CTA_FA18",
            action: "clic",
            url: document.location.href,
            title: document.title
        });
    });

    $('#eq1').click(function () {
        //var str = changelink();
        //$(this).attr('href', 'https://donner.miedepain.asso.fr/b?cid=49&utm_source=LP&utm_campaign=NOEL17&utm_content=DON-CTA-55&amount=5500' + str);
        woopra.track('interaction', {
            category: "DON-CTA-55_FA18",
            action: "clic",
            url: document.location.href,
            title: document.title
        });
    });

    $('#eq2').click(function () {
        //var str = changelink();
        //$(this).attr('href', 'https://donner.miedepain.asso.fr/b?cid=49&utm_source=LP&utm_campaign=NOEL17&utm_content=DON-CTA-100&amount=10000' + str);
        woopra.track('interaction', {
            category: "DON-CTA-100_FA18",
            action: "clic",
            url: document.location.href,
            title: document.title
        });
    });

    $('#eq3').click(function () {
        //var str = changelink();
        //$(this).attr('href', 'https://donner.miedepain.asso.fr/b?cid=49&utm_source=LP&utm_campaign=NOEL17&utm_content=DON-CTA-165&amount=16500' + str);
        woopra.track('interaction', {
            category: "DON-CTA-165_FA18",
            action: "clic",
            url: document.location.href,
            title: document.title
        });
    });

    $('#autre').click(function () {
        //var str = changelink();
        //$(this).attr('href', 'https://donner.miedepain.asso.fr/b?cid=49&utm_source=LP&utm_campaign=NOEL17&utm_content=DON-CTA-AUTRE' + str);
        woopra.track('interaction', {
            category: "DON-CTA-AUTRE_FA18",
            action: "clic",
            url: document.location.href,
            title: document.title
        });
    });

    function changelink() {
        var str = '';

        if ('wv_email' in p) {
            str += '&wv_email=' + p['wv_email'];
        }
        if ('wv_firstname' in p) {
            str += '&wv_firstname=' + p['wv_firstname'];
        }
        if ('wv_lastname' in p) {
            str += '&wv_lastname=' + p['wv_lastname'];
        }
        return str;
    }

    function initDefault() {
        top1Default = {
            top: top1.css('top'),
            left: top1.css('left')
        };

        top1To = {
            top: parseInt(top1Default.top) - 10 + 'px',
            left: parseInt(top1Default.left) - 10 + 'px'
        };

        top2Default = {
            top: top2.css('top'),
            left: top2.css('left')
        };

        top2To = {
            top: parseInt(top2Default.top) - 10 + 'px',
            left: parseInt(top2Default.left) + 'px'
        };

        top3Default = {
            top: top3.css('top'),
            left: top3.css('left')
        };

        top3To = {
            top: parseInt(top3Default.top) - 10 + 'px',
            left: parseInt(top3Default.left) + 10 + 'px'
        };

        bot1Default = {
            top: bot1.css('top'),
            left: bot1.css('left')
        };

        bot1To = {
            top: parseInt(bot1Default.top) + 10 + 'px',
            left: parseInt(bot1Default.left) - 10 + 'px'
        };

        bot2Default = {
            top: bot2.css('top'),
            left: bot2.css('left')
        };

        bot2To = {
            top: parseInt(bot2Default.top) + 10 + 'px',
            left: parseInt(bot2Default.left) + 'px'
        };

        bot3Default = {
            top: bot3.css('top'),
            left: bot3.css('left')
        };

        bot3To = {
            top: parseInt(bot3Default.top) + 10 + 'px',
            left: parseInt(bot3Default.left) + 10 + 'px'
        };
    }

    function setDefault() {
        top1.animate(top1Default, 'fast');
        top2.animate(top2Default, 'fast');
        top3.animate(top3Default, 'fast');

        bot1.animate(bot1Default, 'fast');
        bot2.animate(bot2Default, 'fast');
        bot3.animate(bot3Default, 'fast');
    }

    function animate() {
        top1.animate(top1To, 'fast');
        top2.animate(top2To, 'fast');
        top3.animate(top3To, 'fast');

        bot1.animate(bot1To, 'fast');
        bot2.animate(bot2To, 'fast');
        bot3.animate(bot3To, 'fast');
    }

    function startAnimation() {
        var i = 0;
        intervalId = setInterval(function () {
            if (i % 2 === 0) {
                animate();
            } else {
                setDefault();
            }
            i++;
        }, 300);
    }

    function isLarge() {
        if ($(window).width() >= 1024)
            return true;
        return false;
    }

    function restartAnimation() {
        clearInterval(intervalId);
        $('.red-aide img').attr('style', 'position: absolute;');
        initDefault();
        startAnimation();
    }

    /* MAIN */

    var isMob = isMobile();

    if (isMob) {
        $('.stickybtn').css('position', 'absolute');
        if ($(window).scrollTop() > 100) {
            $('.stickybtn2').show();
        }
        else {
            $('.stickybtn2').hide();
        }
    }

    //var str = changelink();

    var isLar = isLarge();
    /* ANIMATION */
    var intervalId;

    var top1 = $('.top1');
    var top2 = $('.top2');
    var top3 = $('.top3');

    var bot1 = $('.bot1');
    var bot2 = $('.bot2');
    var bot3 = $('.bot3');

    var top1Default;
    var top2Default;
    var top3Default;

    var bot1Default;
    var bot2Default;
    var bot3Default;

    var top1To;
    var top2To;
    var top3To;

    var bot1To;
    var bot2To;
    var bot3To;

    initDefault();
    startAnimation();
    /* FIN ANIMATION */
});
