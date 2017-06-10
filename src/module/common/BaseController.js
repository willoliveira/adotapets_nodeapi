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
	put(req, res) {
		this.entity.findOneAndUpdate(req.params.id, req.body, { new:true }, (err, entity) => {
			if (err) res.send(err);
			res.json(entity);
		});
	}

	/**
	 * GET
	 * /api/vi/model
	 * /api/vi/model/:id
	 * @param {*} req 
	 * @param {*} res 
	 */
	get(req, res) {
		var request;
		if (req.params.id) request = this.entity.findById.bind(this.entity, req.params.id);
		else request = this.entity.find.bind(this.entity, {});

		request((err, entity) => {
			if (err) res.send(err);
			res.json(entity);
		});
	}
}

module.exports = BaseController;