import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import CertificationsSection from "@/components/CertificationsSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CartSidebar from "@/components/CartSidebar";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AboutSection />
        <CertificationsSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartSidebar />
    </div>
  );
};

export default About;