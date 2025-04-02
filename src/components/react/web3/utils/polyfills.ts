import { Buffer } from 'buffer';

// Polyfills for Node.js globals in the browser
if (typeof window !== 'undefined') {
  // global
  if (typeof (window as any).global === 'undefined') {
    (window as any).global = globalThis;
  }

  // process
  if (typeof (window as any).process === 'undefined') {
    (window as any).process = {
      env: { NODE_ENV: process.env.NODE_ENV },
      version: '',
      nextTick: (cb: Function) => setTimeout(cb, 0),
    };
  }

  // Buffer
  if (typeof (window as any).Buffer === 'undefined') {
    (window as any).Buffer = {
      isBuffer: (obj: any) => false,
      from: (data: any) => new Uint8Array(data),
    };
  }

  // util
  if (typeof (window as any).util === 'undefined') {
    (window as any).util = {
      inherits: function(ctor: any, superCtor: any) {
        if (superCtor) {
          ctor.super_ = superCtor;
          Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
        }
      },
    };
  }
} 