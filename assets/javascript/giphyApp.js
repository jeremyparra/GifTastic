// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.
var topics = ["dog", "cat", "rabbit", "monkey", "fish", "goat", "cow", "bird", "octopus", "bear"]
// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.
function makeButtons() {

    $("#buttons").empty();

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

$("#buttons").on("click", ".animal-btn", function () {

    $("#gifs").empty();

    var animals = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=baby+" + animals + "&limit=10&api_key=Pl5tYoNRP9jz4NL3USg6v0wAMRkkjqTt";
    console.log(animals);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

        .then(function (response) {
            var results = response.data;
            console.log(response)
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var label = $("<h3 id='rating'>").text("Rating: " + rating);
                var animalImage = $("<img>");

                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-state", "paused");
                animalImage.attr("data-moving-url", results[i].images.fixed_height.url);
                animalImage.attr("data-still-url", results[i].images.fixed_height_still.url);                
                animalImage.addClass("gif");

                gifDiv.append(animalImage);
                gifDiv.append(label);

                $("#gifs").prepend(gifDiv);
            }
    });
});

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.


$("#gifs").on("click", "img", function () {

    var state = $(this).attr("data-state");

    if (state == "paused") {
        $(this).attr("data-state", "unpaused");
        $(this).attr("src", $(this).attr("data-moving-url"));
    } else {
        $(this).attr("data-state", "paused");
        $(this).attr("src", $(this).attr("data-still-url"));
    }
});


// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.
$("#add-animal").on("click", function(event) {

    event.preventDefault();

    var animal = $("#animal-input").val().trim();
    topics.push(animal);

    makeButtons();
    $("#animal-input").val("");
});