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
        var inputVille = $("#ville");
        inputVille.autocomplete({source: Object.keys(villes),
                                  autoFocus: true});
        inputVille.on('keypress', function(e) {
            // Quand on appuie sur ENTER et que le champs n'est pas vide.
            if (e.which == 13 && $(this).val()) {
                var choix = $(this).val();
                if(choix in villes) {
                    montrerVille(villes[choix]);
                }
            }
        });
    });

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.5078101, lng: -73.6192982}, // Environ la polymtl
        zoom: 10
    });
})

function montrerVille(ville) {
    // TODO Use ville.lat, ville.lon
}
