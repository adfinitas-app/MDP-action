$('#logo').click(function () {
    woopra.track('interaction', {
        category:"LOGO_IFI18",
        action:"clic",
        url:document.location.href,
        title: document.title
    });
});

$('#don-header', '#btn-don-ifi').click(function () {
    woopra.track('interaction', {
        category:"DON-CTA_IFI18",
        action:"clic",
        url:document.location.href,
        title: document.title
    });
});



$('#btn-don').click(function () {
    if ($('.don-choice div:nth-child(1)').hasClass('active')) {
        woopra.track('interaction', {
            category:"DON-CTA-500_IFI18",
            action:"clic",
            url:document.location.href,
            title: document.title
        });
    }

    else if ($('.don-choice div:nth-child(2)').hasClass('active')) {
        woopra.track('interaction', {
            category:"DON-CTA-2000_IFI18",
            action:"clic",
            url:document.location.href,
            title: document.title
        });
    }

    else if ($('.don-choice div:nth-child(3)').hasClass('active')) {
        woopra.track('interaction', {
            category:"DON-CTA-5000_IFI18",
            action:"clic",
            url:document.location.href,
            title: document.title
        });
    }

    else if ($('#other').hasClass('active')) {
        woopra.track('interaction', {
            category:"DON-CTA-AUTRE_IFI18",
            action:"clic",
            url:document.location.href,
            title: document.title
        });
    }
});

$('#other-link').click(function () {
    woopra.track('interaction', {
        category:"DON-CTA-100_IFI18",
        action:"clic",
        url:document.location.href,
        title: document.title
    });
});

