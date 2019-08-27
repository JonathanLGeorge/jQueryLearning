//when the document is ready do whatever the function wants to do
$(document).ready(function(){
    console.log("we are ready");
    //searching body tag and replaces ant text
    //$('body').text("hello Jonathan");
    //$('body').html('<strong>hello Jonathan</strong>');
   // $('#fire').addClass('highlight');
    //$('.solid, .non-solid').addClass('highlight');
   // $('#container, .non-solid').addClass('highlight');
    $('#container >>> .non-solid').addClass('highlight');
    //$('#container2 input:required').addClass('highlight2');
    //$('#container2 input[placeholder="Last Name"]').addClass('highlight2');
    $('#container2 input[placeholder*="Name"]').addClass('highlight2');
});