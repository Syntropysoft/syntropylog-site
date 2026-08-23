'use client';

import { useState } from 'react';

import type { NavigationItem } from './Navigation';

/**
 * Client Component — es el único de la navegación que necesita estado.
 *
 * Antes el menú móvil era código muerto: `Navigation` solo renderizaba el botón
 * si le pasaban `onMobileMenuToggle`, y nadie se lo pasaba. La lista de escritorio
 * es `hidden md:flex`, así que en un teléfono el sitio quedaba sin navegación.
 */
export default function MobileMenu({ items }: { items: NavigationItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="md:hidden p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
          />
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm"
        >
          <ul className="flex flex-col items-center space-y-4 py-4 text-slate-300">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="transition-colors hover:text-sky-400"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
