"use strict";

module.exports = (router) => {

    router.route('*').all(all);

    /**
     * All handler
     * @param req {Object}
     * @param res {Object}
     */
    function all (req, res) {
        res.status(404).json({
            message: new Error('The requested resource was not found').message
        });
    }
}