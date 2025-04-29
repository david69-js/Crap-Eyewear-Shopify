var matchImageDesktop = document.getElementsByClassName('matchImageDesktop');
var matchImageMobile = document.getElementsByClassName('matchImageMobile');
var matchMediaWindow = window.matchMedia("(max-width: 500px)").matches;

if (matchMediaWindow) {

    $(".matchImageDesktop").remove();
    $(".matchImageMobile").show();

} else {

    $(".matchImageDesktop").show();
    $(".matchImageMobile").remove();

}
