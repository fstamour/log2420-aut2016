"use strict"; // http://www.w3schools.com/js/js_strict.asp

var currentLangEn_p = false;
var villes = null;
var marker = null;
var map = null;

// Cette fonction change la langue
// newLangEn_p signifie "Est-ce que la nouvelle langue est l'anglais?"
// Donc newLangEn_p == true change la langue pour l'anglais et
// newLangEn_p == false change la langue pour le français.
// @note La fonction ne regarde pas quelle est la langue courrante,
// mais elle l'enregistre dans la varible globale "currentLangEn_p"
function changeLang(newLangEn_p) {
    currentLangEn_p = newLangEn_p;
    var elementsToShow = currentLangEn_p ? $(".en") : $(".fr");
    var elementsToHide = !currentLangEn_p ? $(".en") : $(".fr");
    elementsToHide.hide();
    elementsToShow.show();
}

// Function qui est appelé lorsque la page est chargé au complet.
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
        // Quand on appuie sur une touche.
        inputVille.on('keypress', function(e) {
            // Quand on appuie sur ENTER et que le champs n'est pas vide.
            if (e.which == 13 && $(this).val()) {
                var choix = $(this).val();
                // Si la ville est dans les choix
                if(choix in villes) {
                    document.getElementById("resultat").innerHTML = choix;
                    montrerVille(villes[choix]);
                }
                // On pourrait afficher un message quand l'utilisateur entre une ville invalide.
                // Mais l'autocomplétion de JQuery-UI empêche l'utilisateur d'entrer quelquechose
                // qui n'est pas dans les suggestions. Mais... ce n'est pas parfait, donc on gère ce
                // cas tout de même afin d'éviter une erreur dans le code.
            }
        });
    });

    // On initialise la carte
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.5078101, lng: -73.6192982}, // Environ la polymtl
        zoom: 10 // Empirique (i.e. magic number)
    });
})

// Cette fonction bouge la carte à la ville désigné et déplace le marqueur.
function montrerVille(ville) {
    //Déplace la map vers la ville choisie
    var latLng = new google.maps.LatLng(ville.lat, ville.lon);
    map.panTo(latLng);

    //Ajoute un marker sur la ville choisie
    if(marker == null) {
        marker = new google.maps.Marker({position: latLng,
                                         map: map});
    }
    marker.setPosition(latLng);
}
