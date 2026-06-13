import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Product from '../models/Product.js';

const router = express.Router();

// 1. Link environment credentials to the Cloudinary engine
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Cloudinary storage parameters
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'marketing_site_products', // Creates this folder automatically inside your Cloudinary dashboard
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }], // Optimizes image dimensions automatically
  },
});

const upload = multer({ storage });

// 3. CREATE: Upload dynamic products with multiple images
router.post('/upload', upload.array('images', 12), async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please attach at least one product image file' });
    }

    // Capture the secure web URLs generated directly by Cloudinary
    const imageLinks = req.files.map((file) => file.path);

    const product = await Product.create({
      name,
      price: Number(price),
      images: imageLinks,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Upload operations failed', error: error.message });
  }
});

// 4. READ: Fetch all catalog products for the frontend slider carousel
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }); // New entries appear first
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Fetch operations failed', error: error.message });
  }
});

// 5. DELETE: Remove database records and delete assets from Cloudinary dashboard
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
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
  } catch (error) {
    res.status(500).json({ success: false, message: 'Deletion processes failed', error: error.message });
  }
});

export default router;
