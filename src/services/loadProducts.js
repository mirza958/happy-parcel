import { products } from '../data/products.js';

// A small delay makes loading and recovery visible without needing a backend.
export function loadProducts(mode, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', cancel);
      if (mode === 'failure') reject(new Error('The gift shelf could not load. Your box is still safe.'));
      else resolve(mode === 'empty' ? [] : products.map(p => ({ ...p, stock: mode === 'stock' && p.id === 'sunny-mug' ? 0 : p.stock })));
    }, 450);
    function cancel() { clearTimeout(timer); reject(new DOMException('Cancelled', 'AbortError')); }
    signal.addEventListener('abort', cancel, { once: true });
  });
}
