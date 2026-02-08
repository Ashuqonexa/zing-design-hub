import { useState, useEffect, useCallback } from "react";
import { Users, Shield, Loader2, Search, UserPlus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AppRole = "admin" | "manager" | "user";

interface UserWithRoles {
  userId: string;
  name: string;
  email: string;
  roles: AppRole[];
}

const roleBadgeStyles: Record<AppRole, string> = {
  admin: "bg-destructive/10 text-destructive border-destructive/30",
  manager: "bg-primary/10 text-primary border-primary/30",
  user: "bg-muted text-muted-foreground border-border",
};

export function RoleManagementCard() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState<AppRole>("user");

  const fetchUsersWithRoles = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, first_name, last_name, email")
        .order("first_name");

      if (profilesError) throw profilesError;

      // Fetch all roles
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) throw rolesError;

      const rolesMap: Record<string, AppRole[]> = {};
      (roles || []).forEach((r) => {
        if (!rolesMap[r.user_id]) rolesMap[r.user_id] = [];
        rolesMap[r.user_id].push(r.role as AppRole);
      });

      const mapped: UserWithRoles[] = (profiles || []).map((p) => ({
        userId: p.user_id,
        name: `${p.first_name || ""} ${p.last_name || ""}`.trim() || "Unnamed User",
        email: p.email || "",
        roles: rolesMap[p.user_id] || [],
      }));

      setUsers(mapped);
    } catch {
      toast({ title: "Error", description: "Failed to load users", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsersWithRoles();
  }, [fetchUsersWithRoles]);

  const assignRole = async (userId: string, role: AppRole) => {
    setSaving(userId);
    try {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role });

      if (error) {
        if (error.code === "23505") {
          toast({ title: "Already assigned", description: `User already has the ${role} role` });
        } else {
          throw error;
        }
      } else {
        toast({ title: "Role Assigned", description: `${role} role has been assigned` });
        await fetchUsersWithRoles();
      }
    } catch {
      toast({ title: "Error", description: "Failed to assign role", variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  const removeRole = async (userId: string, role: AppRole) => {
    setSaving(userId);
    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", role);

      if (error) throw error;

      toast({ title: "Role Removed", description: `${role} role has been removed` });
      await fetchUsersWithRoles();
    } catch {
      toast({ title: "Error", description: "Failed to remove role", variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const usersWithoutRole = users.filter((u) => !u.roles.includes(selectedRole));

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Role Management
            </CardTitle>
            <CardDescription>
              Assign admin or manager roles to control access permissions
            </CardDescription>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Assign Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Role to User</DialogTitle>
                <DialogDescription>
                  Select a user and the role you want to assign.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">User</label>
                  <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {usersWithoutRole.map((u) => (
                        <SelectItem key={u.userId} value={u.userId}>
                          {u.name} {u.email && `(${u.email})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={async () => {
                    if (selectedUserId) {
                      await assignRole(selectedUserId, selectedRole);
                      setAddDialogOpen(false);
                      setSelectedUserId("");
                    }
                  }}
                  disabled={!selectedUserId}
                >
                  Assign Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>User</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead className="w-[180px]">Quick Assign</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.length === 0 && (
                        <span className="text-xs text-muted-foreground">No roles</span>
                      )}
                      {user.roles.map((role) => (
                        <Badge
                          key={role}
                          variant="outline"
                          className={`${roleBadgeStyles[role]} text-xs gap-1`}
                        >
                          {role}
                          <button
                            onClick={() => removeRole(user.userId, role)}
                            className="hover:opacity-70"
                            disabled={saving === user.userId}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {(["admin", "manager"] as AppRole[])
                        .filter((r) => !user.roles.includes(r))
                        .map((role) => (
                          <Button
                            key={role}
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => assignRole(user.userId, role)}
                            disabled={saving === user.userId}
                          >
                            {saving === user.userId ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              `+ ${role}`
                            )}
                          </Button>
                        ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg bg-muted/50 p-4 space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Role Permissions
          </h4>
          <div className="grid gap-1 text-xs text-muted-foreground">
            <p><span className="font-medium text-destructive">Admin</span> — Full access: manage roles, approve leaves, view all attendance & employees</p>
            <p><span className="font-medium text-primary">Manager</span> — Approve/reject leave requests, view all employee attendance</p>
            <p><span className="font-medium">User</span> — Default role: view own data, submit leave requests, clock in/out</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
