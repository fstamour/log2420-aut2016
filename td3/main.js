"use strict"; // http://www.w3schools.com/js/js_strict.asp

var currentLangEn_p = false;
var villes = null;

function changeLang(newLangEn_p) {
    currentLangEn_p = newLangEn_p;
    var elementsToShow = currentLangEn_p ? $(".en") : $(".fr");
    var elementsToHide = !currentLangEn_p ? $(".en") : $(".fr");
    elementsToHide.hide();
    elementsToShow.show();
}




$(function() {

    // Show/Hide the elements based on the current language.
    changeLang(currentLangEn_p);
    // Setup the events for the Français/English buttons.
    $("#french").onclick = () => changeLang(false);
    $("#english").onclick = () => changeLang(true);

    // Go fetch the list of cities.
    $.getJSON("villes.json", function (data) {
        // Save it in a global variable.
        villes = data;
        // Setup the autocompletion.
        $("#ville").autocomplete({source: Object.keys(villes)});
    });

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.5078101, lng: -73.6192982},
        zoom: 10
    });
})


function montrerVille() {
    var ville = document.getElementById("ville").value;
    document.getElementById("resultat").innerHTML = ville;
}