import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  FileText,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import qonexaLogo from "@/assets/qonexa-logo.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Employees", path: "/employees" },
  { icon: CalendarCheck, label: "Attendance", path: "/attendance" },
  { icon: FileText, label: "Leave", path: "/leave" },
  { icon: DollarSign, label: "Payroll", path: "/payroll" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <img
          src={qonexaLogo}
          alt="Qonexa HR"
          className={cn(
            "transition-all duration-300",
            collapsed ? "h-8 w-8 object-contain object-left" : "h-10"
          )}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 flex-shrink-0 transition-colors",
                  isActive ? "text-primary" : ""
                )}
              />
              {!collapsed && (
                <span className="animate-fade-in">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}
