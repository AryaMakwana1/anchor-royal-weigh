import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare, Phone } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const QuoteModal = ({ isOpen, onClose, productName }: QuoteModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message with form data
    const message = `
*Quote Request - Anchor Digital*

Product: ${productName || 'General Inquiry'}
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Company: ${formData.company}
Message: ${formData.message}
    `.trim();
    
    const whatsappUrl = `https://wa.me/919377446942?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    onClose();
    setFormData({ name: '', phone: '', email: '', company: '', message: '' });
  };

  const handleDirectCall = () => {
    window.open('tel:+919377446942', '_self');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            Request Quote
          </DialogTitle>
          {productName && (
            <p className="text-sm text-muted-foreground">
              For: {productName}
            </p>
          )}
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="message">Requirements</Label>
            <Textarea
              id="message"
              placeholder="Please describe your requirements, quantity needed, etc."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Send via WhatsApp
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={handleDirectCall}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;