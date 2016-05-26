function SaveMessage()
{
    var name = $("#wishesName").val();
    var message = $("#wish").val();

    if(name == '' || name == null)
    {
        alert('You must provide a name!');
        return;
    }

    if(message == '' || message == null)
    {
        alert('You must have some message text!');
        return;
    }

    var jsonObject = {
        "name": name,
        "message" : message
    };

    function funcPass(data) {
        if (data.bSuccess) {

            $(".owl-wrapper").append(data.messagePartial);
            // get owl element
            var owl = $('.owl-carousel');

            // get owl instance from element
            var owlInstance = owl.data('owlCarousel');

            // if instance is existing
            if (owlInstance != null)
                owlInstance.reinit();

            $("#wishesName").val("");
            $("#wish").val("");

            $("#saveButton").val("Thanks!");
        }
    }

    var serverURL = $("#SaveMessageURL").val();
    PerformAjaxCallJson(serverURL, jsonObject, funcPass);
}

function SubmitRSVP()
{
    var name = $("#nameRSVP").val();
    var email = $("#rsvpMail").val();
    var guestCount = $("#rsvpGuest").val();
    var notes = $("#rsvpNotes").val();

    if(name == "" || name == null)
    {
        alert("Please provide a name.");
        return;
    }

    if (email == "" || email == null) {
        alert("Please provide a email.");
        return;
    }

    var jsonObject = {
        "name": name,
        "email": email,
        "guestCount": guestCount,
        "notes": notes
    };

    function funcPass(data) {
        if (data.bSuccess) {

            $("#nameRSVP").val("");
            $("#rsvpMail").val("");
            $("#rsvpGuest").val("");
            $("#rsvpNotes").val("");

            alert('Thanks! See you soon');
            $("#attendingInput").html("See you soon!");
            $("#btnSubmitRSVP").html("Thanks!");
        }
    }

    var serverURL = $("#SaveRSVPURL").val();
    PerformAjaxCallJson(serverURL, jsonObject, funcPass);
}