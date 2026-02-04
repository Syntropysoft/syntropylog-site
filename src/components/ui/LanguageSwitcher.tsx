'use client';

import { useLanguageSwitcher } from '../../hooks/useLanguageSwitcher';

export interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { changeLanguage, currentLocale } = useLanguageSwitcher();

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-sky-800/50 border border-sky-600/30 rounded px-3 py-1 text-sm"
        defaultValue={currentLocale}
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}
