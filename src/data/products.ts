
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'men' | 'women' | 'unisex';
  sizes: string[];
  colors: string[];
  materials: string;
  bestSeller?: boolean;
  newArrival?: boolean;
}

export const products: Product[] = [
  {
    id: "tshirt001",
    name: "Essential Cotton T-Shirt",
    description: "Our classic cotton t-shirt offers ultimate comfort with a modern fit. Made from 100% organic cotton, this versatile piece is perfect for everyday wear. The breathable fabric keeps you cool, while the clean design ensures effortless style.",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHNoaXJ0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    ],
    category: "unisex",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy", "Gray"],
    materials: "100% Organic Cotton",
    bestSeller: true
  },
  {
    id: "jeans001",
    name: "Slim Fit Denim Jeans",
    description: "Our premium slim fit jeans combine style and comfort with their versatile design. The stretch denim fabric provides all-day comfort, while the classic five-pocket styling adds timeless appeal. Perfect for casual outings or dressed-up events.",
    price: 69.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVhbnN8ZW58MHx8MHx8fDA%3D",
    ],
    category: "men",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    materials: "98% Cotton, 2% Elastane",
    bestSeller: true
  },
  {
    id: "dress001",
    name: "Floral Wrap Dress",
    description: "This elegant floral wrap dress features a flattering silhouette and vibrant pattern. The lightweight, flowing fabric creates a feminine look perfect for special occasions or summer days. The adjustable tie waist ensures a perfect fit.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJlc3N8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHJlc3N8ZW58MHx8MHx8fDA%3D",
    ],
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue Floral", "Red Floral"],
    materials: "100% Viscose",
    newArrival: true
  },
  {
    id: "hoodie001",
    name: "Oversized Comfort Hoodie",
    description: "Stay cozy and stylish in our oversized comfort hoodie. The brushed fleece interior provides exceptional warmth, while the relaxed fit offers maximum comfort. With a practical kangaroo pocket and adjustable hood, this hoodie combines function and fashion.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9vZGllfGVufDB8fDB8fHww",
    ],
    category: "unisex",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Olive", "Burgundy"],
    materials: "80% Cotton, 20% Polyester",
    newArrival: true
  },
  {
    id: "jacket001",
    name: "Classic Denim Jacket",
    description: "Our timeless denim jacket is a wardrobe essential that never goes out of style. The durable cotton denim construction provides long-lasting wear, while the versatile design pairs effortlessly with any outfit. Perfect for layering in any season.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1591213954196-2d0db02b4138?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlbmltJTIwamFja2V0fGVufDB8fDB8fHww",
    ],
    category: "unisex",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Light Wash", "Dark Wash", "Black"],
    materials: "100% Cotton Denim",
    bestSeller: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.newArrival);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const filterProducts = (
  category?: string,
  sortBy?: 'price-low' | 'price-high'
): Product[] => {
  let filtered = [...products];
  
  if (category && category !== 'all') {
    filtered = filtered.filter(product => product.category === category);
  }
  
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }
  
  return filtered;
};
