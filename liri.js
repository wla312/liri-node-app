// use the require keyword to access all the exports in the keys.js file
var keysFile = require("./keys.js");

// load the fs package to read and write
var fs = require("fs");

// include/load the request npm package
var request = require("request");

// include/load the twitter npm package
var Twitter = require("twitter");

// include/load the spotify npm package
var Spotify = require('node-spotify-api');

// arguments
// the first argument is the command input
var command = process.argv[2];
var userInput = process.argv[3];

// print the exports in the keys.js file
console.log("-----------liri.js------------");
// console.log("keysFile export results");
// var client = keysFile.twitterKeys;

// store the twitter keys in variables
var consumerKey = keysFile.twitterKeys.consumer_key;
var consumerSecret = keysFile.twitterKeys.consumer_secret;
var accessKey = keysFile.twitterKeys.access_token_key;
var accessSecret = keysFile.twitterKeys.access_token_secret;

// store the spotify keys in variables
var clientID = keysFile.spotifyKeys.client_id;
var clientSecret = keysFile.spotifyKeys.client_secret;


var client = new Twitter({
	consumer_key: consumerKey,
	consumer_secret: consumerSecret,
	access_token_key: accessKey,
	access_token_secret: accessSecret,
});

var spotify = new Spotify({
	id: clientID,
	secret: clientSecret,
});

// console.log("consumer key: " + consumerKey);
// console.log("consumer secret: " + consumerSecret);
// console.log("access key: " + accessKey);
// console.log("access secret: " + accessSecret);
// console.log("client id: " + clientID);
// console.log("client secret: " + clientSecret);


// create a switch-case statement to direct which function gets run
switch (command) {
	case "my-tweets":
	getTweets();
	break;

	case "spotify-this-song":
	getSpotify();
	break;

	case "movie-this":
	getMovie();
	break;

	case "do-what-it-says":
	getWhatItSays();
	break;
}

// if the getTweets function is called...
function getTweets() {
	// test
	console.log("inside getTweets function");

	// pass the endpoint and parameters to the method
	client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response) {
		if(error) throw error;
		// console.log(tweets);
		console.log("------------------------------");
		var loopLength = tweets.length;
		for (var i = 0; i<loopLength; i++) {
			console.log("Timestamp: " + tweets[i].created_at + " | Tweet: " + tweets[i].text);
		}
	})
}

// if the getMovie function is called...
function getMovie() {
	// test
	console.log("inside getMovie function");

	if (process.argv[3]) {
		console.log("user input: " + userInput);

		request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  		// If the request is successful (i.e. if the response status code is 200)
	  		if (!error && response.statusCode === 200) {

	    	// Parse the body of the site and recover just the desired information
	    	console.log("Title: " + JSON.parse(body).Title);
	    	console.log("Year Released: " + JSON.parse(body).Year);
	    	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	    	console.log("Country: " + JSON.parse(body).Country);
	    	console.log("Language: " + JSON.parse(body).Language);
	    	console.log("Plot: " + JSON.parse(body).Plot);
	    	console.log("Actors: " + JSON.parse(body).Actors);
	  		}
		});
	}
	else {
		console.log("no user input, so I'm displaying Mr. Nobody");

		request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  		// If the request is successful (i.e. if the response status code is 200)
	  		if (!error && response.statusCode === 200) {

	    	// Parse the body of the site and recover just the desired information
	    	console.log("Title: " + JSON.parse(body).Title);
	    	console.log("Year Released: " + JSON.parse(body).Year);
	    	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	    	console.log("Country: " + JSON.parse(body).Country);
	    	console.log("Language: " + JSON.parse(body).Language);
	    	console.log("Plot: " + JSON.parse(body).Plot);
	    	console.log("Actors: " + JSON.parse(body).Actors);
	  		}
		});
	}
}

// if the getWhatItSays function is called...
function getWhatItSays() {
	console.log("inside getWhatItSays function");

	// we will read the random.txt file
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log(err);
		}

		// test
		// console.log(data);

		// divide data on the commas
		data = data.split(",");
		// console.log(data);
		var commandResult = data[0];
		var userInputResult = data[1];

		// pass the endpoint and parameters to method
		spotify.search({ type: 'track', query: userInputResult, limit: 1 }, function(err, data) {
			if (err) {
				return console.log('error occurred: ' + err);
			}

			// artist, song name, preview link of song, album
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song Name: " + data.tracks.items[0].name);
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		});
	})
}

// if the getSpotify function is called...
function getSpotify () {
	console.log("inside getSpotify function");

	if (process.argv[3]) {
		console.log("user input: " + userInput);

		// pass the endpoint and parameters to method
		spotify.search({ type: 'track', query: userInput, limit: 10 }, function(err, data) {
			if (err) {
				return console.log('error occurred: ' + err);
			}

			for (var i = 0; i<10; i++) {

				// artist, song name, preview link of song, album
				console.log("Artist: " + data.tracks.items[i].artists[0].name);
				console.log("Song Name: " + data.tracks.items[i].name);
				console.log("Preview Link: " + data.tracks.items[i].preview_url);
				console.log("Album: " + data.tracks.items[i].album.name);
				console.log("-----------------------------");
			}
		});
	}

	else {
		
		// pass the endpoint and parameters to method
		spotify.search({ type: 'track', query: 'track:The+Sign%20artist:Ace+of+Base', limit: 1 }, function(err, data) {
			if (err) {
				return console.log('error occurred: ' + err);
			}

			// artist, song name, preview link of song, album
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song Name: " + data.tracks.items[0].name);
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		});
	}
}









