import { Phone, Mail, MapPin, Menu, X, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import anchorLogo from '@/assets/anchor-digital-logo.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-secondary text-secondary-foreground py-2 px-4 text-sm">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>+91 9377446942 | +91 9712644009</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>anchordigitalscale@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Savarkundla, Gujarat</span>
            </div>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.linkedin.com/company/anchor-digital-scale/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-foreground hover:text-accent transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://www.facebook.com/groups/1118617721942618/members/admins" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-foreground hover:text-accent transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/_anchordigital/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-foreground hover:text-accent transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-background shadow-elegant border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Company Name */}
            <div className="flex items-center gap-4">
              <img 
                src={anchorLogo} 
                alt="Anchor Digital" 
                className="h-16 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-primary">Anchor Digital</h1>
                <p className="text-sm text-muted-foreground">The Royal Standard in Weighing</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </a>
              <a href="#products" className="text-foreground hover:text-primary transition-colors font-medium">
                Products
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
                Services
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </a>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Dealer Inquiry
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-4">
                <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
                  Home
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                  About
                </a>
                <a href="#products" className="text-foreground hover:text-primary transition-colors font-medium">
                  Products
                </a>
                <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
                  Services
                </a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                  Contact
                </a>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-fit"
                >
                  Dealer Inquiry
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;