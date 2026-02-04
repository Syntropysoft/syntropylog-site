'use client';

import React from 'react';

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

// Componente reutilizable para renderizar un item de navegación
function NavigationLink({ item, onClick }: { item: NavigationItem; onClick?: () => void }) {
  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      className="hover:text-sky-400 transition-colors"
      onClick={onClick}
    >
      {item.label}
    </a>
  );
}

// Componente para el botón del menú móvil
function MobileMenuButton({ 
  isOpen, 
  onToggle 
}: { 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden text-white p-2"
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        )}
      </svg>
    </button>
  );
}

export default function Navigation({
  items,
  className = '',
  mobileMenuOpen = false,
  onMobileMenuToggle,
}: NavigationProps) {
  return (
    <>
      {/* Desktop Navigation */}
      <ul className={`hidden md:flex items-center space-x-8 text-slate-300 ${className}`}>
        {items.map((item, index) => (
          <li key={index}>
            <NavigationLink item={item} />
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      {onMobileMenuToggle && (
        <MobileMenuButton 
          isOpen={mobileMenuOpen} 
          onToggle={onMobileMenuToggle} 
        />
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
          <ul className="flex flex-col items-center space-y-4 py-4 text-slate-300">
            {items.map((item, index) => (
              <li key={index}>
                <NavigationLink 
                  item={item} 
                  onClick={onMobileMenuToggle}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
} 