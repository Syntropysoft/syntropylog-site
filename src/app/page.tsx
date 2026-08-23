import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { negotiateLocale } from '@/config/locales';

export default async function Home() {
  const headersList = await headers();
  redirect(`/${negotiateLocale(headersList.get('accept-language'))}`);
}
