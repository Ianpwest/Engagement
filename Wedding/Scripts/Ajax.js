// This file is for the posting of forms using ajax with capabilities of validation and replacement of partial views

var queueAjaxCalls = [];
var bIsPerformingAjaxCall = false;

function SubmitFormAjax(strUrl, strFormId, passInFunc) {
    AddAjaxQueueObjectForm(strUrl, strFormId, passInFunc);
}

function PerformAjaxCallSimple(strUrl, strData, passInFunc) {
    AddAjaxQueueObjectSimple(strUrl, strData, passInFunc);
}

function PerformAjaxCallJson(strUrl, jsonObject, passInFunc) {
    AddAjaxQueueObjectJson(strUrl, jsonObject, passInFunc);
}

function AddAjaxQueueObjectForm(strURL, strFormId, funcPass) {
    var objAjax = {
        DoAjax: function () {
            ProcessSubmitFormAjax(strURL, strFormId, funcPass);
        }
    }
    queueAjaxCalls.push(objAjax);
    if (!bIsPerformingAjaxCall)
        PerformAjaxQueueShift();
}

function AddAjaxQueueObjectSimple(strURL, strData, funcPass) {
    var objAjax = {
        DoAjax: function () {
            ProcessPerformAjaxCallSimple(strURL, strData, funcPass);
        }
    }
    queueAjaxCalls.push(objAjax);
    if (!bIsPerformingAjaxCall)
        PerformAjaxQueueShift();
}

function AddAjaxQueueObjectJson(strURL, jsonObject, funcPass) {
    var objAjax = {
        DoAjax: function () {
            ProcessPerformAjaxCallJson(strURL, jsonObject, funcPass);
        }
    }
    queueAjaxCalls.push(objAjax);
    if (!bIsPerformingAjaxCall)
        PerformAjaxQueueShift();
}

function PerformAjaxQueueShift() {
    if (bIsPerformingAjaxCall)
        return;

    if (queueAjaxCalls.length < 1)
        return;

    bIsPerformingAjaxCall = true;
    queueAjaxCalls[0].DoAjax();
    queueAjaxCalls.shift();
}

function ProcessSubmitFormAjax(strUrl, strFormId, passInFunc) {
    //ShowLoadingAnimation(null, "fixedGlobalLoadingTarget");

    $.ajax({
        url: strUrl,
        type: "Post",
        data: $('form#' + strFormId).serialize(),
        success: function (data) {
            //StopLoadingAnimation();
            bIsPerformingAjaxCall = false;
            if (data.bSuccess) {
                passInFunc(data);
                bIsPerformingAjaxCall = false;
                PerformAjaxQueueShift();
            }
            else {
                HandleAjaxErrorNonSuccess(data);
            }
        },
        error: function (xhr, status, error) {
            //StopLoadingAnimation();
            bIsPerformingAjaxCall = false;
            queueAjaxCalls = [];
            //DisplayModal("Error", "<h3>Unable to contact the server. Please try again.</h3>");
        }
    });
}

function ProcessPerformAjaxCallJson(strURL, jsonObject, passInFunc) {
    //ShowLoadingAnimation(null, "fixedGlobalLoadingTarget");
    $.ajax({
        url: strURL,
        type: "Post",
        data: JSON.stringify(jsonObject),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            //StopLoadingAnimation();
            bIsPerformingAjaxCall = false;
            if (data.bSuccess) {
                passInFunc(data);
                PerformAjaxQueueShift();
            }
            else {
                HandleAjaxErrorNonSuccess(data);
            }
        },
        error: function (xhr, status, error) {
            //StopLoadingAnimation();
            bIsPerformingAjaxCall = false;
            queueAjaxCalls = [];
            //DisplayModal("Error", "<h3>Unable to contact the server. Please try again.</h3>");
        }
    });
}

function HandleAjaxErrorNonSuccess(data) {
    queueAjaxCalls = [];

    if (data.bModelInvalid) {
        document.open();
        document.write(data.contents);
        document.close();
        return;
    }
    else if (data.bError) {
        //DisplayModal(data.strErrorHeader, data.strContents);
        return;
    }
}

function NullFunction() {
    // method for overriding form post functionality
}

function TransitionPartialView(strPartial) {
    $(document).ready(function () { // animate the partial view body to 0% opacity
        $("#body").animate({ opacity: 0 }, 1000, function () {
            // set the contents to the new partial view
            $('#body').html(strPartial);
            //document.getElementById('RenderBody').innerHTML = strPartial;
            // animate the partial view body back to 100% opacity
            $("#body").animate({ opacity: 1 }, 1000);
        });
    });
}


