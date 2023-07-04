const bcrypt = require("bcrypt");

bcrypt.hash("123456", 10, function (err, hash) {
  console.log(hash);
  // The hash returned, continue to compare
  bcrypt.compare("123456", hash, function (err, result) {
    console.log("generic:", result); // generic: true
  });

  bcrypt.compare("falsy", hash, function (err, result) {
    console.log("falsy:", result); // falsy: false
  });
});