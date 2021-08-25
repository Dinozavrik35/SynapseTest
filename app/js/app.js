let $carousel = $(".slider-carousel").flickity({
    cellSelector: "div.slide",
    initialIndex: 0,
    imagesLoaded: true, 
    pageDots: false, 
    percentPosition: false, 
    cellAlign: "left", 
    contain: true, 
    groupCells: 4 
});

$carousel.on("staticClick.flickity", function(event, pointer, cellElement, cellIndex) {

    if ( !cellElement ) {
        return;
    }

    $carousel.find(".slide--active").removeClass("slide--active");
    $(cellElement).addClass("slide--active");

    $(".main-img").css({opacity: 0});
    $(".main-img").attr("src", "images/dest/slider/big-slider" + (cellIndex + 1) + ".jpg");
    $(".main-img").animate({"opacity": 1, duration: 10000});

});

function showFloors(index) {
    $("body").css({overflowY: "hidden"});
    $(".slide-desc").text((index + 1) + " этаж");
    $(".slide-num").text((index + 1) + "/" + $(".floor-slide").length);

    $(".big-floors").animate({"opacity": 1, duration: 6000});
    $(".project__floors-slider").animate({"top": "30px", duration: 6000});
    $(".big-floors").css({display: "block"});

    let $floors = $(".floors-carousel").flickity({
        cellSelector: "div.floor-slide",
        initialIndex: 0,
        imagesLoaded: true, 
        pageDots: false, 
        percentPosition: false, 
        cellAlign: "left", 
        contain: true, 
    });
    
    $floors.on("change.flickity", function(event, cellIndex) {
        $(".slide-desc").text((cellIndex + 1) + " этаж");
        $(".slide-num").text((cellIndex + 1) + "/" + $('.floor-slide').length);
    });
    setTimeout(function () {
        $floors.flickity("select", index);
    }, 200)
}

function hideFloors() {
    $("body").css({overflowY: "scroll"});
    $(".project__floors-slider").animate({"top": "-100%", duration: 4000});
    $(".big-floors").animate({"opacity": 0, duration: 6000});
    setTimeout(function () {
        $(".big-floors").css({display: "none"});
    }, 500)
}


function showHouses(index) {
    $("body").css({overflowY: "hidden"});
    $(".slide-num").text((index + 1) + "/" + $(".houses-slide").length);

    $(".big-houses").animate({"opacity": 1, duration: 6000});
    $(".houses-slider").animate({"top": "30px", duration: 6000});
    $(".big-houses").css({display: "block"});

    let $houses = $(".houses-carousel").flickity({
        cellSelector: "div.houses-slide",
        initialIndex: 0,
        imagesLoaded: true, 
        pageDots: false, 
        percentPosition: false, 
        cellAlign: "left", 
        contain: true, 
    });
    
    $houses.on("change.flickity", function(event, cellIndex) {
        $(".slide-num").text((cellIndex + 1) + "/" + $('.houses-slide').length);
    });
    setTimeout(function () {
        $houses.flickity("select", index);
    }, 200)
}

function hideHouses() {
    $("body").css({overflowY: "scroll"});
    $(".houses-slider").animate({"top": "-100%", duration: 4000});
    $(".big-houses").animate({"opacity": 0, duration: 6000});
    setTimeout(function () {
        $(".big-houses").css({display: "none"});
    }, 500)
}

$(".description__video").on("click", function() {
    $(".description__video-play").css({display: "block"});
})

$(".houses__video").on("click", function() {
    $(".houses__video-play").css({display: "block"});
})