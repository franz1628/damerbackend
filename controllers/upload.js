const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Sku } = require('../models/sku');
const multer = require('multer');
const path = require('path');
const fs = require('fs');





const uploadImage = async (req = request, res = response) => {
  try {

    // Configure Multer storage
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/uploads/sku/'); // Define the directory where images will be stored
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Obtener la extensión del archivo
        cb(null, `temp${ext}`); // Asignar un nombre temporal al archivo
      }
    });


    // Crea el middleware de subida de Multer
    const upload = multer({ storage: storage });


    // Maneja la subida de la imagen
    upload.single('image')(req, res, async (err) => {
      if (err) {
       
        return res.status(500).json({ error: 'Error en la subida 1' });
      }

      // Verifica si se ha subido un archivo
      if (!req.file) {
        return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
      }

      const { id, ...rest } = req.body;
      const ext = path.extname(req.file.originalname); // Obtener la extensión del archivo
      const newFilename = `${id}${ext}`; // Asignar el nuevo nombre al archivo
      const newPath = path.join('public/uploads/sku', newFilename); // Ruta completa del nuevo archivo

      // Renombrar el archivo después de haber sido subido
      fs.rename(req.file.path, newPath, (err) => {
        if (err) {
          return res.status(500).send('Error renombrando el archivo');
        }
      });

      console.log(newFilename);
      console.log(id);
      // Actualiza el registro en la base de datos
      const updatedSku = await Sku.update(
        { image: newFilename },
        { where: { id: id } }
      );

      if (updatedSku[0] === 0) {
        return res.status(404).json({
          data: updatedSku,
          state: 1,
          message: 'Error en la subida 2'
        });
      }

      return res.json({
        data: updatedSku,
        state: 1,
        message: 'Subida correctamente'
      });
    });
  } catch (error) {
   
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  uploadImage
}