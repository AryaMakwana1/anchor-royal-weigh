import Header from "@/components/Header";
import ProductCategories from "@/components/ProductCategories";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CartSidebar from "@/components/CartSidebar";

const Products = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProductCategories />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartSidebar />
    </div>
  );
};

export default Products;