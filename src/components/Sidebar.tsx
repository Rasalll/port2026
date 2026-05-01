"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Code, Database, User, Mail, Briefcase } from "lucide-react";

const endpoints = [
  { path: "/", method: "GET", name: "/status", desc: "System health & overview", icon: Terminal },
  { path: "/about", method: "GET", name: "/about", desc: "Developer background", icon: User },
  { path: "/projects", method: "GET", name: "/projects", desc: "Deployed applications", icon: Code },
  { path: "/skills", method: "GET", name: "/skills", desc: "Technical competencies", icon: Database },
  { path: "/experience", method: "GET", name: "/experience", desc: "Professional timeline", icon: Briefcase },
  { path: "/contact", method: "POST", name: "/contact", desc: "Send direct message", icon: Mail },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-72 border-r border-border bg-background/50 backdrop-blur-md flex flex-col h-full z-10 sticky top-0 md:h-screen">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold flex items-center gap-2 text-primary">
          <Terminal className="w-5 h-5" />
          <span>system_api</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-2">v1.0.0-stable</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
          Endpoints
        </div>
        {endpoints.map((endpoint) => {
          const isActive = pathname === endpoint.path;
          const Icon = endpoint.icon;

          return (
            <Link
              key={endpoint.path}
              href={endpoint.path}
              className={`block relative group overflow-hidden border rounded-lg p-3 transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-primary/50 ${
                isActive
                  ? "border-primary bg-gradient-to-r from-[#1a2e1a] to-transparent text-primary"
                  : "border-border bg-card/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-indicator"
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary shadow-[0_0_8px_#4ade80]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="flex flex-col gap-1.5 w-full z-10 relative">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    endpoint.method === "GET" 
                      ? "bg-secondary/20 text-secondary" 
                      : "bg-[#f472b6]/20 text-[#f472b6]" // Pink for POST
                  }`}>
                    {endpoint.method}
                  </span>
                  <span className="font-mono text-sm font-semibold">{endpoint.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{endpoint.desc}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>Status:</span>
          <span className="flex items-center gap-2 text-primary font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Online
          </span>
        </div>
      </div>
    </aside>
  );
}
