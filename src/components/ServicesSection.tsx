import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Truck, 
  Users, 
  Settings, 
  PhoneCall, 
  Award,
  CheckCircle,
  Clock
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: "Comprehensive Warranty",
      description: "Complete warranty coverage on all products with hassle-free claim process",
      features: ["1-3 Year Warranty", "Nationwide Coverage", "Quick Resolution"]
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and secure delivery across India with real-time tracking",
      features: ["Pan-India Delivery", "Secure Packaging", "Order Tracking"]
    },
    {
      icon: Settings,
      title: "Technical Support",
      description: "Expert technical assistance for installation, calibration, and maintenance",
      features: ["Remote Support", "On-site Service", "Expert Guidance"]
    },
    {
      icon: Users,
      title: "B2B & B2C Solutions",
      description: "Tailored solutions for both business and individual customers",
      features: ["Bulk Orders", "Custom Solutions", "Flexible Terms"]
    }
  ];

  const businessModels = [
    {
      type: "B2B (Business to Business)",
      description: "Bulk orders, distributor partnerships, and enterprise solutions",
      benefits: [
        "Volume-based pricing",
        "Dedicated account manager",
        "Flexible payment terms",
        "Priority support"
      ]
    },
    {
      type: "B2C (Business to Consumer)",
      description: "Individual purchases with full retail support and services",
      benefits: [
        "Competitive retail pricing",
        "Home delivery available",
        "Easy return policy",
        "Personal consultation"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Our Services
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Complete <span className="text-primary">Weighing Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From product selection to after-sales support, we provide end-to-end services 
            to ensure your complete satisfaction and business success.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="card-royal group text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-4 rounded-full inline-block mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="h-8 w-8 text-primary group-hover:text-current" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Business Models */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Flexible <span className="text-primary">Business Models</span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {businessModels.map((model, index) => (
              <Card key={index} className="card-royal">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{model.type}</h4>
                      <p className="text-muted-foreground text-sm">{model.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {model.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-royal-subtle rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <PhoneCall className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Need Expert Consultation?</h3>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our experienced team is ready to help you choose the perfect weighing solution 
            for your specific needs. Get personalized recommendations and quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary-dark">
              <PhoneCall className="h-5 w-5 mr-2" />
              Call for Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Clock className="h-5 w-5 mr-2" />
              Request Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;