import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CartSidebar from "@/components/CartSidebar";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartSidebar />
    </div>
  );
};

export default Contact;