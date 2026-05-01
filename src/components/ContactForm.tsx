"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { JsonViewer } from "./JsonViewer";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-lg border border-border bg-card/50 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="mb-6 border-b border-border pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded">POST</span>
            <span className="font-mono">/contact</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2">Construct the payload body to send a message.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-mono text-[var(--color-api-key)]">"name":</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full bg-input/50 border border-border rounded p-2 text-sm text-[var(--color-api-string)] font-mono focus:outline-none focus:ring-1 focus:ring-primary"
              required
              disabled={status === "submitting" || status === "success"}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-mono text-[var(--color-api-key)]">"email":</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full bg-input/50 border border-border rounded p-2 text-sm text-[var(--color-api-string)] font-mono focus:outline-none focus:ring-1 focus:ring-primary"
              required
              disabled={status === "submitting" || status === "success"}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-mono text-[var(--color-api-key)]">"subject":</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Topic"
              className="w-full bg-input/50 border border-border rounded p-2 text-sm text-[var(--color-api-string)] font-mono focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={status === "submitting" || status === "success"}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-mono text-[var(--color-api-key)]">"message":</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={4}
              className="w-full bg-input/50 border border-border rounded p-2 text-sm text-[var(--color-api-string)] font-mono focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              required
              disabled={status === "submitting" || status === "success"}
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            className="w-full mt-4 bg-primary text-primary-foreground font-mono font-bold py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Sending...
              </span>
            ) : status === "success" ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Sent
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Execute Request
              </span>
            )}
          </button>
        </form>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute bottom-4 left-4 right-4 bg-green-500/20 border border-green-500/50 text-green-400 p-3 rounded-md flex items-center justify-center gap-2 shadow-lg backdrop-blur-md"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="font-mono text-sm">201 Created - Message Sent</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Payload preview side */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Request Payload Preview</h3>
        <JsonViewer 
          data={formData} 
          title="Payload body" 
          status={status === "success" ? 201 : 200} 
        />
        
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mt-4 mb-4">Response</h3>
            <JsonViewer 
              data={{ success: true, message: "Thank you for reaching out. I'll get back to you soon.", id: "msg_" + Math.random().toString(36).substring(2, 9) }} 
              title="Response body" 
              status={201} 
              delay={0.1}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
