var fs = require('fs');
var formidable = require('formidable');

class UploadFile {
	constructor() {
        this.pathImages = [];
    }
	
    start (req) {
        return new Promise(function (resolve, reject){
            const form = new formidable.IncomingForm();

            form.parse(req, function(err, fields, files) {
                if (err) return reject("Erro ao salvar as imagens");
                this.upload(fields, files, 0, resolve, reject);
            }.bind(this));
        }.bind(this));
	}

    upload (fields, files, index, resolve, reject) {
        var objKeys = Object.keys(files),
            key = parseInt(index)+1;

        if (key <= objKeys.length) {
            var image = files["image_" + index],
                image_upload_path_old = image.path,
                image_upload_path_new = './public/images/' + fields._id + '/',
                image_upload_extension = /[^.]+$/.exec(image.name)[0],
                image_upload_name = "image_" + index + "." + image_upload_extension,
                image_upload_path_name = image_upload_path_new + image_upload_name;

            if (fs.existsSync(image_upload_path_new)) {
                fs.rename(image_upload_path_old, image_upload_path_name, function (err) {
                    if (err) return reject("Erro ao salvar a imagem " + key);

                    this.pathImages.push({
                        "path": image_upload_path_name,
                        "position": index
                    });

                    this.upload(fields, files, key, resolve, reject);
                }.bind(this));
            }
            else {
                fs.mkdir(image_upload_path_new, function (err) {
                    if (err) return reject("Erro ao salvar a imagem " + key);
                                                
                    fs.rename(image_upload_path_old, image_upload_path_name, function(err) {
                        if (err) return reject("Erro ao salvar a imagem " + key);

                        this.pathImages.push({
                            "path": image_upload_path_name,
                            "position": index
                        });

                        this.upload(fields, files, key, resolve, reject);
                    }.bind(this));
                }.bind(this));
            }
        }
        else {
            var objReturn = {};

            (objKeys.length == 0) ?
            objReturn = { msg: "Não há imagens para enviar", arrImages: [] } :
            objReturn = { msg: "Imagens enviadas com sucesso", arrImages: this.pathImages };

            return resolve(objReturn);
        }            
    }
}

module.exports = UploadFile;