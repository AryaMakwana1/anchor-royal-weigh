import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Shield, Star } from 'lucide-react';
import facilityBg from '@/assets/facility-background.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Updated Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-zoom"
        style={{
          backgroundImage: `url(${facilityBg})`
        }}
      />
      {/* Dark Blue Overlay with Reduced Opacity */}
      <div className="absolute inset-0 bg-gray-900/75" />
      {/* Light Blue Transparent Overlay for Softer Look */}
      <div className="absolute inset-0 bg-blue-900/20" />
      
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
            <span className="block text-primary">Precision.</span>
            <span className="block text-primary">Innovation.</span>
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
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-secondary font-semibold px-8 py-4 text-lg group transition-all duration-300 hover:scale-105"
              onClick={() => window.open('tel:+919377446942', '_self')}
            >
              Call for Consultation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-primary mb-2">10000+</div>
              <div className="text-white/80">Satisfied Customers</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-white/80">Product Variants</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-white/80">Quality Assured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;