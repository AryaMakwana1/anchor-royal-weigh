import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CartSidebar from "@/components/CartSidebar";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Eye, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PLACEHOLDER = '/placeholder.svg';

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  images?: string[];
  category: string;
  product_code: string;
  model_name: string;
  capacity: string;
  accuracy: string;
  platform: string;
  is_best_seller: boolean;
}

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_best_seller', true)
        .limit(6)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!e.currentTarget.src.endsWith(PLACEHOLDER)) e.currentTarget.src = PLACEHOLDER;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        
        {/* Featured Products Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our best-selling electronic weighing machines, trusted by businesses nationwide.
              </p>
            </div>

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredProducts.map((product) => {
                  const imgSrc = (product.images && product.images[0]) || product.image_url || PLACEHOLDER;
                  const productName = product.model_name || product.name;
                  return (
                    <Card key={product.id} className="group hover:shadow-lg transition-shadow relative">
                      <CardContent className="p-6">
                        <Badge
                          variant="destructive"
                          className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                        >
                          <Star className="h-3 w-3 mr-1" />
                          Best Seller
                        </Badge>

                        <Link to={`/products/${product.id}`}>
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

                        <div className="space-y-3">
                          <Badge variant="outline" className="text-xs font-medium">
                            {product.category || 'Electronic Scale'}
                          </Badge>
                          <div className="text-sm font-bold text-primary">{product.product_code}</div>
                          <Link to={`/products/${product.id}`}>
                            <h3 className="font-semibold text-lg line-clamp-2 leading-tight hover:text-primary transition-colors">
                              {productName}
                            </h3>
                          </Link>

                          <div className="pt-3 border-t">
                            <div className="text-sm font-semibold text-primary mb-3">Get Dealer Pricing</div>
                            <div className="grid grid-cols-2 gap-2">
                              <Button asChild variant="outline" size="sm">
                                <Link to={`/products/${product.id}`}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </Link>
                              </Button>
                              <Button asChild size="sm">
                                <Link to={`/products/${product.id}`}>
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  Request Quote
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            <div className="text-center">
              <Link to="/products">
                <Button size="lg" variant="outline" className="px-8">
                  View All Products
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartSidebar />
    </div>
  );
};

export default Home;