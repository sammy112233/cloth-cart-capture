
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsList from "@/components/ProductsList";

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom">
          <ProductsList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
