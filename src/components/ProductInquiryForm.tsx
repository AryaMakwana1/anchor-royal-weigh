import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProductInquiryFormProps {
  productName: string;
  productCode?: string;
}

const ProductInquiryForm = ({ productName, productCode }: ProductInquiryFormProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    location: '',
    quantity: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await supabase.from('contacts').insert({
        name: form.name,
        email: form.email || `${form.phone}@anchor.inquiry`,
        message: `Product Inquiry: ${productCode ? productCode + ' - ' : ''}${productName}\nCompany: ${form.company}\nPhone: ${form.phone}\nLocation: ${form.location}\nQuantity: ${form.quantity}\nMessage: ${form.message}`,
      });
    } catch (err) {
      console.error('Inquiry save failed', err);
    }

    const waText = `Hello Anchor Digital,\n\nI'd like a quote for:\n${productCode ? productCode + ' - ' : ''}${productName}\n\nName: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nEmail: ${form.email}\nLocation: ${form.location}\nQuantity: ${form.quantity}\n\n${form.message}`;
    window.open(`https://wa.me/919377446942?text=${encodeURIComponent(waText)}`, '_blank');

    toast({
      title: 'Inquiry sent',
      description: 'We have received your inquiry and opened WhatsApp for instant chat.',
    });

    setForm({ name: '', company: '', phone: '', email: '', location: '', quantity: '', message: '' });
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="inq-name">Name *</Label>
          <Input id="inq-name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="inq-company">Company</Label>
          <Input id="inq-company" name="company" value={form.company} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="inq-phone">Phone *</Label>
          <Input id="inq-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="inq-email">Email</Label>
          <Input id="inq-email" name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="inq-location">Location</Label>
          <Input id="inq-location" name="location" value={form.location} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="inq-quantity">Quantity</Label>
          <Input id="inq-quantity" name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 5 units" />
        </div>
      </div>
      <div>
        <Label htmlFor="inq-message">Message</Label>
        <Textarea id="inq-message" name="message" value={form.message} onChange={handleChange} rows={3} />
      </div>
      <Button type="submit" disabled={submitting} className="w-full">
        <Send className="h-4 w-4 mr-2" />
        {submitting ? 'Sending...' : 'Send Inquiry'}
      </Button>
    </form>
  );
};

export default ProductInquiryForm;