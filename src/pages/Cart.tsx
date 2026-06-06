import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Package,
  CreditCard,
  Truck,
  ShieldCheck,
  User,
  MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AuthModal from '@/components/AuthModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [delivery, setDelivery] = useState({
    customer_name: '',
    mobile: '',
    email: '',
    street: '',
    city: '',
    state: 'Gujarat',
    pincode: '',
    landmark: '',
    preferred_date: '',
    notes: '',
  });
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getGST, 
    getFinalTotal 
  } = useCart();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const shipping = useMemo(() => (getTotalPrice() >= 50000 || getTotalPrice() === 0 ? 0 : 500), [items]);
  const grandTotal = getFinalTotal() + shipping;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || items.length === 0) return;
    setSubmitting(true);

    try {
      const subtotal = getTotalPrice();
      const gst = getGST();
      const { data: order, error: oErr } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          ...delivery,
          preferred_date: delivery.preferred_date || null,
          subtotal,
          gst_amount: gst,
          shipping_amount: shipping,
          total_amount: grandTotal,
          status: 'pending',
          payment_method: 'inquiry',
        })
        .select('id, order_number')
        .single();
      if (oErr) throw oErr;

      const { error: iErr } = await supabase.from('order_items').insert(
        items.map((i) => ({
          order_id: order!.id,
          product_id: i.id,
          product_name: i.name,
          category: i.category,
          unit_price: i.price,
          quantity: i.quantity,
          line_total: i.price * i.quantity,
          image_url: i.image,
        }))
      );
      if (iErr) throw iErr;

      // Open WhatsApp summary
      const summary = items.map((i) => `• ${i.name} ×${i.quantity} — ₹${(i.price * i.quantity).toLocaleString()}`).join('\n');
      const msg = `🛒 *New Order ${order!.order_number}*\n${summary}\n\nSubtotal: ₹${subtotal.toLocaleString()}\nGST: ₹${gst.toLocaleString()}\nShipping: ₹${shipping.toLocaleString()}\n*Total: ₹${grandTotal.toLocaleString()}*\n\n${delivery.customer_name}, ${delivery.mobile}\n${delivery.street}, ${delivery.city} - ${delivery.pincode}`;
      window.open(`https://wa.me/919377446942?text=${encodeURIComponent(msg)}`, '_blank');

      await clearCart();
      toast({ title: t('checkout.success'), description: t('checkout.success_desc') });
      navigate('/my-orders');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to submit order', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <User className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
              <h1 className="text-4xl font-bold mb-4">Please Sign In</h1>
              <p className="text-xl text-muted-foreground mb-8">
                You need to sign in to view your cart.
              </p>
              <Button size="lg" onClick={() => setShowAuthModal(true)}>
                <User className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppFloat />
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
                <h1 className="text-4xl font-bold mb-4">{t('cart.empty')}</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Looks like you haven't added any products to your cart yet.
                </p>
              </div>
              
              <div className="space-y-4">
                <Link to="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary-dark">
                    <Package className="h-5 w-5 mr-2" />
                    {t('cart.browse')}
                  </Button>
                </Link>
                <div>
                  <Link to="/my-orders">
                    <Button variant="outline" size="lg">
                      <Package className="h-5 w-5 mr-2" />
                      {t('nav.my_orders')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Link to="/products">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('cart.continue')}
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold">{t('cart.title')}</h1>
                <p className="text-muted-foreground">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Signed in as {user.email}</span>
              <Button variant="outline" size="sm" onClick={signOut}>
                {t('nav.sign_out')}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="card-royal">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="w-full md:w-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between gap-4">
                          <div className="flex-1">
                            <Badge variant="outline" className="mb-2 text-xs">
                              {item.category}
                            </Badge>
                            <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                            {item.specifications && (
                              <p className="text-sm text-muted-foreground mb-3">
                                {item.specifications}
                              </p>
                            )}
                            <div className="text-2xl font-bold text-primary">
                              ₹{item.price.toLocaleString()}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="h-10 w-10 p-0"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-4 py-2 min-w-[60px] text-center font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="h-10 w-10 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t('cart.remove')}
                            </Button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Item Total:</span>
                            <span className="text-xl font-bold">
                              ₹{(item.quantity * item.price).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="card-royal sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{t('cart.subtotal')} ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                      <span>₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('cart.gst')}</span>
                      <span>₹{getGST().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t('cart.shipping')}</span>
                      <span>{shipping === 0 ? <Badge className="bg-green-500/15 text-green-700">FREE</Badge> : `₹${shipping}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t('cart.total')}</span>
                      <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t('checkout.shipping_calc')}</p>
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="h-4 w-4 text-orange-600" />
                      <span>Quality Assured</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setShowCheckout(true)}
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary-dark text-lg font-semibold py-3"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      {t('cart.checkout')}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        clearCart();
                        toast({
                          title: "Cart Cleared",
                          description: "All items have been removed from your cart.",
                        });
                      }}
                      className="w-full"
                    >
                      Clear Cart
                    </Button>
                  </div>

                  {/* Additional Info */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Prices include GST</p>
                    <p>• {t('cart.free_shipping_above')}</p>
                    <p>• 1-3 year warranty on all products</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Checkout drawer */}
          {showCheckout && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-4" onClick={() => !submitting && setShowCheckout(false)}>
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <CardHeader>
                  <CardTitle>{t('checkout.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={submitOrder} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label>{t('checkout.name')} *</Label><Input required value={delivery.customer_name} onChange={(e) => setDelivery({ ...delivery, customer_name: e.target.value })} /></div>
                      <div><Label>{t('checkout.mobile')} *</Label><Input required pattern="[0-9]{10}" value={delivery.mobile} onChange={(e) => setDelivery({ ...delivery, mobile: e.target.value })} /></div>
                    </div>
                    <div><Label>{t('checkout.email')} *</Label><Input required type="email" value={delivery.email} onChange={(e) => setDelivery({ ...delivery, email: e.target.value })} /></div>
                    <div><Label>{t('checkout.street')} *</Label><Textarea required value={delivery.street} onChange={(e) => setDelivery({ ...delivery, street: e.target.value })} /></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div><Label>{t('checkout.city')} *</Label><Input required value={delivery.city} onChange={(e) => setDelivery({ ...delivery, city: e.target.value })} /></div>
                      <div><Label>{t('checkout.state')}</Label><Input value={delivery.state} onChange={(e) => setDelivery({ ...delivery, state: e.target.value })} /></div>
                      <div><Label>{t('checkout.pincode')} *</Label><Input required pattern="[0-9]{6}" value={delivery.pincode} onChange={(e) => setDelivery({ ...delivery, pincode: e.target.value })} /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label>{t('checkout.landmark')}</Label><Input value={delivery.landmark} onChange={(e) => setDelivery({ ...delivery, landmark: e.target.value })} /></div>
                      <div><Label>{t('checkout.preferred_date')}</Label><Input type="date" min={new Date().toISOString().split('T')[0]} value={delivery.preferred_date} onChange={(e) => setDelivery({ ...delivery, preferred_date: e.target.value })} /></div>
                    </div>
                    <div><Label>{t('checkout.notes')}</Label><Textarea value={delivery.notes} onChange={(e) => setDelivery({ ...delivery, notes: e.target.value })} /></div>
                    <div className="bg-muted/40 rounded-lg p-4 text-sm space-y-1">
                      <div className="flex justify-between"><span>{t('cart.subtotal')}</span><span>₹{getTotalPrice().toLocaleString()}</span></div>
                      <div className="flex justify-between"><span>{t('cart.gst')}</span><span>₹{getGST().toLocaleString()}</span></div>
                      <div className="flex justify-between"><span>{t('cart.shipping')}</span><span>₹{shipping.toLocaleString()}</span></div>
                      <Separator className="my-1" />
                      <div className="flex justify-between font-bold text-base"><span>{t('cart.total')}</span><span className="text-primary">₹{grandTotal.toLocaleString()}</span></div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setShowCheckout(false)} disabled={submitting}>Cancel</Button>
                      <Button type="submit" className="flex-1" disabled={submitting}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {submitting ? t('checkout.submitting') : t('checkout.place_order')}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Cart;