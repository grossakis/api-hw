var myCartoons = ["Rick and Morty" , "Simpsons" , "Futurama" , "Beavis and Butthead" , "Bobs Burgers" , "Family Guy" , "Spongebob" , "Robot Chicken" , "Metalocalypse" , "Tom and Jerry"]
var gifLim;
var cartoon;

var buttonRender = function(){
    $('#buttons-div').empty();
    for(i = 0 ; i < myCartoons.length ; i++){
        var myButton = $('<button>').text(myCartoons[i]).attr("value" , myCartoons[i]);
        myButton.addClass("spawn-button");
        $('#buttons-div').append(myButton);
    }
    var gifSpawn = function(){

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6lD4zDNWaO9UwP5S20cnLdsgA30FdrFQ&q="+cartoon+"&limit="+gifLim+"&offset=0&rating=PG-13&lang=en";
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function ajaxFollow(response){
            $('#gif-display').empty();
            // console.log(response)
            var gifInstruct = $('<h2>Click on GIF to Animate</h2><br>');
            $('#gif-display').append(gifInstruct);
            for(i = 0; i < response.data.length; i++){
                var stillGif = response.data[i].images.fixed_height_still.url;
                var moveGif = response.data[i].images.fixed_height.url;
                var gifRating = response.data[i].rating;
                var ratingText = $('<p>').text('rated: '+gifRating);
                var gifGen = $("<img>").attr("src" , stillGif).attr("move-src" , moveGif).attr("still-src" , stillGif);
                var gifCard = $('<div>');
                gifCard.addClass('gif-card')
                gifCard.append(ratingText);
                gifCard.append(gifGen)
                $('#gif-display').append(gifCard);

                gifGen.on('click' , function(){
                    if($(this).attr("src") === $(this).attr("still-src")){
                        $(this).attr("src" , $(this).attr("move-src"))
                    }else{
                        $(this).attr("src" , $(this).attr("still-src"))
                    }
                })
            };
            moreButton=$('<button>').addClass('more-button');
            moreButton.attr("value" , cartoon);
            moreButton.attr('id' , 'more-gifs')
            moreButton.text("Generate More GIFs");
            moreButton.on('click' , function(){
                gifLim=gifLim+10
                gifSpawn();
            });
            $('#gif-display').append('<br><br>');
            $('#gif-display').append(moreButton);
            
        })

    }
    $('.spawn-button').on('click' , function (){
        gifLim=10;
        $('#main-content').addClass('main-deco')
        console.log(this.value);
        cartoon=this.value;
        gifSpawn();
    })
};

$("#find-cartoon").on("click", function(event) {
    // Preventing the submit button from trying to submit the form
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    event.preventDefault();
    var newCartoon = $('#cartoon-input').val();
    if(myCartoons.includes(newCartoon)||newCartoon===''){}
    else{
        $('#cartoon-input').val('');
        myCartoons.push(newCartoon);
    }
    buttonRender()
});
buttonRender();