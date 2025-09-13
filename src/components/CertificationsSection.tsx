import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, CheckCircle, Star, Building, Globe } from 'lucide-react';

const CertificationsSection = () => {
  const certifications = [
    {
      title: "ISO 9001:2015",
      description: "International Quality Management System",
      icon: Award,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Make in India",
      description: "Proudly Manufacturing in India",
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "MSME Certified",
      description: "UDYOG MSME: GJ02A0003268",
      icon: Building,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Manufacturing License",
      description: "License No.: 300001/LM2020/153",
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Vocal for Local",
      description: "Supporting Local Manufacturing",
      icon: Globe,
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      title: "ISA Certified",
      description: "International Standards Approved",
      icon: Shield,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Certifications & Trust
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Certified for <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to quality is backed by international certifications and government approvals
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <Card key={index} className="card-royal group">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-full ${cert.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${cert.color}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {cert.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* GST Information */}
        <div className="bg-gradient-royal-subtle rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">GST Registered Business</h3>
          </div>
          <p className="text-muted-foreground mb-2">
            <strong>GSTIN:</strong> 24ACHFS2624R1ZO
          </p>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Fully Compliant & Authorized
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;