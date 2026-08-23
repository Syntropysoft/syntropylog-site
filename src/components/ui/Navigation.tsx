import MobileMenu from './MobileMenu';

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Server Component: los rótulos llegan resueltos, así que el crawler lee "GitHub"
 * y no `navigation.github`. Lo único cliente es el menú móvil, que tiene estado.
 */
export default function Navigation({ items }: { items: NavigationItem[] }) {
  return (
    <>
      <ul className="hidden md:flex items-center space-x-8 text-slate-300">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="transition-colors hover:text-sky-400"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <MobileMenu items={items} />
    </>
  );
}
