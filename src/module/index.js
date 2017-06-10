'use strict';

module.exports = (router) => {
    require('./pet/pet.ctrl')(router);
    require('./user/user.ctrl')(router);
    require('./common/Error404')(router);
};