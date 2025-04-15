
import { useState, useEffect } from "react";
import { Product, filterProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const sortParam = searchParams.get("sort") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>(categoryParam);
  const [sort, setSort] = useState<'price-low' | 'price-high' | ''>(sortParam === 'price-low' ? 'price-low' : sortParam === 'price-high' ? 'price-high' : '');
  
  useEffect(() => {
    setProducts(filterProducts(category === "all" ? undefined : category, sort || undefined));
    
    // Update URL parameters
    const newParams = new URLSearchParams();
    if (category !== "all") {
      newParams.set("category", category);
    }
    if (sort) {
      newParams.set("sort", sort);
    }
    setSearchParams(newParams);
  }, [category, sort, setSearchParams]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-medium mb-4 md:mb-0">Products</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <select
              className="w-full md:w-40 p-2 pr-8 rounded border appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              className="w-full md:w-40 p-2 pr-8 rounded border appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
            >
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
