require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const sampleProducts = [
  {
    name: 'Aura Studio Wireless Noise-Cancelling Headphones',
    description: 'Flagship hybrid active noise cancelling over-ear headphones featuring 40mm beryllium drivers, spatial audio tracking, 45-hour battery life, and plush memory foam ear cushions.',
    price: 18999,
    category: 'electronics',
    brand: 'AuraSound',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    numReviews: 42,
    isFeatured: true
  },
  {
    name: 'ProArt 27-inch 4K HDR Color-Calibrated Monitor',
    description: 'Professional grade 27-inch IPS 4K panel with 100% sRGB and 98% DCI-P3 color gamut, factory calibration (Delta E < 2), 90W USB-C Power Delivery, and ergonomic pivot stand.',
    price: 34999,
    category: 'electronics',
    brand: 'ViewCraft',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    numReviews: 28,
    isFeatured: true
  },
  {
    name: 'Apex KeyForge Wireless Mechanical Keyboard',
    description: 'Hot-swappable 75% layout mechanical keyboard with custom lubricated linear switches, CNC aluminum chassis, south-facing RGB, and tri-mode connectivity (2.4GHz, Bluetooth 5.2, USB-C).',
    price: 8499,
    category: 'electronics',
    brand: 'KeyForge',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    numReviews: 35,
    isFeatured: false
  },
  {
    name: 'ErgoGlide Master Wireless Ergonomic Mouse',
    description: 'Sculpted vertical ergonomic mouse designed to reduce wrist strain. Features 8000 DPI Darkfield tracking, dual mode MagSpeed scroll wheel, and customizable tactile thumb gesture button.',
    price: 5299,
    category: 'electronics',
    brand: 'GlideTech',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    numReviews: 19,
    isFeatured: false
  },
  {
    name: 'Vanguard All-Weather Techwear Commuter Backpack',
    description: 'Waterproof Cordura ballistic nylon daypack with magnetic Fidlock closures, dedicated padded 16-inch laptop compartment, hidden passport security pocket, and luggage pass-through.',
    price: 6499,
    category: 'fashion',
    brand: 'Vanguard',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    numReviews: 53,
    isFeatured: true
  },
  {
    name: 'Artisan Chronograph Minimalist Leather Watch',
    description: 'Sapphire crystal Japanese quartz chronograph with surgical grade 316L stainless steel case and interchangeable top-grain Italian vegetable tanned leather strap. Water resistant to 50m.',
    price: 11999,
    category: 'fashion',
    brand: 'Chronos',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    numReviews: 24,
    isFeatured: true
  },
  {
    name: 'Raw Denim Slim-Fit Selvedge Jeans',
    description: 'Authentic 14oz Japanese selvedge denim woven on vintage shuttle looms. Unwashed indigo finish that naturally fades to your unique wear patterns over time.',
    price: 4999,
    category: 'fashion',
    brand: 'Kuroki',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
    numReviews: 14,
    isFeatured: false
  },
  {
    name: 'Precision Barista Pour-Over Coffee Station',
    description: 'Handcrafted heat-resistant borosilicate glass carafe with dual-layer titanium micro-mesh stainless steel filter, walnut wooden collar, and calibrated measurement markings.',
    price: 3299,
    category: 'home',
    brand: 'BrewMaster',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    numReviews: 31,
    isFeatured: true
  },
  {
    name: 'Lumina Smart Ambient LED Gradient Light Bar',
    description: 'Ultra-thin desk illumination bar with asymmetric optical design to eliminate screen glare, auto-dimming ambient light sensor, and wireless rotary control dial.',
    price: 4499,
    category: 'home',
    brand: 'Lumina',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    numReviews: 22,
    isFeatured: false
  },
  {
    name: 'Ceramic Ultrasonic Aroma Diffuser & Humidifier',
    description: 'Matte stone-finish ceramic diffuser that gently disperses pure essential oils using ultrasonic wave technology. Features 7 soft ambient LED colors and auto-shutoff safety.',
    price: 2799,
    category: 'home',
    brand: 'AromaZen',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    numReviews: 47,
    isFeatured: false
  },
  {
    name: 'MagCharge 3-in-1 Fast Wireless Charging Station',
    description: 'Foldable aluminum wireless charger capable of simultaneously powering your smartphone (15W MagSafe), smartwatch, and wireless earbuds with one USB-C PD cable.',
    price: 3999,
    category: 'accessories',
    brand: 'VoltSync',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    numReviews: 39,
    isFeatured: true
  },
  {
    name: 'AeroStand CNC Aluminum Ergonomic Laptop Riser',
    description: 'Heavy-duty aircraft-grade anodized aluminum riser that elevates screens to eye level (up to 6 inches) to relieve neck fatigue. Open ventilation slots maximize airflow.',
    price: 2199,
    category: 'accessories',
    brand: 'AeroDesk',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1616353071855-2c045c4458ae?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    numReviews: 64,
    isFeatured: false
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexisstore';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB Atlas / Local instance.');

    if (process.argv.includes('--destroy')) {
      await User.deleteMany();
      await Product.deleteMany();
      await Order.deleteMany();
      console.log('[Seed] Database cleared successfully.');
      process.exit(0);
    }

    // Clean existing products and create seed records
    await Product.deleteMany();
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`[Seed] Seeded ${createdProducts.length} sample products.`);

    // Check or create admin user
    const existingAdmin = await User.findOne({ email: 'admin@nexisstore.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Nexis Admin',
        email: 'admin@nexisstore.com',
        password: 'Admin@123456',
        role: 'admin',
        address: {
          street: '101 Cyber Heights',
          city: 'Lucknow',
          state: 'Uttar Pradesh',
          postalCode: '226001',
          country: 'India'
        }
      });
      console.log('[Seed] Created default Administrator account (admin@nexisstore.com)');
    } else {
      console.log('[Seed] Administrator account already exists.');
    }

    // Check or create demo user
    const existingUser = await User.findOne({ email: 'suryansh@nexisstore.com' });
    if (!existingUser) {
      await User.create({
        name: 'Suryansh Singh',
        email: 'suryansh@nexisstore.com',
        password: 'User@123456',
        role: 'user',
        address: {
          street: '42 Gomti Nagar',
          city: 'Lucknow',
          state: 'Uttar Pradesh',
          postalCode: '226010',
          country: 'India'
        }
      });
      console.log('[Seed] Created demo Customer account (suryansh@nexisstore.com)');
    } else {
      console.log('[Seed] Customer account already exists.');
    }

    console.log('[Seed] All sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error]: ${error.message}`);
    process.exit(1);
  }
};

seedData();
