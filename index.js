var readline = require('readline');
var googleapis = require('googleapis');
var dotenv = require('dotenv');
var OAuth2Client = googleapis.OAuth2Client;
dotenv.load();

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var REDIRECT_URL = 'http://localhost/oauth2callback';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken(oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/youtube'
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function(code) {
    // request access token
    oauth2Client.getToken(code, function(err, tokens) {
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}

function getUserSubs(client, authClient, callback) {
  client
    .youtube.playlistItems.list({
        part: 'snippet',
        playlistId: 'UU7A_dLnSAjl7uROCdoNyjzg',
        publishedAfter: '2014-06-20T00:00:00.000Z'
    })
    .withAuthClient(authClient)
    .execute(callback);
  // client
  //   .youtube.subscriptions.list({
  //     part: 'snippet',
  //     mine: true
  //   })
  //   .withAuthClient(authClient)
  //   .execute(callback);
}

// load google plus v1 API resources and methods
googleapis
  .discover('youtube', 'v3')
  .execute(function(err, client) {

  var oauth2Client =
    new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

  // retrieve an access token
  getAccessToken(oauth2Client, function() {

    getUserSubs(client, oauth2Client, function(err, subs) {
      if (err) {
        console.log('An error occured', err);
        return;
      }
      subs.items.forEach(function(sub) {
        console.log(sub);
      });
    });
  });

});