import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MessageCircle, Star, Award } from 'lucide-react';

// Import new product images
import platformScale1 from '@/assets/products/AD-P21_SupdaModel_100Kg_10gm_400-500-600Sqmm.png';
import craneScale1 from '@/assets/products/AD-CS02_CraneScaleAlluBody_100Kg_10gm.png';
import craneScale2 from '@/assets/products/AD-CS01_CraneScale_100-500Kg_10-50gm.png';
import platformScale2 from '@/assets/products/AD-P13_ChickenFB_SSTop_50-100Kg_5-10gm_300-350-400Sqmm.png';
import tableTopScale1 from '@/assets/products/AD-T03_ABSTT_10-20Kg_1-2gm_165x220mm.png';
import platformScale3 from '@/assets/products/AD-P17_PlatformMSTop_60-100Kg_5-10gm_300-350-400Sqmm.png';
import poleScale1 from '@/assets/products/AD-T11_JamboScalePole_FB_SSBody_10-20-50Kg_1-2-5gm_300x350mm.png';
import tableTopScale2 from '@/assets/products/AD-T06_MINIModelSSBody_10-20Kg_1-2gm_175x225mm.png';
import babyScale from '@/assets/products/AD-P22_BabyScale_100-200Kg_10-20gm_400-450Sqmm.png';
import poleScale2 from '@/assets/products/AD-T09_RegularPoleSSBody_10-20-30Kg_1-2-5gm_240x290mm.png';

// Function to parse product details from filename
const parseProductDetails = (filename: string) => {
  const parts = filename.split('_');
  return {
    model: parts[0] || 'Unknown',
    name: parts[1] || 'Weighing Scale',
    type: parts[2] || 'Electronic Scale',
    capacity: parts[3] || 'N/A',
    accuracy: parts[4] || 'N/A',
    platterSize: parts[5]?.replace('.png', '').replace('.jpg', '') || 'N/A'
  };
};

const products = [
  {
    id: 1,
    filename: 'AD-P21_SupdaModel_ElectronicWeighingScale_100Kg_10gm_400-500-600Sqmm',
    image: platformScale1,
    category: 'Platform Scales',
    isBestSeller: true,
    price: '₹15,500'
  },
  {
    id: 2,
    filename: 'AD-CS02_CraneScaleAlluBody_CraneScale_100Kg_10gm_Portable',
    image: craneScale1,
    category: 'Crane Scales',
    isBestSeller: false,
    price: '₹18,900'
  },
  {
    id: 3,
    filename: 'AD-CS01_CraneScale_HeavyDutyScale_100-500Kg_10-50gm_Industrial',
    image: craneScale2,
    category: 'Industrial Scales',
    isBestSeller: true,
    price: '₹25,600'
  },
  {
    id: 4,
    filename: 'AD-P13_ChickenFB_PlatformScale_50-100Kg_5-10gm_300-350-400Sqmm',
    image: platformScale2,
    category: 'Platform Scales',
    isBestSeller: false,
    price: '₹12,800'
  },
  {
    id: 5,
    filename: 'AD-T03_ABSTT_TableTopScale_10-20Kg_1-2gm_165x220mm',
    image: tableTopScale1,
    category: 'Table Top Scales',
    isBestSeller: true,
    price: '₹8,500'
  },
  {
    id: 6,
    filename: 'AD-P17_PlatformMSTop_PlatformScale_60-100Kg_5-10gm_300-350-400Sqmm',
    image: platformScale3,
    category: 'Platform Scales',
    isBestSeller: false,
    price: '₹14,200'
  },
  {
    id: 7,
    filename: 'AD-T11_JamboScalePole_PoleScale_10-20-50Kg_1-2-5gm_300x350mm',
    image: poleScale1,
    category: 'Pole Scales',
    isBestSeller: true,
    price: '₹11,900'
  },
  {
    id: 8,
    filename: 'AD-T06_MINIModelSSBody_CompactScale_10-20Kg_1-2gm_175x225mm',
    image: tableTopScale2,
    category: 'Compact Scales',
    isBestSeller: false,
    price: '₹7,800'
  },
  {
    id: 9,
    filename: 'AD-P22_BabyScale_SpecialtyScale_100-200Kg_10-20gm_400-450Sqmm',
    image: babyScale,
    category: 'Specialty Scales',
    isBestSeller: false,
    price: '₹22,500'
  },
  {
    id: 10,
    filename: 'AD-T09_RegularPoleSSBody_PoleScale_10-20-30Kg_1-2-5gm_240x290mm',
    image: poleScale2,
    category: 'Pole Scales',
    isBestSeller: true,
    price: '₹9,900'
  }
];

const ProductCategories = () => {
  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <Award className="h-5 w-5" />
            <span className="font-medium">Premium Quality Products</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-accent">Product Range</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive collection of precision weighing scales designed for various industries. 
            Each product combines accuracy, durability, and cutting-edge technology.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {products.map((product) => {
            const details = parseProductDetails(product.filename);
            
            return (
              <Card key={product.id} className="card-royal group hover:shadow-premium transition-all duration-500">
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={`${details.model} - ${details.name}`}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.isBestSeller && (
                      <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Best Seller
                      </Badge>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <div className="mb-3">
                      <Badge variant="outline" className="text-xs mb-2">
                        {product.category}
                      </Badge>
                      <h3 className="font-bold text-lg text-foreground mb-1">
                        {details.model}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {details.name} - {details.type}
                      </p>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-1 text-sm text-muted-foreground mb-4">
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="font-medium text-foreground">{details.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="font-medium text-foreground">{details.accuracy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform:</span>
                        <span className="font-medium text-foreground">{details.platterSize}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-accent">{product.price}</span>
                      <Badge variant="secondary" className="text-xs">
                        GST Extra
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-accent hover:bg-accent-dark text-accent-foreground hover:scale-105 transition-all duration-300"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:scale-105 transition-all duration-300"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Quote
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Spare Parts Section */}
        <div className="bg-gradient-royal-subtle rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Weighing Scale Spare Parts
            </h3>
            <p className="text-muted-foreground mb-6">
              Complete range of genuine spare parts and accessories for all weighing scale models. 
              Ensure optimal performance with authentic components.
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent-dark text-accent-foreground hover:scale-105 transition-all duration-300"
            >
              Browse Spare Parts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;