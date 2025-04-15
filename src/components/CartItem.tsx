
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash, Minus, Plus } from "lucide-react";
import { useStore, CartItem } from "@/lib/store";

interface CartItemProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { product, quantity, size, color } = item;
  const [isHovered, setIsHovered] = useState(false);

  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  return (
    <div 
      className="flex py-6 border-b"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium">
            <Link to={`/products/${product.id}`}>
              <h3 className="hover:underline">{product.name}</h3>
            </Link>
            <p className="ml-4">${(product.price * quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {color} / {size}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border rounded-md">
            <button
              className="px-2 py-1 hover:bg-secondary transition-colors"
              onClick={decreaseQuantity}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              className="px-2 py-1 hover:bg-secondary transition-colors"
              onClick={increaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <button
            type="button"
            className="text-muted-foreground hover:text-destructive transition-colors"
            onClick={() => removeFromCart(product.id)}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
