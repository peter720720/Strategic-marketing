import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
    },
    images: {
      type: [String], // Array storing secure Cloudinary URL links
      required: [true, 'Please upload at least one image file'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt tracking fields
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
