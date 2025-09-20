import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Shield, Star, Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import QuoteModal from './QuoteModal';
import facilityBg from '@/assets/facility-background.jpg';

const HeroSection = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <section id="home" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-zoom"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.75), rgba(17, 24, 39, 0.7)), linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05)), url(${facilityBg})`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Award className="h-5 w-5 text-accent" />
              <span className="text-white text-sm font-medium">ISO 9001:2015</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="h-5 w-5 text-accent" />
              <span className="text-white text-sm font-medium">Make in India</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="h-5 w-5 text-accent" />
              <span className="text-white text-sm font-medium">25+ Years Excellence</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block text-accent">Precision.</span>
            <span className="block text-accent">Innovation.</span>
            <span className="block text-lg lg:text-2xl font-medium text-white opacity-90 mt-4">
              The Royal Standard in Weighing.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            Leading manufacturer of premium digital and electronic weighing scales. 
            Trusted by businesses across India for accuracy, durability, and innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent-dark text-accent-foreground font-semibold px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-primary"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Request Quote
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-8 py-4 text-lg group transition-all duration-300 hover:scale-105"
              onClick={() => window.open('tel:+919377446942', '_self')}
            >
              Call for Consultation
              <Phone className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-accent mb-2">10000+</div>
              <div className="text-white/80">Satisfied Customers</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-white/80">Product Variants</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-white/80">Quality Assured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>

    <QuoteModal 
      isOpen={isQuoteModalOpen}
      onClose={() => setIsQuoteModalOpen(false)}
      productName="General Inquiry"
    />
  </>
  );
};

export default HeroSection;