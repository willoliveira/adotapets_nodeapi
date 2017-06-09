'use strict';
var mongoose = require('mongoose');

/**
 * MongoDB Connection
 * @returns {Object}
 */
module.exports = (options) => {
	var instance = undefined;

	/**
	 * Connect to MongoDB
	 * @param connectionString {String}
	 */
	function connect(connectionString) {
		mongoose.Promise = Promise;
		mongoose.connect(connectionString);
		instance = mongoose.connection;

		return instance;
	}

	/**
	 * Disconnect from MongoDB
	 * @returns {Promise}
	 */
	function disconnect() {
		return instance.close();
	}

	/**
	 * Get MongoDB instance
	 * @returns {Object}
	 */
	function getInstance() {
		return instance;
	}

	return {
		connect: connect,
		disconnect: disconnect,
		getInstance: getInstance
	}
};