const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    price: {type: Number, required: true, validate : {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
      }
    },
}, {collection: 'products'});


mongoose.model('product', productSchema);