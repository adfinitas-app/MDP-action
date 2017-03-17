$(document).ready(function() {
	var campaigns = [];
	campaigns[0] = 35;
	$.ajax({
		type: "GET",
		data: { 
			"user_api": "umdpapi", 
			"pwd_api": "drR3tmYQ",
			"campaigns": campaigns
		},
		url:"https://donner.miedepain.asso.fr/api/counter/get",
		success:function(data){
			fillProgressBar(data);
		},
		error: function (request, error) {
			console.log(JSON.parse(JSON.stringify(request)));
			console.log(JSON.parse(JSON.stringify(arguments)));
			console.log("error == " + error);
		}
	});
	var iframe1 = document.querySelector('#video-header');
	var player1 = new Vimeo.Player(iframe1);
	player1.on('play', function() {
	});
	player1.on('timeupdate', function(data) {
		if (parseInt(data['seconds']) > 135)
			$('#cta-video').show();
		else {
			$('#cta-video').hide();
		}
	});
	adaptVideo();
	height_pb_adjust();
});

function fillProgressBar(data) {
	console.log(data);
	var objectif_don = 20000;
	var res = data.substring(2);

	res = res.split("|");
	var amount = parseInt(res[1]) / 100;
	var percentage = (amount / objectif_don ) * 100;
	$( "#progressBar" ).attr({'value':percentage});
}

$(window).resize(function() {
	adaptVideo();
	height_pb_adjust();
});

manage_header();
$(window).scroll(function() {
	manage_header();	
});

$('#cta-video').click( function() {
	$('html').css({"overflow" : "visible", "height": "auto"});
	$('body').css({"overflow" : "visible", "height": "auto"});
	scrollTo("#slide-don");
});

function 	manage_header()
{
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $('#header').offset().top;
	var elemBottom = elemTop + $('#header').height();

	if (docViewTop > elemBottom)
		$("#header-sticky").fadeIn(350);
	else
		$("#header-sticky").hide();	
}


function 	height_pb_adjust()
{
	var 	maxheight;

	$(".price-block > div").css("height", "auto");
	maxheight = $(".price-block > div").first().height();
	$(".price-block > div").each(function()
	{
		if ($(this).height() > maxheight)
			maxheight = $(this).height();
	});
	maxheight = (maxheight + 80) + "px";
	if ($(window).width() > 640)
		$(".price-block > div").css("height", maxheight);
}

function adaptVideo() {
	var x = ($(window).innerWidth() - $('#cta-video').innerWidth()) / 2;
	var y = ($(window).innerHeight() - $('#cta-video').innerHeight()) / 2;
	$('#cta-video').css({"right" : x + 'px'});
	$('#cta-video').css({"bottom" : y + 'px'});




	x = ($(window).innerWidth() - $('#text-video').innerWidth()) / 2;
	$('#text-video').css({"right" : x + 'px'});
	$('#video-header').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() - $('#header').innerHeight() + 'px'});
	$('#container-video-header').css({height: $(window).innerHeight() - $('#header').innerHeight() + 'px'})
}

function 	scrollTo(next){
	if ($(next).length != 0)
	{
		$('html, body').stop().animate({
			scrollTop: $(next).offset().top + 1
		}, 700, 'swing');
		return false;
	}
};

$("#chevron-bg-left").click( function() {
	scrollTo('.slide-portrait');
});

$('#chevron-slide-coeur').click( function() {
	scrollTo('#don-ampleur');
});

$('#img-plus1').click( function() {
	$('#text-portrait-1-1').slideToggle( "slow", function() {
		$('#img-plus1').hide();
	});
	$('#text-portrait-1-2').slideToggle( "slow", function() {
		$('#img-moins1').show();
	});
})

$('#img-moins1, #img-moins1-small').on('click', function() {
	$('#text-portrait-1-2').slideToggle( "slow", function() {
		$('#img-moins1').hide();
	});
	$('#text-portrait-1-1').slideToggle( "slow", function() {
		$('#img-plus1').show();
	});
});

$('#img-plus2').click( function() {
	$('#img-plus2').hide();
	$('#text-portrait-2-1').slideToggle( "slow", function() {
	});
	$('#text-portrait-2-2').slideToggle( "slow", function() {
		$('#img-moins2').show();
	});
})

$('#img-moins2, #img-moins2-small').on('click', function() {
	$('#text-portrait-2-2').slideToggle( "slow", function() {
		$('#img-moins2').hide();
	});
	$('#text-portrait-2-1').slideToggle( "slow", function() {
		$('#img-plus2').show();
	});
})

$('#img-plus3').click( function() {
	$('#img-plus3').hide();
	$('#text-portrait-3-1').slideToggle( "slow", function() {
	});
	$('#text-portrait-3-2').slideToggle( "slow", function() {
		$('#img-moins2').show();
	});
})

$('#img-moins3, #img-moins3-small').on('click', function() {
	$('#text-portrait-3-2').slideToggle( "slow", function() {
		$('#img-moins2').hide();
	});
	$('#text-portrait-3-1').slideToggle( "slow", function() {
		$('#img-plus2').show();
	});
})









