import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Parse accept-language header to get preferred language
  const preferredLanguage = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase())
    .find(lang => lang.startsWith('es') || lang.startsWith('en')) || 'en';
  
  // Redirect to appropriate locale
  const locale = preferredLanguage.startsWith('es') ? 'es' : 'en';
  redirect(`/${locale}`);
}
