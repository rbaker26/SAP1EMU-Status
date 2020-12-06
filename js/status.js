var IsGood = true;
var IsMedium = false;
var IsBad = false;

$(document).ready(async function() {
    $("#status-good").hide();
    $("#status-medium").hide();
    $("#status-bad").hide();

    await sleep(700);
    Sap1EmuStatus();
    //StatusStatus();
    GitHubStatus();

    setTimeout(UpdateStatusSummary, 2200);
});

function Sap1EmuStatus() {
    $.ajax({
        // url: "https://sap1emu.net/status",
        url : "https://sap1emu.net",
        success: function (data) {
            $("#sap1emuPage").text("All Systems Operational");
        },
        error: function (request, status, error) {
            IsBad = true;
            $("#sap1emuPage").text("Site Unreachable");

            console.log(request);
            console.log(status);
            console.log(error);
        },
        complete: function(data) {
            $("#sap1emuPage-spinner").hide();
        },
        timeout: 2000
    });
}

function StatusStatus() {
    $.ajax({
        url: "https://status.sap1emu.net",
        success: function (data) {
            var response = data;
            
            if(response.status == "Operational") {
                $("#statusPage").text(response.status);
            }
        },
        error: function (request, status, error) {
            IsBad = true;
            $("#statusPage").text("Site Unreachable");

            console.log(request);
            console.log(status);
            console.log(error);
        },
        complete: function(data) {
            $("#statusPage-spinner").hide();
        },
        timeout: 2000
    });
}

function GitHubStatus() {
    $.ajax({
        url: "https://kctbh9vrtdwd.statuspage.io/api/v2/status.json",
        type: "GET",
        success: function (data) {
            var response = data;
            var indicator = response.status.indicator;
            if(indicator == "minor") {
                IsMedium = true;  
            }
            else if(indicator == "major" || indicator == "critical") {
                IsBad == true;
            }
            $("#github").text(response.status.description);
        },
        error: function (request, status, error) {
            IsBad == true;
            $("#github").text("Site Unreachable");

            console.log(request);
            console.log(status);
            console.log(error);
        },
        complete: function(data) {
            $("#github-spinner").hide();
        },
        timeout: 2000
    });
}



function UpdateStatusSummary() {
    if(IsBad) {
        $("#status-bad").show();
    }
    else if(IsMedium) {
        $("#status-medium").show();
    }
    else if(IsGood) {
        $("#status-good").show();
    }
    console.log("hit");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }