import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Inbox } from "lucide-react";

type OrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  mobile: string;
  email: string;
  city: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items: { product_name: string; quantity: number }[];
};

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const AdminOrders = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("id, order_number, customer_name, mobile, email, city, status, total_amount, created_at, order_items(product_name, quantity)")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Failed to load orders", description: error.message, variant: "destructive" });
    setOrders((data as OrderRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast({ title: "Order updated" });
  };

  if (!isAdmin) {
    return <div className="p-12 text-center">Admin access required.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin">
              <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Admin</Button>
            </Link>
            <h1 className="text-2xl font-bold">Orders & Inquiries</h1>
          </div>
          <Badge variant="secondary">{orders.length} orders</Badge>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <p>Loading…</p>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Inbox className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No orders yet.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-mono text-xs">{o.order_number}</TableCell>
                      <TableCell>
                        <div className="font-medium">{o.customer_name}</div>
                        <div className="text-xs text-muted-foreground">{o.city}</div>
                      </TableCell>
                      <TableCell className="text-xs">
                        <div>{o.mobile}</div>
                        <div className="text-muted-foreground">{o.email}</div>
                      </TableCell>
                      <TableCell className="text-xs max-w-xs">
                        {o.order_items?.map((i) => `${i.product_name} ×${i.quantity}`).join(", ")}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{Number(o.total_amount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(o.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminOrders;