
self.importScripts("CompteurJetons.js");
var compteur = new CompteurJetons();



self.addEventListener('message', function(e) {

    // Code à implémenter
	
	//Je ne suis pas sur quoi faire ici
	
	
    console.log("Got message: ", e.data);
    postMessage(e.data);

}, false);
