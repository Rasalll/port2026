"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface JsonViewerProps {
  data: any;
  title?: string;
  status?: number;
  delay?: number;
}

const colorizeLine = (line: string) => {
  // Simple regex-based syntax highlighter for a formatted JSON line
  const keyRegex = /^(\s*)(".*?")(:)(.*)$/;
  const keyMatch = line.match(keyRegex);

  if (keyMatch) {
    const [_, indent, key, colon, rest] = keyMatch;
    return (
      <span>
        {indent}
        <span className="text-[var(--color-api-key)]">{key}</span>
        <span className="text-foreground/80">{colon}</span>
        {colorizeValue(rest)}
      </span>
    );
  }

  return <span>{colorizeValue(line)}</span>;
};

const colorizeValue = (val: string) => {
  if (!val) return val;
  
  if (val.trim().startsWith('"')) {
    const strMatch = val.match(/^(\s*)(".*?")(,?)(\s*)$/);
    if (strMatch) {
      const isUrl = strMatch[2].match(/^"http/);
      const strContent = isUrl ? (
        <a href={strMatch[2].replace(/"/g, '')} target="_blank" rel="noopener noreferrer" className="text-[var(--color-api-string)] hover:underline">
          {strMatch[2]}
        </a>
      ) : (
        <span className="text-[var(--color-api-string)]">{strMatch[2]}</span>
      );
      return <span>{strMatch[1]}{strContent}<span className="text-foreground/80">{strMatch[3]}</span>{strMatch[4]}</span>;
    }
  }
  
  if (val.match(/\b(true|false)\b/)) {
    return <span dangerouslySetInnerHTML={{ __html: val.replace(/\b(true|false)\b/, '<span class="text-[var(--color-api-boolean)]">$1</span>') }} />;
  }
  if (val.match(/\bnull\b/)) {
    return <span dangerouslySetInnerHTML={{ __html: val.replace(/\bnull\b/, '<span class="text-[var(--color-api-null)]">null</span>') }} />;
  }
  if (val.match(/\b\d+(\.\d+)?\b/)) {
    return <span dangerouslySetInnerHTML={{ __html: val.replace(/\b\d+(\.\d+)?\b/, '<span class="text-[var(--color-api-number)]">$&</span>') }} />;
  }
  
  return <span className="text-foreground/80">{val}</span>;
};

export function JsonViewer({ data, title = "Response", status = 200 }: JsonViewerProps) {
  const [fetching, setFetching] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [responseTime, setResponseTime] = useState(0);

  useEffect(() => {
    // Reset state when data changes (e.g., navigating to new endpoint)
    setFetching(true);
    setVisibleLines(0);
    
    // Process JSON lines
    const jsonString = JSON.stringify(data, null, 2);
    const parsedLines = jsonString.split('\n');
    setLines(parsedLines);
    
    // Simulate fetch delay
    const fetchDelay = Math.floor(Math.random() * 200) + 300; // 300-500ms
    setResponseTime(fetchDelay);
    
    const fetchTimer = setTimeout(() => {
      setFetching(false);
    }, fetchDelay);

    return () => clearTimeout(fetchTimer);
  }, [data]);

  useEffect(() => {
    if (!fetching && visibleLines < lines.length) {
      const typeTimer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 150); // 150ms per line as requested
      return () => clearTimeout(typeTimer);
    }
  }, [fetching, visibleLines, lines.length]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg border border-border bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm sm:text-base min-h-[300px]">
      
      {fetching ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
          <div className="text-secondary flex items-center gap-3">
            <span className="text-secondary">● Fetching {title} ...</span>
          </div>
          <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: responseTime / 1000, ease: "easeInOut" }}
            />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col h-full"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-[#161b22]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#f85149]" />
                <div className="w-3 h-3 rounded-full bg-[#d29922]" />
                <div className="w-3 h-3 rounded-full bg-[#3fb950]" />
              </div>
              <span className="ml-2 text-xs text-muted-foreground">{title}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-muted-foreground">Status:</span>
              <span className={status === 200 ? "text-primary" : "text-[#d29922]"}>
                {status} OK
              </span>
              <span className="text-muted-foreground">Time:</span>
              <span className="text-secondary">{responseTime}ms</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4 sm:p-6 overflow-x-auto leading-relaxed relative flex-1">
            {lines.slice(0, visibleLines).map((line, index) => (
              <div key={index} className="whitespace-pre">
                {colorizeLine(line)}
                {index === visibleLines - 1 && visibleLines < lines.length && (
                  <span className="inline-block w-[7px] h-[13px] bg-primary align-middle ml-1 animate-[blink_1s_step-end_infinite]"></span>
                )}
              </div>
            ))}
            {visibleLines === lines.length && (
              <div className="mt-4 text-muted-foreground/50 text-xs flex items-center gap-2">
                <span className="text-primary">EOF</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
