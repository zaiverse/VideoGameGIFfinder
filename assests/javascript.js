emptyArr = ["Dark Souls","Hollow Knight", "Dead Space 3"];

function displayButtons(){
    for(i=0; i<emptyArr.length; i++){
        var button = $("<button>");
        button.text(emptyArr[i]);
        button.attr('data-person', emptyArr[i]);
        button.addClass('btun');
        $('#buttons').append(button);
    }
}

displayButtons();

$('#submit').on("click", function(){
    $('#buttons').empty();
    var userinput = $('#userInput').val();
    emptyArr.push(userinput);
    displayButtons();
})

$(document).on("click", ".btun", function(){
    $('#GIFArea').empty();
    var videoGame = $(this).attr('data-person');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    videoGame + "&api_key=OLOUg6HHWUJk6R6lEAMsFkr94NDGwKD1&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        console.log(response.data)
        var giffys = response.data;
        
        for(i=0; i< giffys.length; i++){
            var gifDiv = $("<div>");
            var videoGameimg = $("<img>");

            videoGameimg.attr("src", giffys[i].images.fixed_height.url);
            gifDiv.append(videoGameimg);
            $('#GIFArea').prepend(gifDiv);

        }
      })
    
})
