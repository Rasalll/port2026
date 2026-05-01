"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

const endpoints = [
  { path: "/", name: "/status" },
  { path: "/about", name: "/about" },
  { path: "/projects", name: "/projects" },
  { path: "/skills", name: "/skills" },
  { path: "/experience", name: "/experience" },
  { path: "/contact", name: "/contact" },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      {/* Progress Bar */}
      <motion.div
        className="h-[3px] bg-primary w-full origin-left shadow-[0_0_10px_#4ade80]"
        style={{ scaleX }}
      />
      
      {/* Nav Tabs */}
      <div className="w-full flex justify-center mt-2 pointer-events-auto">
        <div className="bg-background/80 backdrop-blur border border-border rounded-full px-4 py-1.5 flex gap-2 shadow-lg max-w-[90vw] overflow-x-auto no-scrollbar">
          {endpoints.map((endpoint, i) => {
            const isActive = pathname === endpoint.path;
            return (
              <div key={endpoint.path} className="flex items-center">
                <Link
                  href={endpoint.path}
                  className={`text-xs font-mono px-2 py-1 relative whitespace-nowrap transition-colors ${
                    isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {endpoint.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    />
                  )}
                </Link>
                {i < endpoints.length - 1 && (
                  <span className="text-muted-foreground/30 mx-1">·</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
