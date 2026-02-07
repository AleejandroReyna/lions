'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

export async function getProductsAction(options: {
    categories?: string[];
    page?: number;
    limit?: number;
    search?: string;
}) {
    const { categories = [], page = 1, limit = 1, search = '' } = options;
    const payload = await getPayload({ config });

    const where: any = {};

    if (categories.length > 0) {
        where.type = {
            in: categories,
        };
    }

    if (search) {
        where.name = {
            contains: search,
        };
    }

    const result = await payload.find({
        collection: 'products',
        where,
        page,
        limit,
        sort: 'createdAt',
    });

    return {
        docs: result.docs.map(doc => ({
            ...doc,
            // Ensure we pass plain objects
            id: doc.id,
        })),
        totalPages: result.totalPages,
        totalDocs: result.totalDocs,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        page: result.page,
    };
}
