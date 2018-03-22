# liri-node-app

###LIRI === Language Interpretation and Recognition Interface. 

liri-node-app is a command line node app that takes in parameters and gives you back data.

To replicate this project, you will need to create your own keys.js file and populate it with the neccessary Twitter, Spotify, and IMDB keys.

###This application accepts the following commands:
	`my-tweets`
	`spotify-this-song`
	`movie-this`
	`do-what-it-says`

###What each command does:

1. `node liri.js my-tweets`

   * This will show my/your last 20 tweets and when they were created in the terminal/bash window.

   * This command uses the Twitter API and npm package <https://apps.twitter.com/app/new> <https://www.npmjs.com/package/twitter>

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in the terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base, lol.
   
   * This command uses the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
   * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. You'll need these to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api). 

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
   
   * You'll use the request package to retrieve data from the OMDB API. The OMDB API requires an API key.

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
