$(document).foundation();

function startQuiz() {
    $('.container').animate({
        scrollTop: $('.quiz0').offset().top
    });
}

function nextQuestion(question) {
    $('.error', $('.quiz' + (question-1))).html('').css('display', 'none');
    
    // On vérifie que la personne a répondu à la question
    if($('input[type=radio]:checked, input[type=checkbox]:checked', $('.quiz' + (question-1))).length == 0) {
        $('.error', $('.quiz' + (question-1))).html('Merci de cocher une réponse à la question').css('display', 'block');
    }
    else {
        $('.quiz').animate({
            scrollTop: $('.quiz' + question).parent().scrollTop() + $('.quiz' + question).offset().top - $('.quiz' + question).parent().offset().top
        });
    }
}

function checkAnswer(question, el, radioIndex) {
    if(question.indexOf('radio') >= 0) {
        $('.' + question).attr('src', 'https://action.miedepain.asso.fr/enquete/img/checkbox-off.png');
    }

    var type = question.split('-');
    if(question.indexOf('checkbox') >= 0 && $(el).attr('src') == 'https://action.miedepain.asso.fr/enquete/img/checkbox-on.png') {
        $(el).attr('src', 'https://action.miedepain.asso.fr/enquete/img/checkbox-off.png');
        $(el).parents('.quiz-question').find('input[type=' + type[0] + ']').eq(radioIndex).prop('checked', false);
    }
    else {
        $(el).attr('src', 'https://action.miedepain.asso.fr/enquete/img/checkbox-on.png');
        $(el).parents('.quiz-question').find('input[type=' + type[0] + ']').eq(radioIndex).prop('checked', true);
    }
}

