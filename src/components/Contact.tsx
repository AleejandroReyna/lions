import { getPayload } from 'payload';
import config from '@payload-config';
import ContactForm from './ContactForm';

export default async function Contact() {
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({
    slug: 'settings',
  });

  const email = settings.contactInfo?.email || 'luccaa@lionspublicity.com';
  const phone = settings.contactInfo?.phone || '+502 5517-5800';

  return <ContactForm email={email} phone={phone} />;
}
