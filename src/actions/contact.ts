'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

export async function submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}) {
    try {
        const payload = await getPayload({ config });

        await payload.create({
            collection: 'contact-requests',
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                company: data.company,
                message: data.message,
            },
        });

        return { success: true };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return { success: false, error: 'Failed to submit message' };
    }
}
