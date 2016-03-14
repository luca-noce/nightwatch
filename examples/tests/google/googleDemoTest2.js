/**
 * Sample automated test scenario for Nightwatch.js
 *
 * > it navigates to google.com and searches for nightwatch,
 *   verifying if the term 'The Night Watch' exists in the search results
 */

module.exports = {
   tags: ["luca"],
   before: function (browser, callback) {
      console.log("test #2 before");         
      callback(); 
   },
   after: function (browser, callback) {
      console.log("test #2 after");            
      callback();
   },    
  'demo test google #1' : function (client) {
    client
      .url('http://google.com')
      .waitForElementPresent('body', 1000);
  },

  'part two #2' : function(client) {
    client
      .setValue('input[type=text]', ['nightwatch', client.Keys.ENTER])
      .pause(1000)
      .assert.containsText('#main', 'Night Watch')
      //.end(); I want to close the session in the Global After so I don't need to repeat this in evry test
  }
};
