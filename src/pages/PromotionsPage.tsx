
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { addPromotion } from "@/lib/dataLayer";

export default function PromotionsPage() {
  const promotions = [
    {
      id: "NEW10",
      name: "10% Off Your First Order",
      code: "NEW10",
      description: "Get 10% off your first order when you sign up for our newsletter.",
      expiry: "2025-12-31",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&auto=format&fit=crop"
    },
    {
      id: "SUMMER25",
      name: "Summer Sale",
      code: "SUMMER25",
      description: "25% off all summer items. Limited time only.",
      expiry: "2025-08-31",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop"
    },
    {
      id: "FREESHIP",
      name: "Free Shipping",
      code: "FREESHIP",
      description: "Free shipping on all orders over $50.",
      expiry: "2025-12-31",
      image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=800&auto=format&fit=crop"
    }
  ];

  const copyPromoCode = (code: string, name: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Promotion code copied!", {
      description: `${code} is ready to use at checkout`,
    });
    
    // Track promotion interaction
    addPromotion({
      promotion_id: code,
      promotion_name: name,
      creative_name: "Promotions Page"
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-medium mb-4">Current Promotions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take advantage of our limited-time offers and discounts. Use these promotion codes during checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <div key={promo.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={promo.image} 
                    alt={promo.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-medium mb-2">{promo.name}</h2>
                  <p className="text-muted-foreground mb-4">{promo.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Valid until: </span>
                      <span>{new Date(promo.expiry).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => copyPromoCode(promo.code, promo.name)}
                      className="btn-secondary flex items-center justify-center gap-2"
                    >
                      <span className="font-medium">{promo.code}</span>
                      <Copy className="h-4 w-4" />
                    </button>
                    <Link to="/products" className="btn-primary">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-2xl font-medium mb-3">Stay Updated</h2>
            <p className="mb-6">
              Subscribe to our newsletter to receive the latest promotions and discounts directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-md border border-transparent bg-white/10 text-white placeholder:text-white/80 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
