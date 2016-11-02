
self.importScripts("CompteurJetons.js");
var compteur = new CompteurJetons();
var progressor = null;


/**
 * Ceci permet d'appeler en boucle la fonction "fn" sans bloquer le worker.
 * Une simple boucle while aurait empêcher les messages d'être "handler" pour la
 * durée de cette boucle.
 *
 * La fonction est appelé tant qu'elle retourne vrai.
 **/
function loop(fn) {
    if(fn()) {
        // On rappel la fonction loop, avec l'argument original, aussitôt qu'on peut.
        setTimeout(loop, 0, fn);
    }
}

/**
 * Petite fonction qui est fait pour être utilisé avec la fonction "loop" ci-dessus.
 *
 * Appel le générateur "progressor" et envoie le résultat au thread d'UI.
 *
 * Retourne vrai tant que le générateur est "appelable".
 **/
function step() {
    if(progressor) {
        var progress = progressor.next().value;
        if(progress) {
            postMessage({action: "progress",
                         progress: progress});
            return true;
        } else {
            // Le générateur à retourné "undefined".
            // Le processus est donc terminé et on envoie le résultat.
            postMessage({action: "done",
                         result: compteur.getJetons()});
        }
    }
    return false;
}

self.addEventListener('message', function(e) {

    console.debug("[worker] Got message: ", e.data);
    switch(e.data.action) {
    case "compter":
        if(progressor == null) {
            postMessage("Starting the counter...");
            // Initialise le générateur.
            progressor = compteur.compterJetons(e.data.text);
            // On démarre la boucle.
            loop(step);
        } else {
            console.warn("Tried to start the counting while already started.");
        }
        break;
    case "annuler":
        postMessage("Stopping the counter...");
        progressor = null;
        break;
    }

}, false);


