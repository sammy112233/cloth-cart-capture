
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useStore((state) => state.totalItems());

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            MODISH
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Products
            </Link>
            <Link to="/promotions" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Promotions
            </Link>
            <Link to="/refunds" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Returns
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center justify-center h-9 w-9 rounded-md border border-input hover:bg-secondary transition-colors">
              <Search className="h-4 w-4" />
            </button>
            <Link to="/cart" className="relative flex items-center justify-center h-9 w-9 rounded-md border border-input hover:bg-secondary transition-colors">
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 text-xs flex items-center justify-center font-medium rounded-full bg-primary text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden h-9 w-9 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[57px] z-50 bg-background md:hidden">
          <div className="container-custom py-6 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-lg py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-lg py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/promotions" 
              className="text-lg py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Promotions
            </Link>
            <Link 
              to="/refunds" 
              className="text-lg py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Returns
            </Link>

            <div className="flex items-center mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
