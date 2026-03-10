import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  LayoutDashboard, Users, Calendar, FileText, Truck,
  Home, Package, BarChart3, BookOpen, AlertTriangle,
  Settings, Bell, Search, ChevronLeft, ChevronRight,
  Activity, UserCheck, ClipboardList, LogOut, Globe,
  Shield, Menu, X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navGroups = [
  {
    label: "Operations",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
      { name: "Patients", icon: Users, page: "Patients" },
      { name: "Sessions", icon: Calendar, page: "Sessions" },
      { name: "Session Notes", icon: ClipboardList, page: "SessionNotes" },
    ]
  },
  {
    label: "Care Coordination",
    items: [
      { name: "Home Dialysis", icon: Home, page: "HomeDialysis" },
      { name: "Transport", icon: Truck, page: "Transport" },
      { name: "Reimbursement", icon: FileText, page: "Reimbursement" },
      { name: "Alerts", icon: AlertTriangle, page: "Alerts", badge: "red" },
    ]
  },
  {
    label: "Staff & Quality",
    items: [
      { name: "Staff Scheduling", icon: UserCheck, page: "Scheduling" },
      { name: "Incidents", icon: Activity, page: "Incidents" },
      { name: "Inventory", icon: Package, page: "Inventory" },
      { name: "Training & SOPs", icon: BookOpen, page: "Training" },
    ]
  },
  {
    label: "Analytics & Admin",
    items: [
      { name: "Analytics", icon: BarChart3, page: "Analytics" },
      { name: "Documents", icon: FileText, page: "Documents" },
      { name: "Settings", icon: Settings, page: "Settings" },
    ]
  }
];

export default function Layout({ children, currentPageName }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState("DE");
  const location = useLocation();

  const isActive = (page) => currentPageName === page;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-sidebar-muted ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center flex-shrink-0">
          <Activity className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-white font-bold text-sm leading-tight">DialyseOps</div>
            <div className="text-sidebar-foreground/60 text-xs">Germany</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navGroups.map(group => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <div className="text-sidebar-foreground/40 text-[10px] font-semibold uppercase tracking-widest px-3 mb-1.5">
                {group.label}
              </div>
            )}
            {group.items.map(item => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 transition-all group ${
                  isActive(item.page)
                    ? "bg-sidebar-accent/20 text-white"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-muted hover:text-white"
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive(item.page) ? 'text-blue-400' : ''}`} />
                {!collapsed && (
                  <span className="text-sm font-medium flex-1">{item.name}</span>
                )}
                {!collapsed && item.badge === "red" && (
                  <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-muted p-3">
        {!collapsed && (
          <div className="flex items-center gap-2 px-2 py-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">Admin User</div>
              <div className="text-sidebar-foreground/50 text-[10px]">Center Admin</div>
            </div>
            <Shield className="w-3.5 h-3.5 text-sidebar-foreground/40" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground/50 hover:text-white hover:bg-sidebar-muted transition-all text-xs"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background font-inter overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar — mobile */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar lg:hidden transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Sidebar — desktop */}
      <aside className={`hidden lg:flex flex-col bg-sidebar transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'} flex-shrink-0`}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-card border-b border-border flex items-center gap-3 px-4 flex-shrink-0">
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-accent" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9 h-8 text-sm bg-accent border-0" placeholder="Patient suchen..." />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* AI Banner */}
            <div className="hidden md:flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs px-2.5 py-1 rounded-lg">
              <AlertTriangle className="w-3 h-3" />
              <span>KI-Entwürfe erfordern menschliche Prüfung</span>
            </div>

            <button
              onClick={() => setLang(lang === "DE" ? "EN" : "DE")}
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground px-2 py-1 rounded border border-border hover:bg-accent transition"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang}
            </button>

            <button className="relative p-1.5 rounded-lg hover:bg-accent">
              <Bell className="w-4.5 h-4.5 text-muted-foreground" style={{width:'18px',height:'18px'}} />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
