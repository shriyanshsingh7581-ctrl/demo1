import { Product, StoreSettings, Review } from '../types';

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: "Charlie Mobile & Accessories",
  tagline: "Jaipur's Trusted Destination for 100% Genuine Smartphones & Gadgets",
  phone: "+91 98290 12345",
  whatsapp: "919829012345",
  email: "support@charliemobile.online",
  address: "Shop No. 14, Indira Bazar Road, Near MI Road",
  city: "Jaipur",
  state: "Rajasthan",
  pincode: "302001",
  openingHours: "Mon - Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 8:00 PM",
  announcementText: "⚡ Festive Smartphone Savings: Up to ₹12,000 Verified Exchange Bonus + Free Express Delivery in Jaipur!",
  freeShippingThreshold: 999,
  enableCod: true,
  enableExchange: true,
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "cm-iphone-16-pro",
    name: "Apple iPhone 16 Pro (Natural Titanium)",
    brand: "Apple",
    category: "iPhones",
    price: 119900,
    mrp: 129900,
    discountPercentage: 8,
    storage: "128GB",
    ram: "8GB",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Features grade 5 titanium design with new Camera Control, 48MP Fusion camera with 5x Telephoto, and the A18 Pro chip. Incredible battery life with iOS 18.",
    colors: [
      { name: "Natural Titanium", hex: "#9E9A93" },
      { name: "Desert Titanium", hex: "#C7B299" },
      { name: "White Titanium", hex: "#E8E7E3" },
      { name: "Black Titanium", hex: "#3C3B37" }
    ],
    variants: [
      { storage: "128GB", ram: "8GB", price: 119900, mrp: 129900 },
      { storage: "256GB", ram: "8GB", price: 129900, mrp: 139900 },
      { storage: "512GB", ram: "8GB", price: 149900, mrp: 159900 }
    ],
    inStock: true,
    stockCount: 14,
    isBestSeller: true,
    isLatest: true,
    rating: 4.9,
    reviewCount: 38,
    specifications: {
      "Display": "6.3-inch Super Retina XDR OLED, 120Hz ProMotion",
      "Processor": "Apple A18 Pro Chip (3nm)",
      "Rear Camera": "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto",
      "Front Camera": "12MP TrueDepth with Autofocus",
      "Battery": "Up to 27 hours video playback, MagSafe Fast Charging",
      "Operating System": "iOS 18 with Apple Intelligence",
      "Build": "Grade 5 Titanium frame with Ceramic Shield front"
    },
    warranty: "1 Year Official Apple India Manufacturer Warranty",
    emiStartsFrom: 5800
  },
  {
    id: "cm-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 5G (Titanium Gray)",
    brand: "Samsung",
    category: "Samsung Galaxy",
    price: 129999,
    mrp: 134999,
    discountPercentage: 4,
    storage: "256GB",
    ram: "12GB",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Welcome to the era of mobile AI with Galaxy AI. 200MP camera with revolutionary Nightography zoom, embedded S Pen, and Snapdragon 8 Gen 3 for Galaxy.",
    colors: [
      { name: "Titanium Gray", hex: "#63676A" },
      { name: "Titanium Black", hex: "#2B2B2B" },
      { name: "Titanium Violet", hex: "#4B4453" }
    ],
    variants: [
      { storage: "256GB", ram: "12GB", price: 129999, mrp: 134999 },
      { storage: "512GB", ram: "12GB", price: 139999, mrp: 144999 }
    ],
    inStock: true,
    stockCount: 8,
    isBestSeller: true,
    isTrending: true,
    rating: 4.8,
    reviewCount: 42,
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X, QHD+, 120Hz, 2600 nits",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "Rear Camera": "200MP + 50MP (5x Periscope) + 12MP Ultra-wide + 10MP (3x)",
      "Front Camera": "12MP Dual Pixel AF",
      "Battery": "5000mAh with 45W Fast Charging",
      "S Pen": "Included in body with Bluetooth integration",
      "OS": "One UI 6.1 with 7 years of OS & security updates"
    },
    warranty: "1 Year Official Samsung India Brand Warranty",
    emiStartsFrom: 6250
  },
  {
    id: "cm-oneplus-12",
    name: "OnePlus 12 5G (Silky Black)",
    brand: "OnePlus",
    category: "Smartphones",
    price: 64999,
    mrp: 69999,
    discountPercentage: 7,
    storage: "256GB",
    ram: "12GB",
    images: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "4th Gen Hasselblad Camera system, 2K 120Hz ProXDR display, Snapdragon 8 Gen 3, and lightning-fast 100W SUPERVOOC charging with 5400mAh battery.",
    colors: [
      { name: "Silky Black", hex: "#1F1F1F" },
      { name: "Flowy Emerald", hex: "#224A43" }
    ],
    variants: [
      { storage: "256GB", ram: "12GB", price: 64999, mrp: 69999 },
      { storage: "512GB", ram: "16GB", price: 69999, mrp: 74999 }
    ],
    inStock: true,
    stockCount: 11,
    isTrending: true,
    isBestDeal: true,
    rating: 4.7,
    reviewCount: 29,
    specifications: {
      "Display": "6.82-inch 2K 120Hz ProXDR Display with Aqua Touch",
      "Processor": "Qualcomm Snapdragon 8 Gen 3",
      "Rear Camera": "50MP Sony LYT-808 + 64MP 3X Periscope + 48MP Ultra-wide",
      "Charging": "100W SUPERVOOC wired + 50W AIRVOOC wireless",
      "Battery": "5400 mAh Dual-cell battery"
    },
    warranty: "1 Year Official OnePlus Manufacturer Warranty",
    emiStartsFrom: 3100
  },
  {
    id: "cm-nothing-phone-2a",
    name: "Nothing Phone (2a) 5G (Black)",
    brand: "Nothing",
    category: "Android Phones",
    price: 23999,
    mrp: 25999,
    discountPercentage: 8,
    storage: "128GB",
    ram: "8GB",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Iconic transparent industrial design with the Glyph Interface, custom MediaTek Dimensity 7200 Pro chipset, and dual 50MP studio cameras.",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#F3F3F3" },
      { name: "Special Blue", hex: "#1E3A8A" }
    ],
    variants: [
      { storage: "128GB", ram: "8GB", price: 23999, mrp: 25999 },
      { storage: "256GB", ram: "8GB", price: 25999, mrp: 27999 },
      { storage: "256GB", ram: "12GB", price: 27999, mrp: 29999 }
    ],
    inStock: true,
    stockCount: 16,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.6,
    reviewCount: 31,
    specifications: {
      "Display": "6.7-inch Flexible AMOLED, 120Hz, 1300 nits peak",
      "Processor": "Dimensity 7200 Pro 5G (4nm)",
      "Rear Camera": "50MP Main (OIS) + 50MP Ultra-wide 114°",
      "Front Camera": "32MP Punch Hole",
      "Battery": "5000mAh with 45W charging"
    },
    warranty: "1 Year Official Nothing Brand Warranty",
    emiStartsFrom: 1150
  },
  {
    id: "cm-vivo-v40-pro",
    name: "Vivo V40 Pro 5G (Ganges Blue)",
    brand: "Vivo",
    category: "Smartphones",
    price: 49999,
    mrp: 54999,
    discountPercentage: 9,
    storage: "256GB",
    ram: "8GB",
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "ZEISS Professional Portrait Camera with 50MP multifocal portrait system, 5500mAh BlueVolt ultra-slim battery, and Dimensity 9200+ flagship processor.",
    colors: [
      { name: "Ganges Blue", hex: "#2E5B88" },
      { name: "Titanium Gray", hex: "#4A4D52" }
    ],
    variants: [
      { storage: "256GB", ram: "8GB", price: 49999, mrp: 54999 },
      { storage: "512GB", ram: "12GB", price: 55999, mrp: 60999 }
    ],
    inStock: true,
    stockCount: 7,
    isLatest: true,
    rating: 4.7,
    reviewCount: 18,
    specifications: {
      "Display": "6.78-inch 1.5K 120Hz 3D Curved AMOLED, 4500 nits",
      "Processor": "MediaTek Dimensity 9200+ (4nm)",
      "Camera": "ZEISS 50MP Main (Sony IMX921) + 50MP Telephoto + 50MP Ultra-wide",
      "Battery": "5500mAh with 80W FlashCharge",
      "Protection": "IP68 & IP69 Dust and Water Resistance"
    },
    warranty: "1 Year Official Vivo Brand Warranty",
    emiStartsFrom: 2400
  },
  {
    id: "cm-redmi-note-13-pro-plus",
    name: "Redmi Note 13 Pro+ 5G (Fusion Purple)",
    brand: "Redmi",
    category: "Android Phones",
    price: 31999,
    mrp: 35999,
    discountPercentage: 11,
    storage: "256GB",
    ram: "8GB",
    images: [
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Supernote experience with 200MP OIS camera, 3D curved 1.5K AMOLED display, IP68 rating, and insane 120W HyperCharge.",
    colors: [
      { name: "Fusion Purple", hex: "#9370DB" },
      { name: "Fusion Black", hex: "#1A1A1A" },
      { name: "Fusion White", hex: "#F8F8F8" }
    ],
    variants: [
      { storage: "256GB", ram: "8GB", price: 31999, mrp: 35999 },
      { storage: "512GB", ram: "12GB", price: 35999, mrp: 39999 }
    ],
    inStock: true,
    stockCount: 15,
    isBestDeal: true,
    rating: 4.6,
    reviewCount: 47,
    specifications: {
      "Display": "6.67-inch Curved 1.5K AMOLED, 120Hz, Dolby Vision",
      "Processor": "MediaTek Dimensity 7200-Ultra (4nm)",
      "Camera": "200MP Samsung ISOCELL HP3 with OIS + 8MP + 2MP",
      "Charging": "120W HyperCharge (0 to 100% in 19 mins)",
      "Battery": "5000mAh"
    },
    warranty: "1 Year Official Xiaomi / Redmi Brand Warranty",
    emiStartsFrom: 1550
  },
  {
    id: "cm-apple-watch-s10",
    name: "Apple Watch Series 10 GPS 46mm",
    brand: "Apple",
    category: "Smartwatches",
    price: 49900,
    mrp: 52900,
    discountPercentage: 6,
    storage: "64GB",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Thinnest Apple Watch ever with the biggest display. Advanced health sensors, sleep apnea notifications, faster charging, and depth gauge.",
    colors: [
      { name: "Jet Black", hex: "#0A0A0A" },
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Silver", hex: "#E5E5E5" }
    ],
    inStock: true,
    stockCount: 9,
    isLatest: true,
    rating: 4.9,
    reviewCount: 22,
    specifications: {
      "Display": "Wide-angle OLED Always-On Retina display",
      "Sensors": "ECG, Blood Oxygen, Temperature sensing, Sleep Apnea",
      "Water Resistance": "50m swimproof, WR50",
      "Battery": "All-day 18 hours, 0-80% charge in 30 minutes"
    },
    warranty: "1 Year Official Apple India Brand Warranty",
    emiStartsFrom: 2400
  },
  {
    id: "cm-galaxy-watch-ultra",
    name: "Samsung Galaxy Watch Ultra LTE 47mm",
    brand: "Samsung",
    category: "Smartwatches",
    price: 59999,
    mrp: 64999,
    discountPercentage: 8,
    storage: "32GB",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Cushion titanium design engineered for extreme conditions. Dual-frequency GPS, multi-sport tracking, emergency siren, and up to 100h battery life.",
    colors: [
      { name: "Titanium Gray", hex: "#3E4349" },
      { name: "Titanium White", hex: "#EDEDED" },
      { name: "Titanium Silver", hex: "#A8A9AD" }
    ],
    inStock: true,
    stockCount: 6,
    isTrending: true,
    rating: 4.8,
    reviewCount: 15,
    specifications: {
      "Case": "Aerospace-grade Grade 4 Titanium",
      "Durability": "10 ATM + IP68, MIL-STD-810H certified",
      "Battery": "Up to 100 hours in Power Saving mode",
      "Connectivity": "Embedded eSIM LTE 4G + Bluetooth 5.3"
    },
    warranty: "1 Year Official Samsung India Brand Warranty",
    emiStartsFrom: 2890
  },
  {
    id: "cm-ipad-air-m2",
    name: "Apple iPad Air 11-inch M2 Chip (Wi-Fi)",
    brand: "Apple",
    category: "Tablets",
    price: 59900,
    mrp: 62900,
    discountPercentage: 5,
    storage: "128GB",
    ram: "8GB",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Redesigned with the supercharged Apple M2 chip. Stunning Liquid Retina display, landscape 12MP front camera with Center Stage, and Apple Pencil Pro support.",
    colors: [
      { name: "Space Gray", hex: "#535150" },
      { name: "Starlight", hex: "#E2DCD2" },
      { name: "Blue", hex: "#A3B7C2" },
      { name: "Purple", hex: "#C8BED6" }
    ],
    variants: [
      { storage: "128GB", ram: "8GB", price: 59900, mrp: 62900 },
      { storage: "256GB", ram: "8GB", price: 69900, mrp: 72900 }
    ],
    inStock: true,
    stockCount: 10,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 26,
    specifications: {
      "Display": "11-inch Liquid Retina with True Tone & P3 wide color",
      "Processor": "Apple M2 8-core CPU with 10-core GPU",
      "Accessories Support": "Apple Pencil Pro and Magic Keyboard",
      "Audio": "Landscape stereo speakers"
    },
    warranty: "1 Year Official Apple India Brand Warranty",
    emiStartsFrom: 2890
  },
  {
    id: "cm-airpods-pro-2",
    name: "Apple AirPods Pro (2nd Gen) with USB-C",
    brand: "Apple",
    category: "Earbuds",
    price: 21990,
    mrp: 24900,
    discountPercentage: 12,
    storage: "Standard",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Up to 2x more Active Noise Cancellation, Transparency mode, Adaptive Audio, and Personalized Spatial Audio with dynamic head tracking. MagSafe Case (USB-C).",
    colors: [
      { name: "White", hex: "#FFFFFF" }
    ],
    inStock: true,
    stockCount: 25,
    isBestSeller: true,
    isBestDeal: true,
    rating: 4.9,
    reviewCount: 64,
    specifications: {
      "Chip": "Apple H2 headphone chip in buds, U1 in case",
      "Noise Cancellation": "Pro-level Active Noise Cancellation with Adaptive Audio",
      "Battery Life": "Up to 6 hours listening time, 30 hours with case",
      "Charging": "MagSafe, Apple Watch charger, Qi, or USB-C"
    },
    warranty: "1 Year Official Apple India Brand Warranty",
    emiStartsFrom: 1050
  },
  {
    id: "cm-galaxy-buds3-pro",
    name: "Samsung Galaxy Buds3 Pro (Silver)",
    brand: "Samsung",
    category: "Earbuds",
    price: 18999,
    mrp: 21999,
    discountPercentage: 14,
    storage: "Standard",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Blade design with Blade Lights, Hi-Fi sound with 2-way woofer and planar tweeter, enhanced ANC with Galaxy AI sound optimization.",
    colors: [
      { name: "Silver", hex: "#B8B8B8" },
      { name: "White", hex: "#FAFAFA" }
    ],
    inStock: true,
    stockCount: 18,
    isLatest: true,
    rating: 4.7,
    reviewCount: 19,
    specifications: {
      "Sound": "24-bit / 96kHz Hi-Fi audio streaming",
      "ANC": "Adaptive Noise Control & Ambient Sound",
      "Battery": "Up to 30 hours total playback",
      "Water Resistance": "IP57 rated for dust and water"
    },
    warranty: "1 Year Official Samsung India Brand Warranty",
    emiStartsFrom: 920
  },
  {
    id: "cm-oneplus-bullets-z2-anc",
    name: "OnePlus Bullets Wireless Z2 ANC (Acoustic Red)",
    brand: "OnePlus",
    category: "Neckbands",
    price: 1999,
    mrp: 2499,
    discountPercentage: 20,
    storage: "Standard",
    images: [
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Hybrid 45dB Active Noise Cancellation, 12.4mm dynamic drivers with titanium coating, fast charging 10 mins for 20 hours playback.",
    colors: [
      { name: "Acoustic Red", hex: "#D62828" },
      { name: "Grand Green", hex: "#1F4E38" },
      { name: "Magico Black", hex: "#191919" }
    ],
    inStock: true,
    stockCount: 40,
    isBestSeller: true,
    rating: 4.6,
    reviewCount: 88,
    specifications: {
      "Drivers": "12.4mm Dynamic Drivers with Titanium Coating",
      "Noise Cancellation": "45dB Hybrid Active Noise Cancellation",
      "Battery": "Up to 28 hours playtime",
      "Fast Charge": "10 minutes charge gives 20 hours music"
    },
    warranty: "1 Year Official OnePlus Brand Warranty"
  },
  {
    id: "cm-jbl-flip-6",
    name: "JBL Flip 6 Portable Waterproof Bluetooth Speaker",
    brand: "Redmi",
    category: "Bluetooth Speakers",
    price: 9999,
    mrp: 13999,
    discountPercentage: 28,
    storage: "Standard",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Bold sound for every adventure. 2-way speaker system with racetrack-shaped woofer, separate tweeter, IP67 waterproof and dustproof.",
    colors: [
      { name: "Squad Camo", hex: "#5C6B5E" },
      { name: "Midnight Black", hex: "#1F1F1F" },
      { name: "Ocean Blue", hex: "#1E3A8A" }
    ],
    inStock: true,
    stockCount: 15,
    isTrending: true,
    isBestDeal: true,
    rating: 4.8,
    reviewCount: 53,
    specifications: {
      "Output": "30W RMS (20W woofer + 10W tweeter)",
      "Battery": "Up to 12 hours playtime",
      "Durability": "IP67 waterproof and dustproof",
      "PartyBoost": "Pair multiple JBL PartyBoost-compatible speakers"
    },
    warranty: "1 Year Official Harman JBL India Brand Warranty",
    emiStartsFrom: 490
  },
  {
    id: "cm-anker-65w-gan-charger",
    name: "Anker Prime 67W GaN Fast Wall Charger (3-Port)",
    brand: "Realme",
    category: "Chargers and Cables",
    price: 3499,
    mrp: 4999,
    discountPercentage: 30,
    storage: "Standard",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "GaN technology powered 67W fast charging. 2x USB-C ports and 1x USB-A port with ActiveShield 2.0 temperature protection for iPhones, MacBooks, and Galaxy phones.",
    colors: [
      { name: "Space Gray", hex: "#4B4E54" },
      { name: "White", hex: "#F5F5F5" }
    ],
    inStock: true,
    stockCount: 32,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 39,
    specifications: {
      "Output": "67W Max High-Speed Fast Charging",
      "Ports": "2 x USB-C (PD 3.0), 1 x USB-A (PowerIQ)",
      "Tech": "GaNPrime with ActiveShield 2.0 Real-time Safety",
      "Compatibility": "iPhones, Samsung Galaxy, OnePlus, iPads, Laptops"
    },
    warranty: "18 Months Official Brand Replacement Warranty"
  },
  {
    id: "cm-spigen-tough-armor-case",
    name: "Spigen Tough Armor Heavy Duty Magnetic Case",
    brand: "Apple",
    category: "Mobile Accessories",
    price: 1999,
    mrp: 2999,
    discountPercentage: 33,
    storage: "Standard",
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Mil-grade certified drop protection with Air Cushion Technology. Built-in kickstand for hands-free viewing and reinforced MagSafe magnetic ring.",
    colors: [
      { name: "Gunmetal", hex: "#3A3D40" },
      { name: "Abyss Blue", hex: "#1C2D42" },
      { name: "Metal Slate", hex: "#434B56" }
    ],
    inStock: true,
    stockCount: 50,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 71,
    specifications: {
      "Material": "Polycarbonate + TPU shock-absorbing layer",
      "Protection": "Mil-grade drop tested with Air Cushion Technology",
      "Features": "Reinforced kickstand & MagSafe ring"
    },
    warranty: "6 Months Official Spigen India Replacement Warranty"
  },
  {
    id: "cm-itel-it5330-feature-phone",
    name: "Itel MagicX Pro 4G Keypad Feature Phone with Hotspot",
    brand: "Itel",
    category: "Feature Phones",
    price: 2499,
    mrp: 2999,
    discountPercentage: 17,
    storage: "4GB",
    images: [
      "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "4G VoLTE dual SIM keypad phone with Wi-Fi hotspot sharing up to 8 devices. Ultra-loud 3D stereo speaker and 2500mAh King Voice battery.",
    colors: [
      { name: "Black", hex: "#1C1C1C" },
      { name: "Blue", hex: "#154360" }
    ],
    inStock: true,
    stockCount: 28,
    rating: 4.4,
    reviewCount: 33,
    specifications: {
      "Network": "4G VoLTE High Definition Calling on Jio/Airtel/Vi",
      "Hotspot": "Wi-Fi Hotspot sharing for up to 8 devices",
      "Battery": "2500mAh with King Voice speech assistant",
      "Display": "2.4-inch QVGA Bright Display"
    },
    warranty: "1 Year Official Itel Brand Warranty with 100 Days Replacement"
  },
  {
    id: "cm-moto-edge-50-pro",
    name: "Motorola Edge 50 Pro 5G (Luxe Lavender)",
    brand: "Motorola",
    category: "Smartphones",
    price: 31999,
    mrp: 36999,
    discountPercentage: 13,
    storage: "256GB",
    ram: "12GB",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Pantone Validated 1.5K 144Hz curved display, 50MP AI camera system with telephoto, 125W TurboPower charging, and IP68 waterproof vegan leather design.",
    colors: [
      { name: "Luxe Lavender", hex: "#9B8AB0" },
      { name: "Black Beauty", hex: "#1D1D1D" }
    ],
    variants: [
      { storage: "256GB", ram: "8GB", price: 29999, mrp: 34999 },
      { storage: "256GB", ram: "12GB", price: 31999, mrp: 36999 }
    ],
    inStock: true,
    stockCount: 12,
    isTrending: true,
    rating: 4.7,
    reviewCount: 25,
    specifications: {
      "Display": "6.7-inch 1.5K 144Hz True Color pOLED",
      "Processor": "Snapdragon 7 Gen 3",
      "Camera": "50MP (f/1.4 OIS) + 13MP Ultra-wide + 10MP 3x Telephoto",
      "Charging": "125W TurboPower Wired + 50W Wireless"
    },
    warranty: "1 Year Official Motorola India Brand Warranty",
    emiStartsFrom: 1550
  },
  {
    id: "cm-iqoo-12-5g",
    name: "iQOO 12 5G (Legend White BMW Edition)",
    brand: "iQOO",
    category: "Smartphones",
    price: 52999,
    mrp: 59999,
    discountPercentage: 11,
    storage: "256GB",
    ram: "12GB",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Snapdragon 8 Gen 3 with custom Supercomputing Chip Q1 for 144FPS gaming. 64MP 3x Periscope Telephoto with 100x digital zoom and 120W FlashCharge.",
    colors: [
      { name: "Legend White", hex: "#F4F4F6" },
      { name: "Alpha Black", hex: "#1A1A1A" }
    ],
    variants: [
      { storage: "256GB", ram: "12GB", price: 52999, mrp: 59999 },
      { storage: "512GB", ram: "16GB", price: 57999, mrp: 64999 }
    ],
    inStock: true,
    stockCount: 8,
    isLatest: true,
    rating: 4.8,
    reviewCount: 28,
    specifications: {
      "Processor": "Snapdragon 8 Gen 3 + Q1 Dedicated Display Chip",
      "Display": "6.78-inch 1.5K 144Hz LTPO AMOLED, 3000 nits",
      "Camera": "50MP 1/1.3\" Main + 64MP 3x Periscope + 50MP Ultra-wide",
      "Battery": "5000mAh with 120W FlashCharge"
    },
    warranty: "1 Year Official iQOO / Vivo India Brand Warranty",
    emiStartsFrom: 2550
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productName: "Apple iPhone 16 Pro (Natural Titanium)",
    customerName: "Vikram Rathore",
    customerCity: "Jaipur, Rajasthan",
    rating: 5,
    date: "12 Oct 2024",
    reviewText: "Purchased the iPhone 16 Pro from Charlie Mobile store near MI Road. Completely genuine sealed Indian unit with GST bill and brand warranty. Delivered within 3 hours at Mansarovar! Excellent service.",
    verifiedPurchase: true,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-2",
    productName: "Samsung Galaxy S24 Ultra 5G",
    customerName: "Pooja Sharma",
    customerCity: "Jaipur, Rajasthan",
    rating: 5,
    date: "28 Sep 2024",
    reviewText: "Exchanged my old Galaxy S21 with Charlie Mobile's exchange program. Got the highest valuation in town and smooth data transfer assistance right in the store. Highly recommended!",
    verifiedPurchase: true,
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-3",
    productName: "Nothing Phone (2a) 5G",
    customerName: "Aman Gupta",
    customerCity: "Ajmer, Rajasthan",
    rating: 5,
    date: "05 Nov 2024",
    reviewText: "Ordered online to Ajmer. Received within 2 days with safe packaging. 100% original phone with valid warranty on Nothing service center. Great prices and prompt WhatsApp support.",
    verifiedPurchase: true,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-4",
    productName: "Anker Prime 67W GaN Fast Wall Charger",
    customerName: "Deepak Meena",
    customerCity: "Jaipur, Rajasthan",
    rating: 5,
    date: "18 Oct 2024",
    reviewText: "Best charger for my MacBook and iPhone. Compact, doesn't heat up at all. Charlie Mobile has original accessories that you usually can't find locally.",
    verifiedPurchase: true,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

export const INITIAL_FAQS = [
  {
    question: "Are all products sold by Charlie Mobile & Accessories 100% genuine?",
    answer: "Yes, absolutely. We source all smartphones, smartwatches, and accessories directly from brand-authorized distributors. Every unit is brand new, sealed in original box packaging with official serial/IMEI numbers, and backed by manufacturer brand warranty across authorized service centers pan-India."
  },
  {
    question: "What payment methods are accepted at Charlie Mobile?",
    answer: "We accept all major payment methods including Cash on Delivery (COD) for eligible pincodes, UPI (Google Pay, PhonePe, Paytm, BHIM), Credit Cards, Debit Cards, Net Banking, and zero-cost No Cost EMI on eligible bank credit cards."
  },
  {
    question: "Is No Cost EMI available on smartphones and gadgets?",
    answer: "Yes, verified No Cost EMI options are available on leading credit cards (HDFC, ICICI, SBI, Axis, Kotak, American Express) for 3, 6, 9, and 12-month tenures on eligible smartphones and electronics."
  },
  {
    question: "What brand warranty is provided with my purchase?",
    answer: "All smartphones come with 1 Year Official Manufacturer Warranty from Apple, Samsung, OnePlus, Vivo, etc. Accessories like chargers and earbuds carry 6 Months to 1 Year manufacturer warranty. Your official GST invoice serves as proof of purchase at any brand authorized service center."
  },
  {
    question: "How can I track my order once placed?",
    answer: "Once your order is confirmed, you will receive real-time updates via SMS and WhatsApp with an Order ID (e.g., #CM-12345). You can also click 'Track Order' in our website header anytime to view live dispatch, courier partner details, and expected delivery date."
  },
  {
    question: "How does the 'Upgrade Your Smartphone' exchange program work?",
    answer: "You can submit details of your old smartphone on our 'Sell / Exchange' section (Brand, Model, Storage, Screen & Battery condition). We calculate an instant estimated fair valuation range. You can then bring your device to our Jaipur store or request doorstep evaluation during new phone delivery."
  },
  {
    question: "What is your return and replacement policy?",
    answer: "We offer a 7-day replacement policy for any technical hardware defects or transit damages reported upon unboxing. For post-activation technical service, official manufacturer brand service centers provide free warranty repair/replacement."
  },
  {
    question: "How can I contact Charlie Mobile & Accessories directly?",
    answer: "You can call us directly at +91 98290 12345, message our team instantly via WhatsApp at +91 98290 12345, or visit our physical retail storefront at Shop No. 14, Indira Bazar Road, Near MI Road, Jaipur, Rajasthan."
  }
];

export const CATEGORY_LIST = [
  {
    id: "Smartphones",
    name: "Smartphones",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
    description: "Latest 5G flagship & budget smartphones"
  },
  {
    id: "iPhones",
    name: "iPhones",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80",
    description: "iPhone 16 series, 15 series & Pro models"
  },
  {
    id: "Samsung Galaxy",
    name: "Samsung Galaxy",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80",
    description: "Galaxy S24, Z Fold, Z Flip & A-Series"
  },
  {
    id: "Android Phones",
    name: "Android Phones",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80",
    description: "Top Android powerhouses from 5G brands"
  },
  {
    id: "Smartwatches",
    name: "Smartwatches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    description: "Apple Watch, Galaxy Watch & fitness bands"
  },
  {
    id: "Tablets",
    name: "Tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
    description: "Apple iPad, Samsung Galaxy Tab & productivity"
  },
  {
    id: "Earbuds",
    name: "Earbuds",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=400&q=80",
    description: "TWS Earbuds with ANC & Spatial Audio"
  },
  {
    id: "Neckbands",
    name: "Neckbands",
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=400&q=80",
    description: "Comfortable wireless neckbands with long battery"
  },
  {
    id: "Bluetooth Speakers",
    name: "Bluetooth Speakers",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80",
    description: "Waterproof portable party & desk speakers"
  },
  {
    id: "Mobile Accessories",
    name: "Mobile Accessories",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=400&q=80",
    description: "Tough cases, tempered glass & stands"
  },
  {
    id: "Chargers and Cables",
    name: "Chargers and Cables",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80",
    description: "GaN fast chargers, braided Type-C & lightning"
  },
  {
    id: "Feature Phones",
    name: "Feature Phones",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=400&q=80",
    description: "4G VoLTE keypad phones with long standby"
  }
];

export const BRAND_LIST = [
  { name: "Apple", logo: "🍎", tag: "iPhones & Wearables" },
  { name: "Samsung", logo: "🌌", tag: "Galaxy & Foldables" },
  { name: "OnePlus", logo: "⚡", tag: "Fast & Smooth" },
  { name: "Xiaomi", logo: "🟠", tag: "Flagship Innovation" },
  { name: "Redmi", logo: "🔴", tag: "Value Powerhouses" },
  { name: "Realme", logo: "🟡", tag: "Youth Trendsetters" },
  { name: "Vivo", logo: "🔵", tag: "ZEISS Portrait Masters" },
  { name: "OPPO", logo: "🟢", tag: "Design & Cameras" },
  { name: "Motorola", logo: "🦇", tag: "Clean Android & Edge" },
  { name: "iQOO", logo: "🏎️", tag: "High Performance Gaming" },
  { name: "Nothing", logo: "⚪", tag: "Glyph & Pure OS" },
  { name: "Itel", logo: "📱", tag: "Reliable 4G Feature Phones" }
];
