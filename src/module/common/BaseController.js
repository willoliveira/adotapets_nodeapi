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
			if (err) res.send(err);
			res.json(entity);
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
			if (err) res.send(err);
			res.json(entity);
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
	get(req, res, query={}) {
        query = Object.assign({}, { "_id": req.params.id }, query);
		var request;
		if (req.params.id) request = this.entity.findById.bind(this.entity, query);
		else request = this.entity.find.bind(this.entity, query);

		request((err, entity) => {
			if (err) res.send(err);
			res.json(entity);
		});
	}
}

module.exports = BaseController;