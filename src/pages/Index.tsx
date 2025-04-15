
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { getNewArrivals, getBestSellers } from "@/data/products";

export default function Index() {
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] bg-neutral-100 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop"
            alt="Fashion collection"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="container-custom">
              <div className="max-w-lg text-white space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Discover Your Style
                </h1>
                <p className="text-lg opacity-90">
                  Explore our new collection of premium clothing essentials designed for modern living
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/products" className="btn-primary">
                    Shop Now
                  </Link>
                  <Link to="/products?category=new" className="btn-secondary">
                    New Arrivals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-3xl font-medium mb-12">Shop by Category</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <Link to="/products?category=men" className="group relative overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format&fit=crop"
                  alt="Men's Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-medium mb-2">Men</h3>
                    <p className="flex items-center text-sm opacity-90">
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </p>
                  </div>
                </div>
              </Link>
              <Link to="/products?category=women" className="group relative overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop"
                  alt="Women's Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-medium mb-2">Women</h3>
                    <p className="flex items-center text-sm opacity-90">
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </p>
                  </div>
                </div>
              </Link>
              <Link to="/products?category=unisex" className="group relative overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop"
                  alt="Unisex Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-medium mb-2">Unisex</h3>
                    <p className="flex items-center text-sm opacity-90">
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 bg-secondary/30">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-medium">New Arrivals</h2>
              <Link 
                to="/products?sort=new" 
                className="text-sm font-medium flex items-center hover:text-primary transition-colors"
              >
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-medium">Best Sellers</h2>
              <Link 
                to="/products?sort=best" 
                className="text-sm font-medium flex items-center hover:text-primary transition-colors"
              >
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Subscribe to Our Newsletter</h2>
              <p className="mb-8 opacity-90">
                Stay updated with our latest arrivals and exclusive offers
              </p>
              <form className="flex flex-col md:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-md border border-transparent bg-white/10 text-white placeholder:text-white/80 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
