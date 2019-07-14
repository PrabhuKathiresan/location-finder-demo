module.exports = {
  JWT_SECRET: 'doodleblueauthentication', // replace with your own secret
  oauth: {
    google: {
      clientID: 'number', // replace with actual client id
      clientSecret: 'string', // replace with actual client secret
    },
    facebook: {
      clientID: 'number', // replace with actual client id
      clientSecret: 'string', // replace with actual client secret
    },
  },
  mongoUri: 'mongodb://localhost/doodleblueLocation', // replace with your own mongoURI
  clientURI: 'http://localhost:3000' // frontend url for setting up cors
};