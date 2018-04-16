$(document).foundation();

var check = false;
var stringQuery = "";

var imgToPreload = [
    "https://s3.amazonaws.com/heroku-adfinitas-campaign/MDP-action/passerelles-davenir/2018/dot-full.png"
];
$(document).click( function() {
    if (!check) {
        $('#dispositif .box').each(function() {
            if ($(this).find('.to-show').css('display') !== 'none') {
                $(this).removeClass("shadow");
                $(this).find('.to-show').hide();
                $(this).find('.close').hide();
            }
        });
    }
    if (check) {
        check = false;
    }
});

$('.link-woopra').each(function() {
    if ("email" in p) {
        stringQuery += "&email=" + p["email"];
    }
    if ("firstname" in p) {
        stringQuery += "&firstname=" + p["firstname"];
    }
    if ("lastname" in p) {
        stringQuery += "&lastname=" + p["lastname"];
    }

    $(this).attr('href', $(this).attr('href') + stringQuery);
});


preload(imgToPreload);

$(document).ready( function() {

    $('.arrow.down').click( function() {
        $('.arrow.down').each(function() {
            $(this).css('visibility','visible');
            $(this).next('.hidden').slideUp( "slow", function() {
            });
        });


        $(this).css('visibility','hidden');
        $(this).next('.hidden').slideDown( "slow", function() {
        });
    });
    $('.down.un').click( function() {
        $('.hidden.un').slideDown( "slow", function() {
        }).prev('.arrow.down').css('visibility','hidden');
    });
    $('.down.deux').click( function() {
        $('.hidden.deux').slideDown( "slow", function() {
        }).prev('.arrow.down').css('visibility','hidden');
    });
    $('.down.trois').click( function() {
        $('.hidden.trois').slideDown( "slow", function() {
        }).prev('.arrow.down').css('visibility','hidden');
    });
    $('.down.quatre').click( function() {
        $('.hidden.quatre').slideDown( "slow", function() {
        }).prev('.arrow.down').css('visibility','hidden');
    });
    $('.arrow.up').click( function() {
        $(this).parent().slideUp( "slow", function() {
            $(this).prev().css('visibility','visible');
        });
    });
    $('#bt-scroll-header').click( function() {
        scrollTo($('#video1'));
    });


    $('#dispositif .box').click( function() {
        check = true;

        if ($(this).find('.to-show').css('display') === 'none') {
            $('#dispositif .box').each( function() {
                $(this).removeClass("shadow");
                $(this).find('.to-show').hide();
                $(this).find('.close').hide();
            });
            $(this).addClass("shadow");
            $(this).find('.to-show').show();
            $(this).find('.close').show();
        }
        else {
            $(this).removeClass("shadow");
            $(this).find('.to-show').hide();
            $(this).find('.close').hide();
        }

    });

    $('.don-choice div').click( function() {
        $('.normal-don').show();
        $('.don-other').hide();

        var index = $(this).index();


        $('.don-choice div').each( function() {
            $(this).removeClass('active');
        });

        $(this).addClass('active');

        $('.don-display').find('.amount').text(amount[index] / 4);
        $('.don-display').find('.text').html(textDon[index]);
        $('.don-display').find('.illu').attr('src', imgDon[index]);
        $('.don-display').next().attr('href', linkDon[index]);

    });



    $('#other').click( function() {
        $('.don-other').show();
        $('.normal-don').hide();
        $('.don-display').next().attr('href', "https://donner.miedepain.asso.fr/b?cid=55" + stringQuery + "&amount=" + $('.don-other').find('input').val() + "00");
    });

    $('.don-other input').on("change keyup paste", function(){
        var val = $(this).val();

        if (val > 0) {
            $('#other_amount').text(val / 4);
            $('.don-display').next().attr('href', "https://donner.miedepain.asso.fr/b?cid=55" + stringQuery + "&amount=" + $('.don-other').find('input').val() + "00");
        }

    });

});
$(window).resize( function() {

});

$('#video1, #video2').click(function() {
    $(this).find('iframe').show();
    $(this).find('iframe')[0].src += "&autoplay=1";
    $(this).find('.video .container-text p').hide();
    $(this).css('background-image','none');
});
$('#video2').click(function() {
    $('#ifi').css('margin-top','-7px');
});

function    scrollTo(next){
    if ($(next).length != 0)
    {
        $('html, body').stop().animate({
            scrollTop: $(next).offset().top + 1
        }, 700, 'swing');
        return false;
    }
}

function preload(images) {
    var images_new = [];

    for (var i = 0; i < arguments.length; i++) {
        images_new[i] = new Image();
        images_new[i].src = images[i];
    }
}