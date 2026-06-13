import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Initialize environmental configurations
dotenv.config();

const app = express();

// 1. Connect Node.js cleanly to MongoDB Atlas Cloud Cluster
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected to cloud cloud database successfully.'))
  .catch((err) => console.error('Database Connection Error:', err));

// 2. Configure CORS to allow local testing and your live Vercel address link cleanly
const allowedOrigins = [
  'http://localhost:5173', 
  'https://vercel.app' // Whitelisted your live Vercel frontend URL!
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by security layer configurations (CORS)'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Link environmental credentials to the Cloudinary engine
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 4. Configure Cloudinary secure remote bucket parameters
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'marketing_site_products', // Creates folder automatically inside your Cloudinary dashboard
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }], // Optimizes image dimensions automatically
  },
});

const upload = multer({ storage });

// 5. Database Schema Blueprint (Replaces the temporary development array memory)
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true }, // Array storing secure Cloudinary URL links
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

// 6. API ENDPOINTS

// Server live health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend Engine Running Safely on Render Cluster' });
});

// CREATE: Upload dynamic products with multiple images directly into Cloudinary
app.post('/api/products/upload', upload.array('images', 12), async (req, res) => {
  try {
    const { name, price } = req.body;
    const files = req.files || [];

    if (files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please attach at least one product image file' });
    }

    // Capture the secure web URLs generated directly by Cloudinary CDN hosts
    const imageLinks = files.map((file) => file.path);

    const product = await Product.create({
      name: name || 'Untitled Product',
      price: price ? Number(price) : 0,
      images: imageLinks,
    });

    return res.status(200).json({ success: true, message: 'Upload successful', data: product });
  } catch (err) {
    console.error('Upload handler error:', err);
    return res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
  }
});

// READ: Fetch all catalog products for the frontend slider carousel
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }); // New entries appear first
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetch operations failed', error: err.message });
  }
});

// DELETE: Remove record entries and clear assets from Cloudinary dashboards securely
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Target product records not found' });
    }

    // Extract the Cloudinary asset names (Public IDs) to wipe them out of your media dashboard
    for (const url of product.images) {
      try {
        const urlParts = url.split('/');
        const fileNameWithExtension = urlParts[urlParts.length - 1];
        const fileName = fileNameWithExtension.split('.')[0];
        const publicId = `marketing_site_products/${fileName}`;
        
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('Failed to clear an image asset out of Cloudinary records:', err);
      }
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: 'Product completely erased from system databases' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Deletion processes failed', error: err.message });
  }
});

// Fallback to port 3500 locally, but process.env.PORT is MANDATORY for Render
const PORT = process.env.PORT || 3500;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server execution initialized safely on port ${PORT}`);
});
