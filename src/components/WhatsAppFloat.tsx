import { MessageSquare } from 'lucide-react';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const message = "Hello! I'm interested in Anchor Digital weighing scales. Please provide more information about your products.";
    const whatsappUrl = `https://wa.me/919377446942?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-float animate-pulse"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppFloat;