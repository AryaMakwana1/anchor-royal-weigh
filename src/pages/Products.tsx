import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, User, Eye, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';
import QuoteModal from '@/components/QuoteModal';

const PLACEHOLDER = '/placeholder.svg';

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  images?: string[];
  short_description?: string;
  category: string;
  product_code: string;
  model_name: string;
  is_best_seller: boolean;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, sortBy]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredProducts(filtered);
  };

  const handleQuoteRequest = (product: Product) => {
    setSelectedProduct(product);
    setShowQuoteModal(true);
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!e.currentTarget.src.endsWith(PLACEHOLDER)) e.currentTarget.src = PLACEHOLDER;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Our Products</h1>
              <p className="text-muted-foreground">
                Discover our complete range of electronic weighing machines
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowAuthModal(true)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-48 bg-muted rounded-lg mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded mb-4"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const imgSrc = (product.images && product.images[0]) || product.image_url || PLACEHOLDER;
                const productName = product.model_name || product.name;
                return (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow relative flex flex-col">
                  <CardContent className="p-6 flex flex-col flex-1">
                    <Link to={`/products/${product.id}`} className="block">
                      <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-muted relative">
                        <img
                          src={imgSrc}
                          alt={`${product.product_code ? product.product_code + ' ' : ''}${productName} - Anchor Digital weighing scale`}
                          loading="lazy"
                          onError={handleImgError}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>

                    <div className="space-y-3 flex-1 flex flex-col">
                      <Badge variant="outline" className="text-xs font-medium w-fit">
                        {product.category || 'Electronic Scale'}
                      </Badge>

                      {product.product_code && (
                        <div className="text-sm font-bold text-primary">{product.product_code}</div>
                      )}

                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg line-clamp-2 leading-tight hover:text-primary transition-colors">
                          {productName}
                        </h3>
                      </Link>

                      {(product.short_description || product.description) && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.short_description || product.description}
                        </p>
                      )}

                      <div className="pt-3 mt-auto border-t">
                        <div className="text-sm font-semibold text-primary mb-3">Request a Quote</div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/products/${product.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Link>
                          </Button>
                          <Button onClick={() => handleQuoteRequest(product)} size="sm">
                            <Quote className="h-4 w-4 mr-1" />
                            Request Quote
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartSidebar />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <QuoteModal 
        isOpen={showQuoteModal} 
        onClose={() => setShowQuoteModal(false)} 
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;