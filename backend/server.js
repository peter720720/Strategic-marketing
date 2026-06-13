import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup uploads directory and serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadDir));

// Multer disk storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '';
    cb(null, `${unique}${ext}`);
  }
});
const upload = multer({ storage });

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Minimal upload endpoint to satisfy frontend requests
app.post('/api/products/upload', upload.array('images'), (req, res) => {
  try {
    const { name, price } = req.body;
    const files = req.files || [];

    const images = files.map((f) => `${req.protocol}://${req.get('host')}/uploads/${f.filename}`);

    const product = {
      _id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      name: name || 'Untitled',
      price: price ? Number(price) : 0,
      images: images.length ? images : ['https://via.placeholder.com/600x600?text=No+Image']
    };

    products.unshift(product);

    return res.status(200).json({ success: true, message: 'Upload successful', data: product });
  } catch (err) {
    console.error('Upload handler error:', err);
    return res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

// In-memory products store for development/testing
const products = [];

// Return list of products
app.get('/api/products', (req, res) => {
  res.status(200).json({ success: true, data: products });
});

// Delete a product by id
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => String(p._id) === String(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  products.splice(index, 1);
  res.status(200).json({ success: true, message: 'Product deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
