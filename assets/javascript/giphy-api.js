var myCartoons = ["rick and morty" , "simpsons" , "futurama" , "beavis and butthead" , "bobs burgers" , "family guy" , "spongebob" , "robot chicken" , "metalocalypse" , "tom and jerry"]
function buttonRender(){
    $('#buttons-div').empty();
    for(i = 0 ; i < myCartoons.length ; i++){
        var myButton = $('<button>').text(myCartoons[i]).attr("value" , myCartoons[i]);
        $('#buttons-div').append(myButton);
    }
    $('button').on('click' , function(){

        $('#gif-display').empty();
        console.log(this.value);
        var cartoon = this.value;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6lD4zDNWaO9UwP5S20cnLdsgA30FdrFQ&q="+cartoon+"&limit=10&offset=0&rating=PG-13&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
            for(i = 0; i < response.data.length; i++){
                var stillGif = response.data[i].images.fixed_height_still.url;
                var moveGif = response.data[i].images.fixed_height.url;
                var gifGen = $("<img>").attr("src" , stillGif).attr("move-src" , moveGif).attr("still-src" , stillGif);
                $('#gif-display').append(gifGen);
                gifGen.on('click' , function(){
                    if($(this).attr("src") === $(this).attr("still-src")){
                        $(this).attr("src" , $(this).attr("move-src"))
                    }else{
                        $(this).attr("src" , $(this).attr("still-src"))
                    }
                })
            };
        })
    
    })
};
$("#find-cartoon").on("click", function(event) {
    // Preventing the submit button from trying to submit the form
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    event.preventDefault();
    var newCartoon = $('#cartoon-input').val();
    if(myCartoons.includes(newCartoon)){}
    else{
        myCartoons.push(newCartoon);
    }
    buttonRender()
});
buttonRender();