$(function () {

    var tokenCounter = new Worker('worker.js');

    // On va chercher les différents éléments grâce à JQuery
    var progressBar = $("#pourcent");
    var compter = $("#compter");
    var annuler = $("#annuler");

    function setIsProcessing(processing_p) {
        compter.prop("disabled", !!processing_p);
        annuler.prop("disabled", !processing_p);
        // TODO progressBar.class()
        if(!processing_p) {
            progressBar
                .css("width", "0%")
                .attr("aria-valuenow", 0)
                .text("0%");
        }
    }

    setIsProcessing(false);

    // Handle click sur le bouton Compter
    compter.click(function(e) {
        tokenCounter.postMessage({
            action: "compter",
            text: $("#text").val()
        });
        setIsProcessing(true);
    });

    // Handle click sur le bouton Annuler
    annuler.click(function(e) {
        tokenCounter.postMessage({action: "annuler"});
        setIsProcessing(false);
    });

    // Réception des message provenant du worker.
    tokenCounter.onmessage = function(e) {
        console.debug("Got message from worker: ", e.data);
        switch(e.data.action) {
        case "progress":
            var percent = e.data.progress;
            progressBar
                .css("width", percent + "%")
                .attr("aria-valuenow", percent)
                .text(percent + "%");
            break;
        case "done":
            $("#jetons").text(e.data.result);
            setIsProcessing(false);
            break;
        case "annuler":
            setIsProcessing(false);
            break;
        }
    };
});
