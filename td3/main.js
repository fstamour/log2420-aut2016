"use strict"; // http://www.w3schools.com/js/js_strict.asp

var currentLangEn_p = false;
var villes = null;
var marker = null;
var map = null;

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
    $("#french").click(() => changeLang(false));
    $("#english").click(() => changeLang(true));

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
                    document.getElementById("resultat").innerHTML = choix;
                    montrerVille(villes[choix]);
                }
            }
        });
    });

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.5078101, lng: -73.6192982}, // Environ la polymtl
        zoom: 10
    });
})

function montrerVille(ville) {
	//Détermine la latitude et longitude de la ville choisie
	var latitude = ville.lat;
	var longitude = ville.lon;

	//Déplace la map vers la ville choisie
	var latLng = new google.maps.LatLng(latitude, longitude);
	map.panTo(latLng);

	//Ajoute un marker sur la ville choisie
	  if(marker == null) {
        marker = new google.maps.Marker({position: latLng,
                                         map: map});
    }
		marker.setPosition(latLng);
}
