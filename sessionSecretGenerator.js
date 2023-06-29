const crypto = require("crypto");

const generateSessionSecret = () => {
  const randomBytes = crypto.randomBytes(32);
  return randomBytes.toString("hex");
};

console.log(generateSessionSecret());
