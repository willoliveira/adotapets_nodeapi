class BaseController {

	constructor(router, entity) {
		this.router = router;
		this.entity = entity;
	}

	bind (path) {
		return this.router.route(path);
	}

	/**
	 * POST
	 * /api/v1/model
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	post(req, res) {
		var newEntity = new this.entity(req.body);
		newEntity.save((err, entity) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).json({
				content: entity
			});
		});
	}

	/**
	 * PUT
	 * /api/v1/model/:id
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	put(req, res, query={}) {
		var query = Object.assign({}, { "_id": req.params.id }, query);
		this.entity.findOneAndUpdate(query, req.body, { new: true }, (err, entity) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).json({
				content: entity
			});
		});
	}

	/**
	 * GET
	 * /api/vi/model
	 * /api/vi/model/:id
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	get(req, res, query) {
		var request;
		query = Object.assign({}, query);
		if (req.params.id) {
			query = Object.assign(query, { "_id": req.params.id });
			request = this.entity.findOne.bind(this.entity, query);
		}
		else {
			request = this.entity.find.bind(this.entity, query);
		}
		request((err, entity) => {
			if (err) {
				res.status(500).send(err);
			} else {
				if (Array.isArray(entity)) {
					if (!entity.length) {
						entity = "";
					}
				}
				res.status(200).json({
					content: entity
				});
			}
		});
	}

	/**
	 * DELETE
	 * /api/vi/model/:id
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	delete(req, res, query) {
		query = Object.assign({}, query);
		if (req.params.id) { 
			query = Object.assign(query, { "_id": req.params.id });
		}
		this.entity.remove(query, function(err, entity) {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).json({
				content: {
					_id: req.params.id
				}
			});
		});
	}
	
	send(req, res, status, object) {
		if (object && status.match(/400|401|403|404|500/)) res.status(status).json({message: object.message});
		else if (object && status.match(/200|201/)) res.status(status).json(object);
		else res.status(status).end();
	}
}

module.exports = BaseController;