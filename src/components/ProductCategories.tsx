import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Quote, Star } from 'lucide-react';
import platformScale from '@/assets/products/platform-scale.png';
import hangingScale from '@/assets/products/hanging-scale.png';
import tableTopScale from '@/assets/products/table-top-scale.png';
import compactScale from '@/assets/products/compact-scale.png';
import babyScale from '@/assets/products/baby-scale.png';
import poleScale from '@/assets/products/pole-scale.png';

const ProductCategories = () => {
  const categories = [
    {
      title: "Platform Scales",
      description: "Heavy-duty industrial platform scales for large capacity weighing",
      image: platformScale,
      bestSeller: true,
      capacity: "Up to 5000 kg"
    },
    {
      title: "Table Top Scales",
      description: "Compact and accurate scales perfect for retail and commercial use",
      image: tableTopScale,
      bestSeller: true,
      capacity: "Up to 50 kg"
    },
    {
      title: "Analytical & Jewelry Scales",
      description: "Precision scales for jewelry, laboratories and analytical applications",
      image: compactScale,
      capacity: "Up to 5 kg"
    },
    {
      title: "Portable / Mobile Scales",
      description: "Lightweight and portable weighing solutions for field operations",
      image: hangingScale,
      capacity: "Up to 1000 kg"
    },
    {
      title: "Digital Weighing Scales",
      description: "Advanced digital scales with modern display and connectivity",
      image: poleScale,
      bestSeller: true,
      capacity: "Up to 300 kg"
    },
    {
      title: "Industrial Scales",
      description: "Heavy-duty industrial weighing solutions for manufacturing",
      image: babyScale,
      capacity: "Up to 10000 kg"
    }
  ];

  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Our Products
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Premium <span className="text-primary">Weighing Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of digital weighing scales, engineered for precision, 
            built for durability, and trusted by industries across India.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="card-royal group cursor-pointer overflow-hidden"
            >
              <div className="relative">
                {category.bestSeller && (
                  <Badge className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Best Seller
                  </Badge>
                )}
                <div className="aspect-square bg-gradient-to-br from-muted to-background p-8 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {category.capacity}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-primary hover:bg-primary-dark"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Spare Parts Section */}
        <div className="bg-gradient-royal-subtle rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Weighing Scale <span className="text-primary">Spare Parts</span>
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Complete range of genuine spare parts for all weighing scale models. 
            Ensure optimal performance and extend the life of your equipment.
          </p>
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View Spare Parts Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;