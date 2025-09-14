import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare,
  Award,
  Shield,
  Building,
  Globe,
  Star,
  CheckCircle,
  Clock,
  Linkedin,
  Facebook,
  Instagram
} from 'lucide-react';
import srmLogo from '@/assets/srm-logo.png';
import anchorLogo from '@/assets/anchor-digital-logo.jpg';

const Footer = () => {
  const handleWhatsAppClick = () => {
    const message = "Hello! I'm interested in Anchor Digital weighing scales.";
    const whatsappUrl = `https://wa.me/919377446942?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
    { name: 'Dealer Inquiry', href: '#contact' }
  ];

  const productCategories = [
    'Platform Scales',
    'Table Top Scales', 
    'Analytical & Jewelry Scales',
    'Portable / Mobile Scales',
    'Digital Weighing Scales',
    'Industrial Scales',
    'Spare Parts'
  ];

  const certifications = [
    { icon: Award, name: 'ISO 9001:2015', color: 'text-blue-600' },
    { icon: Star, name: 'Make in India', color: 'text-orange-600' },
    { icon: Building, name: 'MSME Certified', color: 'text-green-600' },
    { icon: Globe, name: 'Vocal for Local', color: 'text-teal-600' },
    { icon: Shield, name: 'ISA Certified', color: 'text-indigo-600' }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img src={srmLogo} alt="Shree Ram Metal" className="h-10 w-auto" />
              <div className="h-10 w-px bg-white/20"></div>
              <img src={anchorLogo} alt="Anchor Digital" className="h-12 w-auto" />
            </div>
            <h3 className="text-xl font-bold mb-4">Anchor Digital</h3>
            <p className="text-secondary-foreground/80 mb-6 leading-relaxed">
              The Royal Standard in Weighing. Leading manufacturer of premium digital 
              and electronic weighing scales with 25+ years of excellence.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Savarkundla, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>+91 9377446942 | +91 9712644009</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <span>anchordigitalscale@gmail.com</span>
              </div>
            </div>
            {/* Business Hours */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">Business Hours</span>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Monday - Saturday:</span>
                  <span className="font-medium">7:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">7:00 AM - 2:00 PM</span>
                </div>
                <p className="text-xs text-secondary-foreground/60 mt-2">
                  24/7 WhatsApp Support Available
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleWhatsAppClick}
              className="mt-4 bg-green-600 hover:bg-green-700 w-full"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp Support
            </Button>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
              <span className="text-sm font-medium">Follow Us:</span>
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/company/anchor-digital-scale/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors group"
                >
                  <Linkedin className="h-4 w-4 text-secondary-foreground group-hover:text-accent" />
                </a>
                <a 
                  href="https://www.facebook.com/groups/1118617721942618/members/admins" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors group"
                >
                  <Facebook className="h-4 w-4 text-secondary-foreground group-hover:text-accent" />
                </a>
                <a 
                  href="https://www.instagram.com/_anchordigital/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors group"
                >
                  <Instagram className="h-4 w-4 text-secondary-foreground group-hover:text-accent" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Products</h4>
            <ul className="space-y-3">
              {productCategories.map((category, index) => (
                <li key={index}>
                  <a 
                    href="#products"
                    className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Certifications</h4>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded">
                      <Icon className={`h-4 w-4 ${cert.color}`} />
                    </div>
                    <span className="text-sm text-secondary-foreground/80">{cert.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">GST Registered</span>
              </div>
              <p className="text-xs text-secondary-foreground/60">
                GSTIN: 24ACHFS2624R1ZO
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-sm text-secondary-foreground/60">
              © 2024 Shree Ram Metal. All rights reserved. | Manufacturing License: 300001/LM2020/153
            </div>
            <div className="text-sm">
              <span className="text-accent font-semibold">
                "Anchor Digital – The Future of Precision Weighing"
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;