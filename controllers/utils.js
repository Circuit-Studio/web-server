// All utility files
const jwt = require('jsonwebtoken');

module.exports = {

    // Check authorization; see if logged in
    checkAuth: function(req, res, next){
      // If there's a cookie, they should be logged in
      if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
        req.user = null;
        console.log("Not in")
      } else {
        console.log("You're making it in at least.")
        // Success! Decode the token, then put that payload into req.user
        let token = req.cookies.nToken;
        let decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
      }
      next();
    },
    // If logged in, add class to display certain buttons
    checkLog: (page, user) => {
        return user ? page + " logged" : page;
    }

};
