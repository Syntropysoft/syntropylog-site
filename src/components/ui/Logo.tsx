'use client';

import Link from 'next/link';
import Image from 'next/image';

export interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/syntropylog-logo.png"
        alt="SyntropyLog"
        width={32}
        height={32}
        className="rounded-lg"
      />
      {showText && (
        <span className="text-xl font-bold">Syntropysoft</span>
      )}
    </Link>
  );
}
