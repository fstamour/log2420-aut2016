$(function () {

    var tokenCounter = new Worker('worker.js');
    var progressBar = $("#pourcent");

    tokenCounter.onmessage = function(e) {
        pourcent.style.width = e.data;
        console.log("Got message from worker: ", e.data);
    };


    //tokenCounter.postMessage({action: "annuler"});
    //tokenCounter.postMessage({action: "compter"});

    $("#compter").click(function(e) {
        console.log("Compter pressed");
    });

    $("#annuler").click(function(e) {
        console.log("Annuler pressed");
        //tokenCounter.terminate();
    });
});
