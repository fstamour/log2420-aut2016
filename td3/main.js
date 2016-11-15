"use strict"; // http://www.w3schools.com/js/js_strict.asp

var currentLangEn_p = false;

function changeLang(newLangEn_p) {
    currentLangEn_p = newLangEn_p;
    var elementsToShow = currentLangEn_p ? $(".en") : $(".fr");
    var elementsToHide = !currentLangEn_p ? $(".en") : $(".fr");
    elementsToHide.hide();
    elementsToShow.show();
}

$(function() {

    changeLang(currentLangEn_p);




})
