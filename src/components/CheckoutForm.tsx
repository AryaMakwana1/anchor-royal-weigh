import React, { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CheckoutFormProps {
  onBack: () => void;
}

interface DeliveryInfo {
  customerName: string;
  mobile: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  preferredDate: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onBack }) => {
  const { items, getFinalTotal, clearCart, setIsCartOpen } = useCart();
  const { toast } = useToast();
  
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    customerName: '',
    mobile: '',
    email: '',
    street: '',
    city: '',
    state: 'Gujarat',
    pincode: '',
    landmark: '',
    preferredDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create order summary
      const orderSummary = items.map(item => 
        `• ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`
      ).join('\n');

      const orderDetails = `
🛒 *Order Details*
${orderSummary}

💰 *Total Amount: ₹${getFinalTotal().toLocaleString()}*

📋 *Delivery Information*
Name: ${deliveryInfo.customerName}
Mobile: ${deliveryInfo.mobile}
Email: ${deliveryInfo.email}
Address: ${deliveryInfo.street}, ${deliveryInfo.city}, ${deliveryInfo.state} - ${deliveryInfo.pincode}
${deliveryInfo.landmark ? `Landmark: ${deliveryInfo.landmark}` : ''}
Preferred Delivery Date: ${deliveryInfo.preferredDate}
      `.trim();

      // Send via WhatsApp
      const whatsappMessage = encodeURIComponent(orderDetails);
      const whatsappUrl = `https://wa.me/919377446942?text=${whatsappMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Order Placed Successfully!",
        description: "Your order details have been sent via WhatsApp. We'll contact you shortly.",
      });

      // Clear cart and close
      clearCart();
      setIsCartOpen(false);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return deliveryInfo.customerName && 
           deliveryInfo.mobile && 
           deliveryInfo.email && 
           deliveryInfo.street && 
           deliveryInfo.city && 
           deliveryInfo.pincode && 
           deliveryInfo.preferredDate;
  };

  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Delivery Information</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name *</Label>
          <Input
            id="customerName"
            value={deliveryInfo.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Input
            id="mobile"
            type="tel"
            value={deliveryInfo.mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            placeholder="Enter your mobile number"
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={deliveryInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Street Address *</Label>
          <Textarea
            id="street"
            value={deliveryInfo.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            placeholder="Enter your complete address"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={deliveryInfo.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="City"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              value={deliveryInfo.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              placeholder="Pincode"
              pattern="[0-9]{6}"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={deliveryInfo.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            placeholder="State"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="landmark">Landmark (Optional)</Label>
          <Input
            id="landmark"
            value={deliveryInfo.landmark}
            onChange={(e) => handleInputChange('landmark', e.target.value)}
            placeholder="Nearby landmark"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred Delivery Date *</Label>
          <div className="relative">
            <Input
              id="preferredDate"
              type="date"
              value={deliveryInfo.preferredDate}
              onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4 space-y-2">
          <h3 className="font-semibold">Order Summary</h3>
          <div className="text-sm space-y-1">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} (x{item.quantity})</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-1 font-semibold">
              <div className="flex justify-between">
                <span>Total (incl. GST):</span>
                <span>₹{getFinalTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Submit Button */}
      <div className="p-4 border-t">
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={!isFormValid() || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutForm;