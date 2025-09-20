import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Package,
  CreditCard,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getGST, 
    getFinalTotal 
  } = useCart();
  const { toast } = useToast();

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

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Format order details for WhatsApp
    const orderSummary = items.map(item => 
      `• ${item.name} (${item.category})\n  Qty: ${item.quantity} × ₹${item.price.toLocaleString()} = ₹${(item.quantity * item.price).toLocaleString()}`
    ).join('\n\n');

    const whatsappMessage = `🛒 *New Order Request*

*Order Details:*
${orderSummary}

*Order Summary:*
Subtotal: ₹${getTotalPrice().toLocaleString()}
GST (18%): ₹${getGST().toLocaleString()}
*Total Amount: ₹${getFinalTotal().toLocaleString()}*

Please confirm this order and provide delivery details.

Thank you!`;

    const phoneNumber = '919377446942';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "Complete your order via WhatsApp chat.",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
                <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Looks like you haven't added any products to your cart yet.
                </p>
              </div>
              
              <div className="space-y-4">
                <Link to="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary-dark">
                    <Package className="h-5 w-5 mr-2" />
                    Browse Products
                  </Button>
                </Link>
                <div>
                  <Link to="/">
                    <Button variant="outline" size="lg">
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Back to Home
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
          <div className="flex items-center gap-4 mb-8">
            <Link to="/products">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
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
                              Remove
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
                      <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span>₹{getGST().toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{getFinalTotal().toLocaleString()}</span>
                    </div>
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
                      onClick={handleCheckout}
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary-dark text-lg font-semibold py-3"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceed to Checkout
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
                    <p>• Free delivery for orders above ₹50,000</p>
                    <p>• 1-3 year warranty on all products</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Cart;