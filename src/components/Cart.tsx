
import { Link } from "react-router-dom";
import CartItem from "@/components/CartItem";
import { useStore } from "@/lib/store";
import { ArrowRight } from "lucide-react";
import { beginCheckout } from "@/lib/dataLayer";

export default function Cart() {
  const cart = useStore((state) => state.cart);
  const subtotal = useStore((state) => state.subtotal());
  const shipping = cart.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleBeginCheckout = () => {
    beginCheckout({
      items: cart.map((item) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
      })),
      value: subtotal,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div>
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>

        <Link
          to="/products"
          className="text-sm mt-6 inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Continue Shopping
        </Link>
      </div>

      <div className="md:col-span-1">
        <div className="bg-secondary rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Estimated Tax</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between font-medium">
              <p>Order Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          <Link
            to="/checkout"
            className="btn-primary w-full mt-6 flex justify-center items-center gap-2"
            onClick={handleBeginCheckout}
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
