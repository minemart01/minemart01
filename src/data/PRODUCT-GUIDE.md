# MineMart Fashion — Beginner Product & Image Guide

Welcome! This guide explains how to add and edit products, images, and affiliate shopping links on your MineMart website without any programming knowledge.

---

## 1. Quick Overview: The Simple Numbering System

Every product and section on MineMart uses a simple number:
- **First number** = The **Section Number**
- **Second number** = The **Product Number** inside that section

### Examples:
- **`1.1`** = Section 1, Product 1
- **`1.2`** = Section 1, Product 2
- **`1.5`** = Section 1, Product 5
- **`2.1`** = Section 2, Product 1
- **`3.4`** = Section 3, Product 4
- **`5.10`** = Section 5, Product 10

> **Important — Store-Owner Internal Use Only:**
> These codes (`1.1`, `2.1`, `Section 1`) are purely for you as the store owner to easily manage files and products.
> They are **100% hidden from your website visitors**. Customers only see real product titles, fashion images, prices, and direct "Shop Now" buttons.

---

## 2. Which Files Should You Edit?

All your products are organized inside the folder:
📁 `src/data/my-products/`

| Section | File to Open | Collection Name |
| :--- | :--- | :--- |
| **Section 1** | `src/data/my-products/section-1.ts` | **Aesthetic Women** (Products 1.1, 1.2, 1.3...) |
| **Section 2** | `src/data/my-products/section-2.ts` | **Men's Fashion** (Products 2.1, 2.2, 2.3...) |
| **Section 3** | `src/data/my-products/section-3.ts` | **Streetwear** (Products 3.1, 3.2, 3.3...) |
| **Section 4** | `src/data/my-products/section-4.ts` | **Casual Outfits** (Products 4.1, 4.2...) |
| **Section 5** | `src/data/my-products/section-5.ts` | **Party Wear** (Products 5.1, 5.2...) |
| **Section 6** | `src/data/my-products/section-6.ts` | **Ethnic Wear** (Products 6.1, 6.2...) |
| **Section 7** | `src/data/my-products/section-7.ts` | **Shoes & Footwear** (Products 7.1, 7.2...) |
| **Section 8** | `src/data/my-products/section-8.ts` | **Bags & Accessories** (Products 8.1, 8.2...) |

### ⚠️ Files You Should NOT Touch:
You never need to touch website design files like `App.tsx`, `HomePage.tsx`, `CategoryPage.tsx`, or `ProductCard.tsx`. When you edit a section file, your website updates automatically.

---

## 3. Where to Paste Your Image Link and Shopping Link

Each product has a very simple format:

```typescript
{
  id: "1.5",
  title: "Black Oversized T-Shirt",
  image: "PASTE_YOUR_IMAGE_LINK_HERE",
  productUrl: "PASTE_YOUR_AFFILIATE_SHOPPING_LINK_HERE",
  price: "₹799"
}
```

- **`image`**: Paste the direct web link to the photo (e.g. `https://images.unsplash.com/...` or an online image link). If you have an image file on your computer, you can also place it in the `public/` folder and write `/my-image.jpg`.
- **`productUrl`**: Paste the affiliate or retailer shopping link where people should go when they click **"Shop Now"**.
- **`price`**: Optional. You can write `"₹799"`, `"₹1,499"`, `"$45"`, or leave it blank.

---

## 4. How to Add a New Product to Section 1 (Step-by-Step)

Let's say you want to add **Product 1.5** to **Section 1**:

1. Open `src/data/my-products/section-1.ts`.
2. Scroll to the bottom of the `SECTION_1_PRODUCTS = [` list.
3. Add a comma `,` after the last product.
4. Copy and paste this block:

```typescript
  {
    id: "1.5",
    title: "Casual White Linen Shirt",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
    productUrl: "https://www.nordstrom.com/s/linen-shirt",
    price: "₹1,299",
    description: "Breathable relaxed fit shirt for everyday wear."
  },
```

5. Save the file.
6. Look at your website — Product 1.5 will now appear inside Section 1!

