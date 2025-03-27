
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface LogEntry {
  type: 'info' | 'error' | 'warn' | 'debug';
  message: string;
  timestamp: Date;
}

const DebugConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  useEffect(() => {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    const originalConsoleDebug = console.debug;
    
    console.log = (...args) => {
      originalConsoleLog(...args);
      const message = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg);
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');
      
      setLogs(prev => [...prev, {
        type: 'info',
        message,
        timestamp: new Date()
      }]);
    };
    
    console.error = (...args) => {
      originalConsoleError(...args);
      const message = args.map(arg => String(arg)).join(' ');
      setLogs(prev => [...prev, {
        type: 'error',
        message,
        timestamp: new Date()
      }]);
    };
    
    console.warn = (...args) => {
      originalConsoleWarn(...args);
      const message = args.map(arg => String(arg)).join(' ');
      setLogs(prev => [...prev, {
        type: 'warn',
        message,
        timestamp: new Date()
      }]);
    };
    
    console.debug = (...args) => {
      originalConsoleDebug(...args);
      const message = args.map(arg => String(arg)).join(' ');
      setLogs(prev => [...prev, {
        type: 'debug',
        message,
        timestamp: new Date()
      }]);
    };
    
    console.log('Debug console initialized');
    
    return () => {
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      console.debug = originalConsoleDebug;
    };
  }, []);
  
  if (!isOpen) {
    return (
      <button
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-2 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        Debug
      </button>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 w-96 h-80 bg-background border shadow-lg rounded-lg flex flex-col overflow-hidden">
      <div className="bg-muted p-2 flex items-center justify-between">
        <h3 className="font-medium">Debug Console</h3>
        <button onClick={() => setIsOpen(false)}>
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 text-xs font-mono">
        {logs.map((log, i) => (
          <div 
            key={i}
            className={`mb-1 p-1 ${
              log.type === 'error' ? 'text-red-500 bg-red-50 dark:bg-red-900/20' :
              log.type === 'warn' ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' :
              log.type === 'debug' ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' :
              ''
            }`}
          >
            <span className="opacity-60">[{log.timestamp.toLocaleTimeString()}]</span> {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugConsole;
