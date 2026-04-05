'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const shortcuts: Record<string, { href: string; label: string }> = {
  h: { href: '/dashboard', label: 'Home' },
  i: { href: '/dashboard/invoices', label: 'Invoices' },
  c: { href: '/dashboard/customers', label: 'Customers' },
  s: { href: '/dashboard/summary', label: 'Summary' },
  o: { href: '/dashboard/outstanding', label: 'Outstanding' },
  r: { href: '/dashboard/reports', label: 'Reports' },
  a: { href: '/dashboard/api-explorer', label: 'API Explorer' },
  n: { href: '/dashboard/invoices/create', label: 'New Invoice' },
};

export default function KeyboardNav() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);
  const [waitingForKey, setWaitingForKey] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

      if (e.key === '?') {
        e.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      if (e.key === 'Escape') {
        setShowHelp(false);
        setWaitingForKey(false);
        return;
      }

      if (e.key === 'g' && !waitingForKey) {
        setWaitingForKey(true);
        timeout = setTimeout(() => setWaitingForKey(false), 1500);
        return;
      }

      if (waitingForKey) {
        setWaitingForKey(false);
        clearTimeout(timeout);
        const shortcut = shortcuts[e.key];
        if (shortcut) {
          e.preventDefault();
          setShowHelp(false);
          router.push(shortcut.href);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeout);
    };
  }, [router, waitingForKey]);

  return (
    <>
      {/* "g" waiting indicator */}
      {waitingForKey && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg">
          Press a key: <kbd className="rounded bg-gray-700 px-1.5 py-0.5 font-mono">h</kbd> home,{' '}
          <kbd className="rounded bg-gray-700 px-1.5 py-0.5 font-mono">i</kbd> invoices,{' '}
          <kbd className="rounded bg-gray-700 px-1.5 py-0.5 font-mono">c</kbd> customers...
        </div>
      )}

      {/* Full help modal */}
      {showHelp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-semibold">Keyboard Shortcuts</h3>
            <div className="space-y-2 text-sm">
              <p className="mb-3 text-gray-500">
                Press <kbd className="rounded border bg-gray-100 px-1.5 py-0.5 font-mono text-xs">g</kbd> then a key:
              </p>
              {Object.entries(shortcuts).map(([key, { label }]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700">{label}</span>
                  <div className="flex items-center gap-1 text-xs">
                    <kbd className="rounded border bg-gray-100 px-1.5 py-0.5 font-mono">g</kbd>
                    <span className="text-gray-400">then</span>
                    <kbd className="rounded border bg-gray-100 px-1.5 py-0.5 font-mono">{key}</kbd>
                  </div>
                </div>
              ))}
              <hr className="my-3" />
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Toggle this help</span>
                <kbd className="rounded border bg-gray-100 px-1.5 py-0.5 font-mono text-xs">?</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
