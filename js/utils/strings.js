var fiber = require('fiber');

var STRINGS = fiber.extend(function() {
  return {
    API: {
      USERS: '/api/users',
      LOGIN: '/api/login'
    },
    COOKIE: {
      LOGIN: {
        NAME: 'keysperience_login'
      }
    }
  };
});

module.exports = new STRINGS();