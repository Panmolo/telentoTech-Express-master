const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const HouseSchema = require('../models/House');
const HouseController = require('../controllers/HouseController'); //Importando el controllador
const multer = require('multer');
const houseController = new HouseController(); // creando una instancia de ese controlador


router.get('/House/Query', async (req, res) => {
    //Traer un usuario especifico pasando el ID
    var id = req.params.id
    let user = await UserSchema.findById(id); 
    res.json(user)

    //Traer un usuario pasandole el email
    // const query = UserSchema.where({ email: email });
    // const user = await query.findOne()
})

router.post('/House/Registry', async (req, res) => {
    //Crear un usuario
    let House = HouseSchema({
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        size: req.body.size,
        type: req.body.type,
        zip_code: req.body.zip_code,
        rooms: req.body.rooms,
        bathrooms: req.body.bathrooms,
        parking: req.body.parking,
        price: req.body.price,
        code: req.body.code
    })

    House.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        if(err.code == 11000){
            res.send({"status" : "error", "message" :"El correo ya fue registrado"})      
        }else{
            res.send({"status" : "error", "message" :err.message})      
        }
    })
})

router.get('/House', async (req, res) => {
    //Traer todos los usuarios
    let house = await HouseSchema.find(); 
    res.json(house)
})

router.get('/House/:id', async (req, res) => {
    //Traer un usuario especifico pasando el ID
    var id = req.params.id
    let house = await HouseSchema.findById(id); 
    res.json(house)
    //Traer un usuario pasandole el email
    // const query = UserSchema.where({ email: email });
    // const user = await query.findOne()
})

router.patch('/House/:id', (req, res) => {
    //Actualizar un usuario
    // Cuando viene por la url del servicio web params
    var id = req.params.id
    // Cuando viene por el body se usa body
    var updateHouse = {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        size: req.body.size,
        type: req.body.type,
        zip_code: req.body.zip_code,
        rooms: req.body.rooms,
        bathrooms: req.body.bathrooms,
        parking: req.body.parking,
        price: req.body.price,
        code: req.body.code
    }
    //Metodo para modificar usuarios
    HouseSchema.findByIdAndUpdate(id, updateHouse, {new: true}).then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error)
        res.send("Error actualizando el registro")
    })
})

router.delete('/House/:id', (req, res) => {
    
    var id = req.params.id

    //Puedo establecer cualquier parametro para eliminar
    HouseSchema.deleteOne({_id: id}).then(() => {
        res.json({"status": "success", "message": "User deleted successfully"})
    }).catch((error) => {
        console.log(error)
        res.json({"status": "failed", "message": "Error deleting user"})
    })
})

module.exports = router