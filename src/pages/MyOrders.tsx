import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ChevronRight } from "lucide-react";

type OrderRow = {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items: { id: string; product_name: string; quantity: number }[];
};

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-700",
  confirmed: "bg-blue-500/15 text-blue-700",
  shipped: "bg-indigo-500/15 text-indigo-700",
  delivered: "bg-green-500/15 text-green-700",
  cancelled: "bg-red-500/15 text-red-700",
};

const MyOrders = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, order_number, status, total_amount, created_at, order_items(id, product_name, quantity)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setOrders((data as OrderRow[]) || []);
      setLoading(false);
    })();
  }, [user]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">{t("orders.title")}</h1>

          {!user && <p className="text-muted-foreground">Please sign in.</p>}
          {user && loading && <p>{t("common.loading")}</p>}
          {user && !loading && orders.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-6">{t("orders.no_orders")}</p>
                <Link to="/products"><Button>Browse products</Button></Link>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {orders.map((o) => (
              <Card key={o.id} className="hover:shadow-md transition">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-semibold">{o.order_number}</span>
                      <Badge className={statusColor[o.status] || ""}>{o.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(o.created_at).toLocaleDateString()} ·{" "}
                      {o.order_items?.reduce((s, i) => s + i.quantity, 0) || 0} {t("orders.items")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {o.order_items?.map((i) => `${i.product_name} ×${i.quantity}`).join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      ₹{Number(o.total_amount).toLocaleString()}
                    </div>
                    <Button variant="ghost" size="sm" className="mt-1">
                      {t("orders.view")} <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default MyOrders;