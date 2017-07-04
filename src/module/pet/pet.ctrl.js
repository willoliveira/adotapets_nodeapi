var BaseController = require("../common/BaseController");
var Pet = require("./pet.ent");
var User = require("../user/user.ent.js");
var fs = require('fs');
var formidable = require('formidable');

class PetsController extends BaseController{

	constructor(router) {
		super(router, Pet);

		this.bind('/pet')
			.get(this.get.bind(this))
			.post(this.post.bind(this));

		this.bind('/pet/:id')
			.get(this.get.bind(this))
			.put(this.put.bind(this))
			.delete(this.delete.bind(this));

		this.bind('/uploadImagePet')
			.post(this.uploadImagePet.bind(this));
	}

	/**
	 * TODO: deixar assim por enquanto
	 * Antes de salvar o Pet, verifica se o user existe
	 * @override 
	 * @param {*} req 
	 * @param {*} res 
	 */
	post(req, res) {
		var petData = req.body;
		User.findOne({ "_id" : req.body._userId}, (err, user) => {
			if(err) {
				res.send({
					message: new Error("Error find a user to vinculate in pet").message
				});
			}
			if (user) {
				var newPet = new this.entity(req.body);
				newPet.save((err, pet) => {
					if (err) {
						res.status(500).send({
							message: new Error("Error to save pet").message
						});
					}
					res.status(201).json({
						content: pet
					});
				})
			} else {
				res.status(412).send({
					message: new Error("User not exist!").message
				});
			}
		});
	}

	/**	 
	 * Upload de imagem para os pets
	 * @param {*} req 
	 * @param {*} res 
	*/
	uploadImagePet(req, res) {		
		var form = new formidable.IncomingForm();		
		
		form.parse(req, function(err, fields, files) {
			if (err) return res.status(500).send({ status: 500, message: "Erro ao salvar a imagem", error: err });													
			
			for (var key in files) {
				var image = files[key],
					image_upload_path_old = image.path,
					image_upload_path_new = './public/images/' + fields._id + '/',
					image_upload_extension = /[^.]+$/.exec(image.name)[0],
					image_upload_name = key + "." + image_upload_extension,
					image_upload_path_name = image_upload_path_new + image_upload_name;								

				if (fs.existsSync(image_upload_path_new)) {					
					fs.rename(image_upload_path_old, image_upload_path_name, function (err) {
						if (err) return res.status(500).send({ status: 500, message: "Erro ao salvar a imagem", error: err });
					});
				}
				else {					
					fs.mkdir(image_upload_path_new, function (err) {											
						console.log(err);
						
						if (err) return res.status(500).send({ status: 500, message: "Erro ao salvar a imagem", error: err });						

						fs.rename(image_upload_path_old, image_upload_path_name, function(err) {						
							if (err) return res.status(500).send({ status: 500, message: "Erro ao salvar a imagem", error: err });							
						});
					});
				}
			}			

			res.json({ status: 200, message: "Imagens enviadas com sucesso" });
		});
	}
}

module.exports = (router) => new PetsController(router);