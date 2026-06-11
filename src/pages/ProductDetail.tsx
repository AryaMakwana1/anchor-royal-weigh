import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ProductInquiryForm from '@/components/ProductInquiryForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MessageCircle, Phone, Download, ZoomIn, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

const PLACEHOLDER = '/placeholder.svg';
const WHATSAPP_NUMBER = '919377446942';
const CALL_NUMBER = '+919377446942';

interface Product {
  id: string;
  name: string;
  description: string | null;
  short_description: string | null;
  image_url: string | null;
  images: string[] | null;
  category: string | null;
  product_code: string | null;
  model_name: string | null;
  capacity: string | null;
  accuracy: string | null;
  platform: string | null;
  features: string[] | null;
  applications: string[] | null;
  brochure_url: string | null;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const { data } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
      if (cancelled) return;
      setProduct(data as Product | null);
      if (data?.category) {
        const { data: rel } = await supabase
          .from('products')
          .select('*')
          .eq('category', data.category)
          .neq('id', id)
          .limit(4);
        if (!cancelled) setRelated((rel as Product[]) || []);
      }
      setLoading(false);
      setActiveImg(0);
    };
    if (id) load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="animate-pulse grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-24 bg-muted rounded" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products"><Button>Back to Products</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  const productName = product.model_name || product.name;
  const imgList = (product.images && product.images.length > 0
    ? product.images
    : product.image_url
    ? [product.image_url]
    : []).filter(Boolean);
  const mainImg = imgList[activeImg] || PLACEHOLDER;
  const altBase = `${product.product_code ? product.product_code + ' ' : ''}${productName} - Anchor Digital electronic weighing scale`;
  const seoFilename = `anchor-digital-${slugify(productName)}.jpg`;

  const waMessage = `Hello Anchor Digital, I'd like more info about ${product.product_code ? product.product_code + ' - ' : ''}${productName}.`;
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.src.indexOf(PLACEHOLDER) === -1) {
      e.currentTarget.src = PLACEHOLDER;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Gallery */}
            <div>
              <div
                className="relative aspect-square bg-muted rounded-lg overflow-hidden group cursor-zoom-in"
                onClick={() => setZoomOpen(true)}
              >
                <img
                  src={mainImg}
                  alt={altBase}
                  data-seo-filename={seoFilename}
                  loading="eager"
                  onError={onImgError}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur p-2 rounded-full">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
              {imgList.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {imgList.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`aspect-square bg-muted rounded border-2 overflow-hidden ${i === activeImg ? 'border-primary' : 'border-transparent'}`}
                    >
                      <img src={src} alt={`${altBase} view ${i + 1}`} loading="lazy" onError={onImgError} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              {product.category && <Badge variant="outline" className="mb-3">{product.category}</Badge>}
              {product.product_code && (
                <div className="text-sm font-bold text-primary mb-1">{product.product_code}</div>
              )}
              <h1 className="text-3xl font-bold mb-2">{productName}</h1>
              {product.short_description && (
                <p className="text-muted-foreground mb-4">{product.short_description}</p>
              )}

              <div className="bg-muted/40 rounded-lg p-4 mb-6">
                <div className="text-lg font-semibold text-primary mb-1">Request a Quote</div>
                <p className="text-sm text-muted-foreground">Contact us for the best dealer pricing and bulk discounts.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Inquiry
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`tel:${CALL_NUMBER}`}>
                    <Phone className="h-4 w-4 mr-2" /> Call Now
                  </a>
                </Button>
              </div>

              {/* Specifications */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h2 className="font-semibold mb-3">Specifications</h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
                    {product.capacity && (
                      <div className="flex justify-between sm:flex-col sm:justify-start">
                        <dt className="text-muted-foreground">Capacity</dt>
                        <dd className="font-medium">{product.capacity}</dd>
                      </div>
                    )}
                    {product.accuracy && (
                      <div className="flex justify-between sm:flex-col sm:justify-start">
                        <dt className="text-muted-foreground">Accuracy</dt>
                        <dd className="font-medium">{product.accuracy}</dd>
                      </div>
                    )}
                    {product.platform && (
                      <div className="flex justify-between sm:flex-col sm:justify-start col-span-full">
                        <dt className="text-muted-foreground">Platform</dt>
                        <dd className="font-medium">{product.platform}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>

              {product.brochure_url && (
                <Button asChild variant="outline" className="w-full mb-6">
                  <a href={product.brochure_url} target="_blank" rel="noopener noreferrer" download>
                    <Download className="h-4 w-4 mr-2" /> Download Brochure
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Description / Features / Applications */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {product.description && (
              <Card className="md:col-span-3">
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-2 flex items-center gap-2"><FileText className="h-4 w-4" /> Description</h2>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{product.description}</p>
                </CardContent>
              </Card>
            )}
            {product.features && product.features.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-3">Key Features</h2>
                  <ul className="space-y-2 text-sm">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />{f}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            {product.applications && product.applications.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-3">Applications</h2>
                  <ul className="space-y-2 text-sm">
                    {product.applications.map((a, i) => (
                      <li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />{a}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Inquiry Form */}
          <div className="mt-12">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-1">Get a Quote for this Product</h2>
                <p className="text-sm text-muted-foreground mb-6">Fill out the form and our team will reach out with dealer pricing and availability.</p>
                <ProductInquiryForm productName={productName} productCode={product.product_code || undefined} />
              </CardContent>
            </Card>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((r) => {
                  const rName = r.model_name || r.name;
                  const rImg = (r.images && r.images[0]) || r.image_url || PLACEHOLDER;
                  return (
                    <Link key={r.id} to={`/products/${r.id}`} className="group">
                      <Card className="hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-3">
                          <div className="aspect-square bg-muted rounded mb-2 overflow-hidden">
                            <img
                              src={rImg}
                              alt={`${r.product_code ? r.product_code + ' ' : ''}${rName}`}
                              loading="lazy"
                              onError={onImgError}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                            />
                          </div>
                          {r.product_code && <div className="text-xs text-primary font-semibold">{r.product_code}</div>}
                          <div className="text-sm font-medium line-clamp-2">{rName}</div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0 shadow-none">
          <img src={mainImg} alt={altBase} onError={onImgError} className="w-full h-auto rounded-lg bg-white" />
        </DialogContent>
      </Dialog>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ProductDetail;