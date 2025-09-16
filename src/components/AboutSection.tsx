import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Target, Heart } from 'lucide-react';
import ownerPhoto from '@/assets/owner-photo.png';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            About Us
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Excellence in <span className="text-primary">Precision</span> Since 1998
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Owner Introduction */}
          <div>
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <img 
                  src={ownerPhoto}
                  alt="Shaileshbhai Mansukhbhai Makwana - Founder"
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full">
                  <Award className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Shaileshbhai Mansukhbhai Makwana</h3>
                <p className="text-primary font-semibold mb-1">Founder & Managing Director</p>
                <p className="text-muted-foreground">Visionary Leader in Weighing Technology</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                With over 25 years of experience in the weighing industry, Shaileshbhai has built 
                Shree Ram Metal into one of India's most trusted manufacturers of digital weighing solutions.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                His commitment to precision, quality, and customer satisfaction has made Anchor Digital 
                a preferred choice for businesses across various industries, from small retailers to 
                large manufacturing units.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">25+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Company Values */}
          <div className="space-y-6">
            <Card className="card-royal">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Our Mission</h4>
                    <p className="text-muted-foreground">
                      To provide world-class weighing solutions that combine precision, 
                      reliability, and innovation, helping businesses achieve accurate 
                      measurements and operational excellence.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-royal">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Our Vision</h4>
                    <p className="text-muted-foreground">
                      To be India's leading manufacturer of digital weighing scales, 
                      recognized for innovation, quality, and customer-centric solutions 
                      across all industry verticals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-royal">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Our Values</h4>
                    <p className="text-muted-foreground">
                      Integrity, quality, customer satisfaction, and continuous innovation 
                      are the pillars that guide our every decision and fuel our 
                      commitment to excellence.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Company Highlights */}
        <div className="bg-gradient-royal-subtle rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <Users className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Skilled Professionals</div>
            </div>
            <div>
              <Award className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold text-primary mb-2">ISO</div>
              <div className="text-muted-foreground">9001:2015 Certified</div>
            </div>
            <div>
              <Target className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Quality Assured</div>
            </div>
            <div>
              <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;