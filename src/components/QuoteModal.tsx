import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Send } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const QuoteModal = ({ isOpen, onClose, productName }: QuoteModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    location: '',
    productInterest: productName || '',
    orderVolume: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `Quote Request from ${formData.name}

Company: ${formData.company}
Phone: ${formData.phone}
Email: ${formData.email}
Location: ${formData.location}
Product Interest: ${formData.productInterest}
Order Volume: ${formData.orderVolume}

Message: ${formData.message}`;

    const whatsappUrl = `https://wa.me/919377446942?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form and close modal
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      location: '',
      productInterest: productName || '',
      orderVolume: '',
      message: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Request Quote
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <Label htmlFor="productInterest">Product Interest</Label>
            <Input
              id="productInterest"
              name="productInterest"
              value={formData.productInterest}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <Label htmlFor="orderVolume">Expected Order Volume</Label>
            <Input
              id="orderVolume"
              name="orderVolume"
              value={formData.orderVolume}
              onChange={handleInputChange}
              placeholder="e.g., 10 units, 100 pieces"
            />
          </div>
          
          <div>
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          
          <Button type="submit" className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Quote Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;