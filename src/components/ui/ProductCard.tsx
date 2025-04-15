
import { Product } from "@/data/products";
import { Link } from "react-router-dom";
import { ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";
import { addToCart } from "@/lib/dataLayer";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCartStore = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    // Add to cart with default options
    addToCartStore(product, 1, product.sizes[0], product.colors[0]);
    
    // Track add to cart event
    addToCart({
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1,
        },
      ],
      value: product.price,
    });
    
    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden aspect-[3/4] bg-secondary rounded-md">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
          <Link
            to={`/products/${product.id}`}
            className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <button
            onClick={handleAddToCart}
            className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
        {product.newArrival && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-sm">
            New
          </span>
        )}
        {product.bestSeller && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm">
            Best Seller
          </span>
        )}
      </div>
      <div className="mt-3">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-sm">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="h-3 w-3 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
