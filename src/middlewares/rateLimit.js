const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 100,  
  message: 'Muitas requisições, tente mais tarde'
});

module.exports = limiter;