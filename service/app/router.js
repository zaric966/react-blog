'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/defaultRouter')(app);
  require('./router/adminRouter')(app);
};
