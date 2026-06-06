import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, Plus, Search, ShieldCheck, Trash2, UserPlus, Package } from 'lucide-react';

interface AdminRow {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  provider: string | null;
  avatar_url: string | null;
  full_name: string | null;
}

const AdminUsers: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('manage-admin-users', {
      body: { action: 'list' },
    });
    if (error || (data as any)?.error) {
      toast({
        title: 'Failed to load admins',
        description: (data as any)?.error || error?.message,
        variant: 'destructive',
      });
    } else {
      setAdmins((data as any).admins ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setAdding(true);
    const { data, error } = await supabase.functions.invoke('manage-admin-users', {
      body: { action: 'add', email: newEmail.trim() },
    });
    setAdding(false);
    if (error || (data as any)?.error) {
      toast({
        title: 'Could not add admin',
        description: (data as any)?.error || error?.message,
        variant: 'destructive',
      });
      return;
    }
    toast({ title: 'Admin added', description: newEmail });
    setNewEmail('');
    load();
  };

  const handleRemove = async (id: string) => {
    const { data, error } = await supabase.functions.invoke('manage-admin-users', {
      body: { action: 'remove', id },
    });
    if (error || (data as any)?.error) {
      toast({
        title: 'Could not remove admin',
        description: (data as any)?.error || error?.message,
        variant: 'destructive',
      });
      return;
    }
    toast({ title: 'Admin removed' });
    load();
  };

  const filtered = admins.filter((a) =>
    `${a.email} ${a.full_name ?? ''}`.toLowerCase().includes(search.toLowerCase())
  );

  const initials = (row: AdminRow) =>
    (row.full_name || row.email || '?')
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-xl font-bold leading-tight">Admin Users</h1>
              <p className="text-xs text-muted-foreground">
                Manage who can access the admin dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin">
                <Package className="h-4 w-4 mr-2" />
                Products
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total admins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{admins.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Signed in with Google</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {admins.filter((a) => a.provider === 'google').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium truncate">{user?.email}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add admin by email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 space-y-1">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="person@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={adding}>
                {adding ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Add admin
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              The person must sign in with Google at least once before they can be granted admin
              access.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle>Admin list</CardTitle>
            <div className="relative w-full max-w-xs">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading admins…
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No admins found.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Last sign in</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((row) => {
                      const isSelf = row.user_id === user?.id;
                      return (
                        <TableRow key={row.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                {row.avatar_url ? (
                                  <AvatarImage src={row.avatar_url} alt={row.email} />
                                ) : null}
                                <AvatarFallback>{initials(row)}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="font-medium truncate">
                                  {row.full_name || '—'}
                                </div>
                                {isSelf && (
                                  <Badge variant="secondary" className="mt-1">
                                    You
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{row.email}</TableCell>
                          <TableCell>
                            {row.provider ? (
                              <Badge variant="outline" className="capitalize">
                                {row.provider}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {row.last_sign_in_at
                              ? new Date(row.last_sign_in_at).toLocaleString()
                              : '—'}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(row.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  disabled={isSelf}
                                  title={isSelf ? 'You cannot remove yourself' : 'Remove admin'}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove admin access?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {row.email} will lose access to the admin dashboard. Their user
                                    account will not be deleted.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleRemove(row.id)}>
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminUsers;