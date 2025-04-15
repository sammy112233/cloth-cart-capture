
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById, Product } from "@/data/products";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { viewItem, addToCart as trackAddToCart } from "@/lib/dataLayer";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const addToCartStore = useStore((state) => state.addToCart);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.images[0]);
        setSelectedSize(foundProduct.sizes[0]);
        setSelectedColor(foundProduct.colors[0]);

        // Track product view
        viewItem({
          items: [
            {
              item_id: foundProduct.id,
              item_name: foundProduct.name,
              item_category: foundProduct.category,
              price: foundProduct.price,
            },
          ],
          value: foundProduct.price,
        });
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    addToCartStore(product, quantity, selectedSize, selectedColor);

    // Track add to cart event
    trackAddToCart({
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: quantity,
        },
      ],
      value: product.price * quantity,
    });

    toast.success("Added to cart", {
      description: `${quantity} × ${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="aspect-square overflow-hidden rounded-md bg-secondary mb-4">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square rounded-sm overflow-hidden border-2 ${
                  mainImage === image ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          {product.newArrival && (
            <span className="inline-block bg-secondary text-xs font-medium px-2 py-1 rounded mb-2">
              New Arrival
            </span>
          )}
          {product.bestSeller && (
            <span className="inline-block bg-secondary text-xs font-medium px-2 py-1 rounded mb-2 ml-2">
              Best Seller
            </span>
          )}
          <h1 className="text-3xl font-medium">{product.name}</h1>
          <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground mt-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`h-10 w-10 rounded-md flex items-center justify-center text-sm font-medium ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground"
                      : "border border-input hover:bg-secondary"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-1">Materials</h3>
            <p className="text-sm text-muted-foreground">{product.materials}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border rounded-md h-12">
              <button
                className="flex-1 h-full px-4 flex items-center justify-center hover:bg-secondary transition-colors"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 flex items-center justify-center font-medium">
                {quantity}
              </span>
              <button
                className="flex-1 h-full px-4 flex items-center justify-center hover:bg-secondary transition-colors"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              className="btn-primary flex-1 h-12 gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
