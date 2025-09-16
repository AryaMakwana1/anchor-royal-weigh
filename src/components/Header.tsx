import { Phone, Mail, MapPin, Menu, X, Linkedin, Facebook, Instagram, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import anchorLogo from '@/assets/anchor-digital-logo-new.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = 120; // Account for sticky header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

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
            <div className="flex items-center gap-2">
              <a 
                href="https://www.linkedin.com/company/anchor-digital-scale/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://www.facebook.com/groups/1118617721942618/members/admins" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/_anchordigital/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Sticky */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm shadow-elegant border-b transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src={anchorLogo} 
                alt="Anchor Digital" 
                className="h-16 w-auto"
              />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-primary">Anchor Digital</h1>
                <p className="text-sm text-muted-foreground">Precision Weighing Solutions</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => smoothScrollTo('home')} className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </button>
              <button onClick={() => smoothScrollTo('about')} className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </button>
              <button onClick={() => smoothScrollTo('products')} className="text-foreground hover:text-primary transition-colors font-medium">
                Products
              </button>
              <button onClick={() => smoothScrollTo('services')} className="text-foreground hover:text-primary transition-colors font-medium">
                Services
              </button>
              <button onClick={() => smoothScrollTo('contact')} className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Dealer Inquiry
              </Button>
              
              {/* Cart Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </nav>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Cart Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-4">
                <button onClick={() => smoothScrollTo('home')} className="text-left text-foreground hover:text-primary transition-colors font-medium">
                  Home
                </button>
                <button onClick={() => smoothScrollTo('about')} className="text-left text-foreground hover:text-primary transition-colors font-medium">
                  About
                </button>
                <button onClick={() => smoothScrollTo('products')} className="text-left text-foreground hover:text-primary transition-colors font-medium">
                  Products
                </button>
                <button onClick={() => smoothScrollTo('services')} className="text-left text-foreground hover:text-primary transition-colors font-medium">
                  Services
                </button>
                <button onClick={() => smoothScrollTo('contact')} className="text-left text-foreground hover:text-primary transition-colors font-medium">
                  Contact
                </button>
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