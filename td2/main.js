$(function () {

    var tokenCounter = new Worker('worker.js');
    var progressBar = $("#pourcent");

    tokenCounter.onmessage = function(e) {
        // console.debug("Got message from worker: ", e.data);
        switch(e.data.action) {
        case "progress":
            progressBar.css("width", e.data.progress + "%");
            break;
        case "done":
            $("#jetons").text(e.data.result);
            break;
        }
    };

    $("#compter").click(function(e) {
        tokenCounter.postMessage({
            action: "compter",
            text: $("#text").val()
        });
    });

    $("#annuler").click(function(e) {
        tokenCounter.postMessage({action: "annuler"});
    });
});
