import type { CommonMessages } from '@/services/messages';

const LINKS: { key: string; href: string }[] = [
  { key: 'github', href: 'https://github.com/Syntropysoft/SyntropyLog' },
  { key: 'npm', href: 'https://www.npmjs.com/package/syntropylog' },
];

const LINKEDIN = 'https://www.linkedin.com/in/gabriel-alejandro-gomez-652a5111/';

/** Server Component: mismo motivo que el header — los rótulos van resueltos. */
export default function Footer({ messages }: { messages: CommonMessages }) {
  return (
    <footer className="bg-slate-950 border-t border-sky-600/30 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-sky-300">{messages.footer.copyright}</p>
            <p className="mt-1 text-xs text-sky-400">{messages.footer.madeWith}</p>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-sky-400 transition-colors hover:text-sky-300"
            >
              LinkedIn
            </a>
          </div>

          <ul className="flex space-x-6">
            {LINKS.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-sky-300 transition-colors hover:text-blue-400"
                >
                  {messages.navigation[key] ?? key}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
