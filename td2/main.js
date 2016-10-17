$(function() {

    var tokenCounter = new Worker('worker.js');
    tokenCounter.onmessage = function(e) {
        console.log("Got message from worker: ", e.data);
    };
    tokenCounter.postMessage({action: "annuler"});
    tokenCounter.postMessage({action: "compter",
                              texte: "asdfasdfa"});

});
