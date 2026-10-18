/**
 * ============================================================================
 * MINEMART OUTFIT ITEMS CATALOG (src/data/outfitItems.ts)
 * ============================================================================
 * 
 * This file contains the individual pieces that make up each complete outfit.
 * 
 * TO ADD A NEW PRODUCT ITEM TO AN OUTFIT:
 * 1. Find the `outfitId` of the look you want to connect it to (e.g. "outfit-001").
 * 2. Copy one of the item entries below and paste it into the `OUTFIT_ITEMS` array.
 * 3. Give it a unique `id` (e.g. "item-101"), name, photo URL, price, and affiliate `productUrl`.
 * 4. Save the file. When a visitor views that outfit, your new item will be right there with its "Shop Now" link!
 * ============================================================================
 */

import { OutfitItem } from '../types';

export const OUTFIT_ITEMS: OutfitItem[] = [
  // --------------------------------------------------------------------------
  // OUTFIT 001: Minimalist Pleated Silk Midi & Trench Look
  // --------------------------------------------------------------------------
  {
    id: 'item-001-1',
    outfitId: 'outfit-001',
    name: 'Pleated Mulberry Silk Midi Dress',
    image: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:best,f_jpg/cloudinary-tools-uploads/xdhjpixlg1ogend4kmmm',
    price: 220,
    originalPrice: 295,
    brand: 'MineMart Atelier Selection',
    productUrl: 'https://www.nordstrom.com/s/pleated-silk-midi-dress',
    categoryTag: 'Dress',
    description: 'Cut from pure 6A grade mulberry silk with micro-pleated skirt and fluid drape.',
  },
  {
    id: 'item-001-2',
    outfitId: 'outfit-001',
    name: 'Relaxed Water-Resistant Cotton Trench Coat',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    price: 285,
    originalPrice: 350,
    brand: 'Everlane Curated',
    productUrl: 'https://www.everlane.com/products/womens-drape-trench',
    categoryTag: 'Outerwear',
    description: 'Double-breasted timeless silhouette with storm flap and tortoiseshell buckle.',
  },
  {
    id: 'item-001-3',
    outfitId: 'outfit-001',
    name: 'Sculpted Top-Handle Saddle Crossbody Bag',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    price: 340,
    originalPrice: 425,
    brand: 'Nordstrom Designer',
    productUrl: 'https://www.nordstrom.com/s/curated-luxury-leather-bag',
    categoryTag: 'Bag',
    description: 'Vegetable-tanned Spanish leather with brushed gold turnlock closure.',
  },
  {
    id: 'item-001-4',
    outfitId: 'outfit-001',
    name: 'Minimal Strappy Leather Heeled Sandals',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    price: 160,
    originalPrice: 195,
    brand: 'Reformation Partner',
    productUrl: 'https://www.thereformation.com/shoes/minimal-sandals',
    categoryTag: 'Shoes',
    description: 'Barely-there delicate leather straps with comfortable 65mm block heel.',
  },

  // --------------------------------------------------------------------------
  // OUTFIT 002: Warm Beige Cashmere & Wide-Leg Linen Trouser Fit
  // --------------------------------------------------------------------------
  {
    id: 'item-002-1',
    outfitId: 'outfit-002',
    name: 'Oversized Cashmere-Merino Mock Neck Sweater',
    image: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:best,f_jpg/cloudinary-tools-uploads/xdhjpixlg1ogend4kmmm',
    price: 195,
    originalPrice: 260,
    brand: 'MatchesFashion',
    productUrl: 'https://www.matchesfashion.com/womens/clothing/knitwear',
    categoryTag: 'Top',
    description: 'Ultra-soft 7-gauge Mongolian cashmere knit in natural oatmeal tone.',
  },
  {
    id: 'item-002-2',
    outfitId: 'outfit-002',
    name: 'High-Rise Double Pleated Wide-Leg Trousers',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    price: 135,
    originalPrice: 175,
    brand: 'COS Partner',
    productUrl: 'https://www.cos.com/en_usd/women/trousers/wide-leg',
    categoryTag: 'Pants',
    description: 'Fluid wool-viscose blend with deep front pleats and fluid movement.',
  },
  {
    id: 'item-002-3',
    outfitId: 'outfit-002',
    name: 'Pointed Suede Mules in Warm Taupe',
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
    price: 145,
    brand: 'Farfetch Sourced',
    productUrl: 'https://www.farfetch.com/shopping/women/shoes-mules.aspx',
    categoryTag: 'Shoes',
    description: 'Slip-on Italian calf suede mules with cushioned leather insole.',
  },
  {
    id: 'item-002-4',
    outfitId: 'outfit-002',
    name: 'Pebbled Leather Slouchy Shoulder Hobo',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    price: 265,
    originalPrice: 320,
    brand: 'Madewell Affiliate',
    productUrl: 'https://www.madewell.com/womens/accessories/bags',
    categoryTag: 'Bag',
    description: 'Generous everyday leather bag with magnetic tab and interior zipped pouch.',

    
  },
   {
    id: 'item-002-5',
    outfitId: 'outfit-002',
    name: 'Pebbled Leather Slouchy Shoulder Hobo',
    image: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:best,f_jpg/cloudinary-tools-uploads/xdhjpixlg1ogend4kmmm',
    price: 265,
    originalPrice: 320,
    brand: 'Madewell Affiliate',
    productUrl: 'https://www.madewell.com/womens/accessories/bags',
    categoryTag: 'Bag',
    description: 'Generous everyday leather bag with magnetic tab and interior zipped pouch.',

    
  },

  // --------------------------------------------------------------------------
  // OUTFIT 003: Sculpted Linen Blazer & Slip Skirt Ensemble
  // --------------------------------------------------------------------------
  {
    id: 'item-003-1',
    outfitId: 'outfit-003',
    name: 'Sculpted Hourglass Linen-Blend Blazer',
    image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
    price: 210,
    originalPrice: 280,
    brand: 'Mango Verified',
    productUrl: 'https://shop.mango.com/us/women/blazers',
    categoryTag: 'Blazer',
    description: 'Tailored waistline, sharp peaked lapels, and horn button detail.',
  },
  {
    id: 'item-003-2',
    outfitId: 'outfit-003',
    name: 'Bias-Cut Silk Charmeuse Slip Skirt',
    image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
    price: 128,
    brand: 'Quince Affiliate',
    productUrl: 'https://www.quince.com/women/silk/silk-skirt',
    categoryTag: 'Skirt',
    description: '100% washable silk with an elastic waistband and flattering midi drape.',
  },
  {
    id: 'item-003-3',
    outfitId: 'outfit-003',
    name: '18k Gold Plated Link Chunky Necklace',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    price: 75,
    originalPrice: 95,
    brand: 'Mejuri Partner',
    productUrl: 'https://mejuri.com/shop/products/chunky-chain-necklace',
    categoryTag: 'Jewelry',
    description: 'Statement recycled brass paperclip chain with anti-tarnish coating.',
  },

  // --------------------------------------------------------------------------
  // OUTFIT 005: Unstructured Linen-Wool Blazer & Tailored Chino Set (Men)
  // --------------------------------------------------------------------------
  {
    id: 'item-005-1',
    outfitId: 'outfit-005',
    name: 'Unstructured Linen-Virgin Wool Blazer',
    image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
    price: 189,
    originalPrice: 249,
    brand: 'MineMart Atelier Selection',
    productUrl: 'https://www.nordstrom.com/s/mens-linen-wool-blazer',
    categoryTag: 'Jacket',
    description: 'Italian linen and virgin wool fabric, natural soft shoulder, patch pockets.',
  },
  {
    id: 'item-005-2',
    outfitId: 'outfit-005',
    name: 'Crisp Egyptian Cotton Poplin Dress Shirt',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    price: 79,
    originalPrice: 110,
    brand: 'J.Crew Verified',
    productUrl: 'https://www.jcrew.com/m/mens/categories/clothing/shirts',
    categoryTag: 'Shirt',
    description: 'Spread collar with mother-of-pearl buttons and tailored modern fit.',
  },
  {
    id: 'item-005-3',
    outfitId: 'outfit-005',
    name: 'Pleat-Front Olive Relaxed Tailored Chinos',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    price: 98,
    brand: 'Todd Snyder Partner',
    productUrl: 'https://www.toddsnyder.com/collections/pants',
    categoryTag: 'Pants',
    description: 'Garment-dyed stretch cotton twill with single forward pleats.',
  },
  {
    id: 'item-005-4',
    outfitId: 'outfit-005',
    name: 'Calfskin Minimal Low-Top Court Sneakers',
    image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
    price: 165,
    originalPrice: 195,
    brand: 'Studio Veloce',
    productUrl: 'https://www.nordstrom.com/s/mens-leather-sneakers',
    categoryTag: 'Shoes',
    description: 'Buttery full-grain calf leather upper and custom Margom rubber sole.',
  },

  // --------------------------------------------------------------------------
  // OUTFIT 006: Cashmere Knit Polo & Minimal Leather Sneakers Fit (Men)
  // --------------------------------------------------------------------------
  {
    id: 'item-006-1',
    outfitId: 'outfit-006',
    name: 'Ribbed Cashmere-Merino Johnny Collar Polo',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    price: 175,
    originalPrice: 220,
    brand: 'MatchesFashion Curated',
    productUrl: 'https://www.matchesfashion.com/mens/clothing/knitwear',
    categoryTag: 'Polo',
    description: 'Fine-gauge featherweight polo with buttonless open Johnny collar.',
  },
  {
    id: 'item-006-2',
    outfitId: 'outfit-006',
    name: 'Drawstring Tropical Wool Flannel Trousers',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    price: 145,
    brand: 'Suitsupply Partner',
    productUrl: 'https://suitsupply.com/en-us/men/trousers',
    categoryTag: 'Trousers',
    description: 'Pure Italian tropical wool with internal drawstring and elasticated back.',
  },
  {
    id: 'item-006-3',
    outfitId: 'outfit-006',
    name: 'Minimal Chronograph Watch with Brown Leather Strap',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    price: 185,
    originalPrice: 240,
    brand: 'Nordstrom Watch Collection',
    productUrl: 'https://www.nordstrom.com/s/mens-leather-watch',
    categoryTag: 'Watch',
    description: 'Sapphire crystal glass with Japanese quartz movement and Horween strap.',
  },

  // --------------------------------------------------------------------------
  // OUTFIT 008: Streetwear Oversized Graphic Hoodie & Parachute Pants
  // --------------------------------------------------------------------------
  {
    id: 'item-008-1',
    outfitId: 'outfit-008',
    name: 'Vintage Washed Heavyweight 450 GSM Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    price: 95,
    originalPrice: 130,
    brand: 'Farfetch Urban',
    productUrl: 'https://www.farfetch.com/shopping/men/hoodies-sweats.aspx',
    categoryTag: 'Hoodie',
    description: '100% French Terry custom vintage wash with boxy double-layered hood.',
  },
  {
    id: 'item-008-2',
    outfitId: 'outfit-008',
    name: 'Technical Multi-Pocket Parachute Cargo Pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    price: 88,
    brand: 'Urban Outfitters Affiliate',
    productUrl: 'https://www.urbanoutfitters.com/mens-cargos',
    categoryTag: 'Pants',
    description: 'Lightweight ripstop fabric with adjustable bungee ankle toggles.',
  },
  {
    id: 'item-008-3',
    outfitId: 'outfit-008',
    name: 'Chunky Retro Trail Runner Sneakers',
    image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
    price: 150,
    originalPrice: 190,
    brand: 'ASOS Partner Feed',
    productUrl: 'https://www.asos.com/us/men/shoes/sneakers',
    categoryTag: 'Shoes',
    description: 'Layered mesh and suede overlays with aggressive traction lug sole.',
  },
  {
    id: 'item-008-4',
    outfitId: 'outfit-008',
    name: 'Tactical Nylon Crossbody Sling Pack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    price: 52,
    brand: 'Nordstrom Sourced',
    productUrl: 'https://www.nordstrom.com/s/mens-crossbody-bag',
    categoryTag: 'Bag',
    description: 'Water-resistant Cordura nylon with quick-release magnetic buckle.',
  },

  // --------------------------------------------------------------------------
  // OUTFIT 013: Party Wear Emerald Satin Gown & Crystal Heels
  // --------------------------------------------------------------------------
  {
    id: 'item-013-1',
    outfitId: 'outfit-013',
    name: 'Asymmetrical Emerald Cowl Neck Silk Gown',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    price: 295,
    originalPrice: 380,
    brand: 'Reformation Partner',
    productUrl: 'https://www.thereformation.com/dresses/evening',
    categoryTag: 'Dress',
    description: 'Floor-skimming heavy silk charmeuse with deep thigh split and cowl back.',
  },
  {
    id: 'item-013-2',
    outfitId: 'outfit-013',
    name: 'Metallic Strappy Crystal Stiletto Heels',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    price: 185,
    originalPrice: 240,
    brand: 'Farfetch Luxury',
    productUrl: 'https://www.farfetch.com/shopping/women/shoes-heels.aspx',
    categoryTag: 'Shoes',
    description: 'Delicate crystal-encrusted straps on metallic silver mirror leather.',
  },
  {
    id: 'item-013-3',
    outfitId: 'outfit-013',
    name: 'Satin Knotted Minaudière Evening Clutch',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    price: 120,
    brand: 'Nordstrom Curated',
    productUrl: 'https://www.nordstrom.com/s/evening-clutch',
    categoryTag: 'Bag',
    description: 'Hard-case evening clutch wrapped in emerald satin with detachable chain.',
  },

  // --------------------------------------------------------------------------
  // OUTFIT 015: Ethnic Wear Chanderi Silk Kurta & Dupatta Set
  // --------------------------------------------------------------------------
  {
    id: 'item-015-1',
    outfitId: 'outfit-015',
    name: 'Handwoven Chanderi Zari Embroidered Anarkali',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    price: 195,
    originalPrice: 250,
    brand: 'Fabindia Affiliate',
    productUrl: 'https://www.fabindia.com/women-clothing/anarkali-sets',
    categoryTag: 'Kurta',
    description: 'Pure Chanderi silk with intricate gota patti hand embroidery and cotton lining.',
  },
  {
    id: 'item-015-2',
    outfitId: 'outfit-015',
    name: 'Tissue Zari Border Organza Dupatta',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    price: 65,
    brand: 'Artisanal Partner',
    productUrl: 'https://www.fabindia.com/dupattas',
    categoryTag: 'Dupatta',
    description: 'Airy gold sheen organza framed with scallop hand-embroidered borders.',
  },
  {
    id: 'item-015-3',
    outfitId: 'outfit-015',
    name: 'Kundan Chandelier Jhumka Earrings',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    price: 48,
    originalPrice: 65,
    brand: 'Curated Jewels',
    productUrl: 'https://www.nordstrom.com/s/kundan-earrings',
    categoryTag: 'Jewelry',
    description: 'Gold-plated brass with faux pearls and faceted glass kundan stones.',
  },
  {
    id: 'item-015-4',
    outfitId: 'outfit-015',
    name: 'Hand-Embroidered Raw Silk Mojari Juttis',
    image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
    price: 72,
    brand: 'Heritage Footwear',
    productUrl: 'https://www.nordstrom.com/s/ethnic-juttis',
    categoryTag: 'Shoes',
    description: 'Cushioned leather sole with dabka and sequin artisanal handwork.',
  },

  // --------------------------------------------------------------------------
  // OUTFIT 017: Shoes & Sneakers Look
  // --------------------------------------------------------------------------
  {
    id: 'item-017-1',
    outfitId: 'outfit-017',
    name: 'Minimal Full-Grain White Italian Leather Sneakers',
    image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
    price: 165,
    originalPrice: 195,
    brand: 'Studio Veloce',
    productUrl: 'https://www.nordstrom.com/s/mens-leather-sneakers',
    categoryTag: 'Shoes',
    description: 'Handcrafted in Marche with antimicrobial memory foam insoles.',
  },
  {
    id: 'item-017-2',
    outfitId: 'outfit-017',
    name: 'Japanese Selvedge Denim 14oz Raw Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    price: 140,
    originalPrice: 180,
    brand: 'Unbranded Brand Affiliate',
    productUrl: 'https://theunbrandedbrand.com/products/tapered-selvedge',
    categoryTag: 'Pants',
    description: 'Rope-dyed indigo selvedge denim woven on vintage shuttle looms.',
  },
  {
    id: 'item-017-3',
    outfitId: 'outfit-017',
    name: 'Heavyweight Ribbed Organic Cotton Crew Socks (3-Pack)',
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
    price: 28,
    brand: 'Bombas Partner',
    productUrl: 'https://bombas.com/products/mens-rib-crew',
    categoryTag: 'Accessories',
    description: 'Seamless toe finish with reinforced honeycomb arch support system.',
  },

  // --------------------------------------------------------------------------
  // OUTFIT 019: Spanish Saddle Bag & Gold Jewelry Look
  // --------------------------------------------------------------------------
  {
    id: 'item-019-1',
    outfitId: 'outfit-019',
    name: 'Spanish Vegetable-Tanned Leather Saddle Crossbody',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    price: 340,
    originalPrice: 425,
    brand: 'Nordstrom Designer Curations',
    productUrl: 'https://www.nordstrom.com/s/curated-luxury-leather-bag',
    categoryTag: 'Bag',
    description: 'Vegetable-tanned leather, brushed gold hardware, detachable strap.',
  },
  {
    id: 'item-019-2',
    outfitId: 'outfit-019',
    name: 'Chunky Paperclip Link 18k Vermeil Chain',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    price: 75,
    originalPrice: 95,
    brand: 'Mejuri Partner',
    productUrl: 'https://mejuri.com/shop/products/chunky-chain-necklace',
    categoryTag: 'Jewelry',
    description: 'Solid brass base heavily electroplated in 18k gold with anti-tarnish coat.',
  },
  {
    id: 'item-019-3',
    outfitId: 'outfit-019',
    name: 'Acetate Cat-Eye Sunglasses in Honey Tortoise',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    price: 95,
    originalPrice: 125,
    brand: 'Le Specs Affiliate',
    productUrl: 'https://lespecs.com/collections/sunglasses',
    categoryTag: 'Eyewear',
    description: 'Hand-polished Italian acetate frame with 100% UV400 protective polarized lenses.',
  },

  /*
   * --------------------------------------------------------------------------
   * 📋 EXAMPLE ITEM TEMPLATE (Copy & paste above to add a new item to an outfit):
   * --------------------------------------------------------------------------
   * {
   *   id: "item-099",
   *   outfitId: "outfit-001", // Match with Outfit.id
   *   name: "Classic Silk Scarf",
   *   image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80",
   *   price: 45,
   *   originalPrice: 60,
   *   brand: "Nordstrom Partner",
   *   productUrl: "https://www.nordstrom.com/s/silk-scarf",
   *   categoryTag: "Accessory",
   *   description: "Hand-rolled pure silk square with vintage botanical print.",
   * },
   */
];

/** Helper to get all items belonging to a specific outfit */
export function getItemsByOutfit(outfitId: string): OutfitItem[] {
  return OUTFIT_ITEMS.filter(
    (item) => item.outfitId.toLowerCase() === outfitId.toLowerCase()
  );
}

/** Helper to find a single item by its ID */
export function getItemById(id: string): OutfitItem | undefined {
  return OUTFIT_ITEMS.find((item) => item.id.toLowerCase() === id.toLowerCase());
}
