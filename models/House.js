const mongoose = require('mongoose') // Importando la libreria

//Modelo para ser ingresado en la DB, parametros tomados de las userRoutes
const HouseSchema = new mongoose.Schema({
    address: {
        type: String, 
        required: true,
        unique: true,
    },
    City: {
        type: String, 
        required: false,
        validate: {
            validator: async function(state) {
              // Validacion de la ciudad, await fetch para comparar con la Api de Colombia
              var response = await fetch('https://api-colombia.com/api/v1/City');
              var departments = await response.json()
              return departments.some(department => department.name.toUpperCase().includes(state.toUpperCase()));
            },
            message: props => `${props.value} no es un Departamento de Colombia!`
          }
    },
    state: {
        required: true,
        type: String,
        validate: {
            validator: async function(state) {
              // Validacion del departamento
              var response = await fetch('https://api-colombia.com/api/v1/Department');
              var departments = await response.json()
              return departments.some(department => department.name.toUpperCase().includes(state.toUpperCase()));
            },
            message: props => `${props.value} no es un Departamento de Colombia!`
          }
        },

    size: {
        type: Number, 
        required: true,        
    },
    type: {
        type: String, 
        required: true,
    },

    zip_code: {
        type: Number, 
        required: true,
    },

    rooms: {
        type: Number, 
        required: true,
    },

    bathrooms: {
        type: Number, 
        required: true,
    },

    parking: {
        type: Boolean, 
        required: true, 
    },

    price: {
        type: Number, 
        required: true,       
    },
    Code: {
        type: String, 
        required: false
    }
})

module.exports = mongoose.model('House', HouseSchema) 