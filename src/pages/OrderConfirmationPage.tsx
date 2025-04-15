
import { useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";

interface LocationState {
  orderId: string;
}

export default function OrderConfirmationPage() {
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If no order ID is provided, redirect to homepage
  if (!state?.orderId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-medium mb-4">Order Confirmed!</h1>
            <p className="text-xl mb-8">Thank you for your purchase</p>
            
            <div className="bg-secondary rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Order Number:</p>
                  <p className="text-sm">{state.orderId}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Date:</p>
                  <p className="text-sm">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Estimated Delivery:</p>
                  <p className="text-sm">
                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - 
                    {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8">
              We've sent a confirmation email with your order details. If you have any questions, please contact our customer service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-secondary">
                Return to Home
              </Link>
              <Link to="/products" className="btn-primary flex items-center justify-center gap-2">
                Continue Shopping <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
