//ajax stuff
var cart =0;
function addItem(id, name, description, price, moreInfo){
    let html = "";
        html += '<div class="items" data-id="' + id + '">';
        html +='<div class="city-name">' + name + '</div>';
        html +='<img src="assets/oakland.jpg"></img>';
        html +='<div class="description">' + description + '</div>';
        html +='<div class="price">' + price + '</div>';
        html += '<button class="item-add">Add to cart</button>';
        html +='<button class="item-remove">remove</button>';
        html += '<br/>';
        html += '<a class="more-info-link" href="#">more info</a>'
        html += '<div class="more-info">' +moreInfo+ '</div>'
        html += '</div>'

        $('#container8').prepend(html);
}



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

    //traversing 
    console.log($('#container3').find('.cold').children('.solid, .non-solid')
    .addClass('highlightBlue'));

    //first and last, next and prev
    $('#container3')
    .find('.hot')
    .children()
    .last()
    .addClass('highlight');

    $('#container3')
    .find('.hot')
    .children()
    .first()
    .addClass('highlight');

    $('#container3')
    .find('.hot')
    .children()
    .last()
    .prev()
    .addClass('highlight2');

    $('#snow')
    .parent()
    .addClass('highlight');

    //events
/*
    $('.box').on('click', function(){
        console.log("clicked inside the box");
        $(this).addClass('highlight2');
    });
*/
console.log(/[0-9{2}:[0-9]{2}:[0-9]{2}/);
    $('.box').on('click', '.box-button', function(){
        console.log("clicked inside the box");
        $(this).parent().toggleClass('highlight2');
    });

    $('#select-menu').on('change', function(){
        console.log($('#select-menu option:selected').val());

        let name = $('#select-menu option:selected').text();

        let gameDifficulty = $('#select-menu option:selected').val();

        let gameAward = $('#select-menu option:selected').data('award');

        console.log(gameAward);
        $('#feedback-message').text('You are about to play a ' + name +
        ', which will award you ' + gameAward + ' points for its level ' + gameDifficulty +
        ' difficulty.');
    });
/*
    $('#input-name').on('keydown', function(){
        let name = $(this).val();
        $('#feedback-message2').text('Pleased to meet you, ' + name);
    });
*/
    $('#input-name').on('keyup', function(){
        let name = $(this).val();
        $('#feedback-message2').text('Pleased to meet you, ' + name);
    });

    $('a').on('click', function(event){
        event.preventDefault();
        $('#feedback-message2').text("thats cool");
    });


    //added duplicate html 
    $('#button-create-item').on('click', function(){
        let name = $('#input-create-item').val();
        $('#input-create-item').val('');
        console.log("button pressed, '" + name + "' saved");
        let html = "";
        html += '<div class="items">';
        html +='<div class="city-name">' + name + '</div>';
        html +='<img src="assets/oakland.jpg"></img>';
        html +='<div class="description">Port city by the bay</div>';
        html +='<div class="price">$2000</div>';
        html += '<button class="item-add">Add to cart</button>';
        html +='<button class="item-remove">remove</button>';
        html += '<br/>';
        html += '<a class="more-info-link" href="#">more info</a>'
        html += '<div class="more-info">The rent is too damn high</div>'
        html += '</div>'

        $('#container7').prepend(html);
    });

    $('#container8').on('click', '.more-info-link', function(event){
        event.preventDefault();
        //you can add time in the toggle(1000) and it has a fade effect
        //or we can use fadeToggle() or slideToggle()
        $(this).parent().find('.more-info').fadeToggle('slow');

        //adding simple animations to the moreinfo link
        $(this)
            //added  opacity animation 
            .animate({"opacity": 0.1, "margin-left": 20}, "fast")
            .animate({"opacity": 1.0, "margin-left": 0}, "slow");
    });
    //removing 
    $('#container7').on('click','.item-remove', function(){
        $(this).parent().remove();
    });

    $.ajax('data/item.json', {
        dataType: 'json',
        contentType: 'application/json',
        cache: false
      })
      .done(function(response){
        let items = response.items;
        items.forEach(function(item){
          addItem(item.id, item.name, item.description, item.price, item.moreInfo);
        });
      })
      .fail(function(request, errorType, errorMessage){
        console.log(errorMessage);
      })
      .always(function(){
    
      });




   
   $('#container8').on('click','.item-add',function(){
    let id = $(this).parent().data('id');
 /*
    $.ajax("data/item.json", function(responnse){
        console.log(response);
    });
    */
    $.ajax('data/addToCart.json', {
      type: 'post',
      data: { id: id },
      dataType: 'json',
      contentType: 'application/json'
    })
    .done(function(response) {
      if (response.message === 'success') {
        let price = response.price;

        cart += price;

        $('#cart-container').text('$' + cart);
      }
    });
  });

  $('#newsletter-checkbox').on('change',function(){
    if ($(this).is(':checked')) {
      $('#newsletter-frequency').fadeIn();
    } else {
      $('#newsletter-frequency').fadeOut();
    }
  });
  $('#newsletter-checkbox').trigger('change');

  $('#cart-form').on('submit',function(event){
    event.preventDefault();

    let data = { form: $(this).serialize(), price: cart };

    $.ajax($(this).attr('action'), {
      type: 'post',
      data: data
    })
    .done(function(response){
      $('#feedback-message').text(response.message);
    });
  });
   
});
