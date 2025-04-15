
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Cart from "@/components/Cart";

export default function CartPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-medium mb-8">Your Cart</h1>
          <Cart />
        </div>
      </main>
      <Footer />
    </div>
  );
}
