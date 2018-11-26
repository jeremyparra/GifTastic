// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.
var topics = ["dog", "cat", "rabbit", "monkey", "fish", "goat", "cow", "bird", "octopus", "bear"]
// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.
function makeButtons() {
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("animal-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons").append(a);
    }
}
makeButtons();
// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
function displayAnimalGif() {
    var animals = $(this).attr("data-name");
    var queryURL = $.get("http://api.giphy.com/v1/gifs/search?q=" + animals + "&limit=10&api_key=Pl5tYoNRP9jz4NL3USg6v0wAMRkkjqTt");
    // var queryURL = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC");
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);

        var gifDiv = $("<div class='gifs'>");
        var rating = response.Rated;
        var pOne = $("<p>").text("Rating: " + rating);
        gifDiv.append(pOne);
        var image = $("<img>").attr("src", imgURL);
        gifDiv.append(image);
        $("#mainContainer").append(gifDiv);
        console.log(queryURL);
    });

}
$("#buttons").on("click", ".animal-btn", displayAnimalGif());



// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.
