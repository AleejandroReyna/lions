import { getPayload } from 'payload';
import config from '@payload-config';
import CatalogGrid from '@/components/CatalogGrid';
import { Metadata } from 'next';
import { getProductsAction } from './actions';

export const metadata: Metadata = {
    title: 'Catálogo | LIONS Publicity',
    description: 'Explora nuestro catálogo completo de productos promocionales y publicitarios.',
};

interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        types?: string;
    }>;
}

export default async function Catalog({ searchParams }: PageProps) {
    const { page, search, types } = await searchParams;

    const payload = await getPayload({ config });

    const { docs: productTypes } = await payload.find({
        collection: 'product-types',
        limit: 100,
        sort: 'createdAt',
    });

    const currentPage = Number(page) || 1;
    const categories = types?.split(',').filter(Boolean) || [];

    const result = await getProductsAction({
        limit: 1, // Keep limit at 1 for testing as requested
        page: currentPage,
        search: search || '',
        categories: categories,
    });

    const paginationInfo = {
        totalPages: result.totalPages,
        totalDocs: result.totalDocs,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        page: result.page as number,
    };

    return (
        <main>
            <CatalogGrid
                products={result.docs as any}
                pagination={paginationInfo}
                productTypes={productTypes}
            />
        </main>
    );
}