'use strict';

module.exports = (router) => {
    require('./pet/pet.ctrl')(router);
    require('./common/Error404')(router);
};