---

## 5. How to Add Individual Shirt, Pants, Shoes, and Bag Links to an Outfit

MineMart lets visitors click an outfit to see all the individual pieces that make up that look.

To add individual items (Shirt, Pants, Shoes, Bag) to an outfit, simply add an `items: [...]` list inside the outfit:

```typescript
  {
    id: "1.5",
    title: "Complete Minimalist Summer Look",
    image: "https://example.com/full-outfit-photo.jpg",
    price: "₹4,999",
    description: "A breezy linen look styled with tailored trousers and leather slides.",
    items: [
      {
        name: "Breezy White Linen Shirt",
        image: "https://example.com/shirt-photo.jpg",
        price: "₹1,299",
        productUrl: "https://partner-store.com/white-linen-shirt",
        categoryTag: "Shirt"
      },
      {
        name: "Pleated Beige Trousers",
        image: "https://example.com/pants-photo.jpg",
        price: "₹1,899",
        productUrl: "https://partner-store.com/beige-trousers",
        categoryTag: "Pants"
      },
      {
        name: "Leather Slingback Sandals",
        image: "https://example.com/shoes-photo.jpg",
        price: "₹1,499",
        productUrl: "https://partner-store.com/leather-sandals",
        categoryTag: "Shoes"
      },
      {
        name: "Woven Straw Crossbody Bag",
        image: "https://example.com/bag-photo.jpg",
        price: "₹999",
        productUrl: "https://partner-store.com/crossbody-bag",
        categoryTag: "Bag"
      }
    ]
  },
```

When a visitor clicks on Outfit `1.5`:
- They see the main outfit photo.
- They see all 4 pieces (Shirt, Pants, Shoes, Bag) with their photos and prices.
- Clicking **"Shop Now"** on any piece takes them directly to that item's exact shopping link!

---

## 6. How to Show a Product on Homepage "Trending" or "New Arrivals"

If you want a product to also show up in the special carousels on the homepage, just add one of these simple switches:

- `isTrending: true` → Product appears in **Trending Looks of the Week**
- `isNewArrival: true` → Product appears in **Fresh Releases & New Arrivals**
- `isPopular: true` → Product appears in **Popular Outfit Combinations**

### Example:
```typescript
{
  id: "2.4",
  title: "Navy Linen Overshirt",
  image: "https://...",
  productUrl: "https://...",
  price: "₹1,999",
  isTrending: true
}
```

---

## 7. How to Add a Whole New Section in the Future

If you want to create a new Section 9:
1. Create a new file: `src/data/my-products/section-9.ts`.
2. Copy the contents of `section-8.ts` into it.
3. Change `sectionNumber: 9`, give it a new name (e.g. `Vintage Fashion`), and add products numbered `9.1`, `9.2`, `9.3`, etc.
4. In `src/data/my-products/index.ts`, add:
   ```typescript
   import { SECTION_9_INFO, SECTION_9_PRODUCTS } from './section-9';
   ```
   and add `{ info: SECTION_9_INFO, products: SECTION_9_PRODUCTS }` to the `ALL_SECTION_BUNDLES` list.

---

## Quick Reference Summary

- **Add / Edit Products in Section 1**: Edit `src/data/my-products/section-1.ts`
- **Add / Edit Products in Section 2**: Edit `src/data/my-products/section-2.ts`
- **Add / Edit Products in Section 3**: Edit `src/data/my-products/section-3.ts`
- **Add / Edit Products in Section 4**: Edit `src/data/my-products/section-4.ts`
- **Add / Edit Products in Section 5**: Edit `src/data/my-products/section-5.ts`
- **Add / Edit Products in Section 6**: Edit `src/data/my-products/section-6.ts`
- **Add / Edit Products in Section 7**: Edit `src/data/my-products/section-7.ts`
- **Add / Edit Products in Section 8**: Edit `src/data/my-products/section-8.ts`
- **Product ID Rule**: Section number + dot + product number (e.g. `1.1`, `1.2`, `1.5`, `2.1`).
