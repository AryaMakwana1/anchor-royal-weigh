import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Send,
  Building,
  User,
  Package
} from 'lucide-react';

const ContactSection = () => {
  const handleWhatsAppClick = (number: string) => {
    const message = "Hello! I'm interested in Anchor Digital weighing scales. Please provide more information.";
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMapClick = () => {
    window.open('https://maps.app.goo.gl/5f7R1TdW1DWGvih7A?g_st=iw', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Contact Us
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to find the perfect weighing solution? Our team is here to help you 
            with expert advice, quotes, and support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-royal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Visit Our Factory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">M/s. SHREE RAM METAL</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Plot. No. 44, Amreli Road,<br />
                    B/H Suryoday Petrol Pump,<br />
                    Savarkundla – 364515<br />
                    Gujarat, India
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleMapClick}
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Google Maps
                </Button>
              </CardContent>
            </Card>

            <Card className="card-royal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Call Us Now
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <a href="tel:+919377446942" className="block p-3 bg-muted/50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                    <div className="font-semibold">+91 9377446942</div>
                    <div className="text-sm opacity-80">Primary Contact</div>
                  </a>
                  <a href="tel:+919712644009" className="block p-3 bg-muted/50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                    <div className="font-semibold">+91 9712644009</div>
                    <div className="text-sm opacity-80">Secondary Contact</div>
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleWhatsAppClick('919377446942')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    WhatsApp
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleWhatsAppClick('919712644009')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-royal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="mailto:anchordigitalscale@gmail.com"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <div className="font-semibold">anchordigitalscale@gmail.com</div>
                  <div className="text-sm opacity-80">Sales & Support</div>
                </a>
              </CardContent>
            </Card>

            <Card className="card-royal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Saturday</span>
                    <span className="font-semibold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-accent font-medium">24/7 WhatsApp Support Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Dealer Inquiry Form */}
            <Card className="card-royal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Dealer / Distributor Inquiry
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Join our network of authorized dealers and distributors
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input placeholder="Company Name *" />
                  <Input placeholder="Contact Person Name *" />
                  <Input placeholder="Phone Number *" />
                  <Input placeholder="Email Address *" />
                  <Input placeholder="City / Location *" />
                  <Input placeholder="Expected Order Volume" />
                </div>
                <Textarea 
                  placeholder="Product Interest & Business Details"
                  className="mb-4"
                  rows={3}
                />
                <Button className="w-full bg-primary hover:bg-primary-dark">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Dealer Inquiry
                </Button>
              </CardContent>
            </Card>

            {/* General Inquiry Form */}
            <Card className="card-royal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  General Inquiry & Quote Request
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Get personalized quotes and product recommendations
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input placeholder="Your Name *" />
                  <Input placeholder="Phone Number *" />
                  <Input placeholder="Email Address" />
                  <Input placeholder="Company (if applicable)" />
                </div>
                <div className="mb-4">
                  <select className="w-full p-3 border border-input rounded-md bg-background">
                    <option value="">Select Product Category</option>
                    <option value="platform">Platform Scales</option>
                    <option value="tabletop">Table Top Scales</option>
                    <option value="analytical">Analytical & Jewelry Scales</option>
                    <option value="portable">Portable / Mobile Scales</option>
                    <option value="digital">Digital Weighing Scales</option>
                    <option value="industrial">Industrial Scales</option>
                    <option value="spareparts">Spare Parts</option>
                  </select>
                </div>
                <Textarea 
                  placeholder="Your specific requirements, quantity needed, or questions..."
                  rows={4}
                  className="mb-4"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary-dark">
                    <Package className="h-4 w-4 mr-2" />
                    Request Quote
                  </Button>
                  <Button variant="outline" className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;