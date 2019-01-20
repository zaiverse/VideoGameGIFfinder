

emptyArr = ["Dark Souls","Hollow Knight", "Dead Space 3"];

function displayButtons(){
    for(i=0; i<emptyArr.length; i++){
        var button = $("<button>");
        button.text(emptyArr[i]);
        button.attr('data-person', emptyArr[i]);
        button.addClass('btun')
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
    console.log($(this).attr('data-person'))
    var videoGame = $(this).attr('data-person');
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + videoGame + "&api_key=OLOUg6HHWUJk6R6lEAMsFkr94NDGwKD1&limit=10");

    xhr.done(function(response) { 
        console.log(response);
        var img = $('<img>');
        img.attr('src', )
    });
})
