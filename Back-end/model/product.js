import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    supplier: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    location: { type: String } // e.g., Warehouse location 
    // image: { type: String } // URL to the product image
});

const Product = mongoose.model('Product', productSchema);

export default Product;
