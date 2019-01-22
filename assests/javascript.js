//empty array(add topics)
emptyArr = ["Dark Souls","Bioshock Infinite", "Dead Space 3"];

//create function that loops through array and creates buttons for the items
function displayButtons(){
    for(i=0; i<emptyArr.length; i++){
        var button = $("<button>");
        button.text(emptyArr[i]);
        button.attr('data-person', emptyArr[i]);
        button.addClass('btun');
        $('#buttons').append(button);
    }
}
//call displayButtons function
displayButtons();

//create on click function for submit button
$('#submit').click(function(){
    $('#buttons').empty();
    var userinput = $('#userInput').val().trim();
    emptyArr.push(userinput);
    displayButtons();
    $('#userInput').val('');
})

//include the key enter for submit button
$('#userInput').keypress(function(e){
    if(e.which == 13){
        $('#submit').click();
    }
});

//if you click on button from array
$(document).on("click", ".btun", function(){
    $('#GIFArea').empty();
    //grab unique data-person
    var videoGame = $(this).attr('data-person');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    videoGame + "&api_key=OLOUg6HHWUJk6R6lEAMsFkr94NDGwKD1&limit=10";

    //utilize ajax
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        console.log(response.data)
        //create variable for response.data
        var giffys = response.data;

        //loop through response.data
        for(i=0; i< giffys.length; i++){
            //limit rating
            if (giffys[i].rating !== "r" && giffys[i].rating !== "pg-13") {
                var rating = giffys[i].rating;
                var gifDiv = $("<div>");
                var videoGameimg = $("<img>");
                var ratingP = $("<p>").text("Rating: " + rating);

                gifDiv.addClass('gifydiv')
                videoGameimg.addClass('imgFix');

                videoGameimg.attr("src", giffys[i].images.fixed_height_still.url);
                videoGameimg.attr("data-still", giffys[i].images.fixed_height_still.url);
                videoGameimg.attr("data-animate", giffys[i].images.fixed_height.url);
                videoGameimg.attr("data-state", "still");

                gifDiv.append(ratingP);
                gifDiv.append(videoGameimg);
                $('#GIFArea').prepend(gifDiv);
            }
        }
        //function that changes src of gif if user hovers over div
        $(".imgFix").hover(function(){
            var stateofGif = $(this).attr("data-state");

            if(stateofGif === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }else{
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
      })
})