function endQuiz() {
    $('.qtip').each(function(){
        $(this).data('qtip').destroy();
    });
    
    // On vérifie la validité des champs
    var error = false;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if($('#nom').val() == '') {
        error = true; 
        $('#nom').qtip({
            content: 'Attention ce champ est obligatoire',
            position: {
                my: (screen.width <= 641) ? 'top center' : 'bottom center',
                at: (screen.width <= 641) ? 'bottom center' : 'top center'
            },
            show: {
                event: false,
                ready: true
            },
            hide: {
                event: false
            },
            style: { classes: 'qtip-red' }
        });
    }
    
    if($('#prenom').val() == '') {
        error = true; 
        $('#prenom').qtip({
            content: 'Attention ce champ est obligatoire',
            position: {
                my: (screen.width <= 641) ? 'top center' : 'bottom center',
                at: (screen.width <= 641) ? 'bottom center' : 'top center'
            },
            show: {
                event: false,
                ready: true
            },
            hide: {
                event: false
            },
            style: { classes: 'qtip-red' }
        });
    }
    
    if($('#email').val() == '') {
        error = true; 
        $('#email').qtip({
            content: 'Attention ce champ est obligatoire',
            position: {
                my: 'top center',
                at: 'bottom center'
            },
            show: {
                event: false,
                ready: true
            },
            hide: {
                event: false
            },
            style: { classes: 'qtip-red' }
        });
    }
    else if(!re.test($('#email').val())) {
        error = true; 
        $('#email').qtip({
            content: 'Ce champ doit être un e-mail valide',
            position: {
                my: 'top center',
                at: 'bottom center'
            },
            show: {
                event: false,
                ready: true
            },
            hide: {
                event: false
            },
            style: { classes: 'qtip-red' }
        });
    }
    
    if($("#tel").val() != '' && !$("#tel").intlTelInput("isValidNumber")) {
        error = true;
        $('#tel').qtip({
            content: 'Ce champ doit être un téléphone valide',
            position: {
                my: 'top center',
                at: 'bottom center'
            },
            show: {
                event: false,
                ready: true
            },
            hide: {
                event: false
            },
            style: { classes: 'qtip-red' }
        });
    }

    if(!error) {
        var today = new Date();
        data = {
            schema : "mdp-enquete2016",
            db : {
                "firstname" : $('#prenom').val(),
                "lastname" : $('#nom').val(),
                "email" : $('#email').val(),
                "phone" : $("#tel").intlTelInput("getNumber"),
                "q1" : $('input[type=radio]:checked', $('.quiz0')).val(),
                "q2" : $('input[type=radio]:checked', $('.quiz1')).val(),
                "q3" : $('input[type=radio]:checked', $('.quiz2')).val(),
                "q4" : $('input[type=radio]:checked', $('.quiz3')).val(),
                "q5" : $('input[type=checkbox]:checked', $('.quiz4')).map(function() {
                    return this.value;
                }).get().join('|'),
                "date": today.toString()
            }
        }
        
        function success() {
            $('.container').animate({
                scrollTop: $('.finish').offset().top + $('.container').scrollTop()
            });
        }

        function error() {
            alert('Une erreur est survenue lors de l\'enregistrement de vos réponses. Veuillez réessayer ultérieurement.');
        }

      var excluded = $('#exclude:checked').val() === "yes"
      if (excluded) {
        // GDPR exclusion list
        adfinitasIO({
                    email: $('#email').val()
        }, 'eda21ae3-54fb-49b9-a819-48b8a6f96697',
           '569fc63d-7f70-492c-9912-3e5cf125aee9',
           success,
           error
        )
      } else {
        adfinitasIO({
          db: {
            schema : "mdp-enquete2016",
            db : {
              "firstname" : $('#prenom').val(),
              "lastname" : $('#nom').val(),
              "email" : $('#email').val(),
              "phone" : $("#tel").intlTelInput("getNumber"),
              "q1" : $('input[type=radio]:checked', $('.quiz0')).val(),
              "q2" : $('input[type=radio]:checked', $('.quiz1')).val(),
              "q3" : $('input[type=radio]:checked', $('.quiz2')).val(),
              "q4" : $('input[type=radio]:checked', $('.quiz3')).val(),
              "q5" : $('input[type=checkbox]:checked', $('.quiz4')).map(function() {
                return this.value;
              }).get().join('|'),
              "date": today.toString()
            }
          },
          woopra : {
            host: "miedepain.asso.fr",
            cv_name: $('#prenom').val() + ' ' + $('#nom').val(),
            cv_email: $('#email').val(),
            cv_phone: $("#tel").intlTelInput("getNumber"),
            cv_firstname: $('#prenom').val(),
            cv_lastname: $('#nom').val(),
            event: "inscription",
            ce_optin: "oui",
            ce_url: document.location.href,
            ce_title: document.title,
            ce_origine: "enquete2016"
          }
        }, 'eda21ae3-54fb-49b9-a819-48b8a6f96697',
           'a2e55464-7fc6-4da1-84b8-045f0b09a4d2',
           success,
           error
        )
        adfinitasIO({
          woopra: {
            host: "miedepain.asso.fr",
            cv_name: $('#prenom').val() + ' ' + $('#nom').val(),
            cv_email: $('#email').val(),
            cv_phone: $("#tel").intlTelInput("getNumber"),
            cv_firstname: $('#prenom').val(),
            cv_lastname: $('#nom').val(),
            event: "enquete2016",
            ce_canal: "lp"
          }
        }, 'eda21ae3-54fb-49b9-a819-48b8a6f96697',
           'a2e55464-7fc6-4da1-84b8-045f0b09a4d2',
           null,
           null
        )
      }
    }
}

$(function(){
	// Remplacement des radios/checkboxes
    var j = 0;
    $('.quiz-question').each(function() {
        var i = 0;
        $('input[type=radio], input[type=checkbox]', $(this)).each(function() {
            var that = this;

            $(that).prop('checked', false).css('display', 'none').after($('<img src="https://action.miedepain.asso.fr/enquete/img/checkbox-off.png" class="custom-checkbox radio-' + $(that).attr('name') + ' img-' + i + ' quiz-question-' + j + '" onclick="checkAnswer(\'' + $(that).attr('type') + '-' + $(that).attr('name') + '\', \'.quiz-question-' + j + '.img-' + $(that).parent().index() + '\', ' + i + ');" />'));
            $(that).parent().find('label').attr('onclick', 'checkAnswer(\'' + $(that).attr('type') + '-' + $(that).attr('name') + '\', \'.quiz-question-' + j + '.img-' + $(that).parent().index() + '\', ' + i + ');');
            i++;
        });
        j++;
    });

    if(screen.width <= 769 || screen.height <= 750) {
        $('.finish').css('height', screen.height + 'px !important');
    }
    else {
        $('.finish').css('height', '100%');
    }

    $(window).on('resize', function() {
        if(screen.width <= 769 || screen.height <= 750) {
            $('.finish').css('height', screen.height + 'px !important');
        }
        else {
            $('.finish').css('height', '100%');
        }
    });

    // Gestion du numéro de téléphone
    $("#tel").intlTelInput({
        utilsScript: 'https://action.miedepain.asso.fr/enquete/js/utils.js',
        onlyCountries: ['fr'],
        allowDropdown: false
    });
});
