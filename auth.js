"use strict";

var AzureOAuth2Strategy  = require("passport-azure-oauth2");
var jwt                  = require("jwt-simple");

function AzureOAuthStrategy() {
    this.passport = require("passport");


    // SETTINGS! You'll need to edit these.
    this.passport.use("provider", new AzureOAuth2Strategy({
      clientID: '7d2eeb09-ffdf-4862-84c3-0c0db0d8a3aa',
      clientSecret: 'fWBhDwN8ZX1PZbfEzuVGCtKnSx/uSYJwikOTrvOFCJ4=',
      callbackURL: 'http://127.0.0.1:3000/auth/azureoauth/callback/',
      resource: "https://graph.microsoft.com/",
      prompt: 'consent'
    },


    function (accessToken, refreshtoken, params, profile, done) {
      var user = jwt.decode(params.id_token, "", true);
      user.accessToken = accessToken;
      done(null, user);
    }));

    this.passport.serializeUser(function(user, done) {
        done(null, user);
    });

    this.passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}

module.exports = new AzureOAuthStrategy();