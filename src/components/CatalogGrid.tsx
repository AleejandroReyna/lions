'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronRight, X, LayoutGrid, List, ChevronLeft, Loader2 } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    thumbnail: any;
    type: any;
    description?: string;
    isNew?: boolean;
}

interface ProductType {
    id: string;
    name: string;
}

interface PaginationInfo {
    totalPages: number;
    totalDocs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
}

interface CatalogGridProps {
    products: Product[];
    pagination: PaginationInfo;
    productTypes: ProductType[];
}

export default function CatalogGrid({ products, pagination, productTypes }: CatalogGridProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Get current filters from URL
    const currentPage = Number(searchParams.get('page')) || 1;
    const currentSearch = searchParams.get('search') || '';
    const selectedTypes = searchParams.get('types')?.split(',').filter(Boolean) || [];

    const updateFilters = (updates: { page?: number; search?: string; types?: string[] }) => {
        const params = new URLSearchParams(searchParams.toString());

        if (updates.page !== undefined) {
            params.set('page', updates.page.toString());
        } else if (updates.search !== undefined || updates.types !== undefined) {
            // Reset to page 1 on filter/search change
            params.set('page', '1');
        }

        if (updates.search !== undefined) {
            if (updates.search) params.set('search', updates.search);
            else params.delete('search');
        }

        if (updates.types !== undefined) {
            if (updates.types.length > 0) params.set('types', updates.types.join(','));
            else params.delete('types');
        }

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    const toggleType = (typeId: string) => {
        const newTypes = selectedTypes.includes(typeId)
            ? selectedTypes.filter(id => id !== typeId)
            : [...selectedTypes, typeId];
        updateFilters({ types: newTypes });
    };

    return (
        <section className="bg-white min-h-screen pb-24">
            {/* Catalog Hero - Refined with Video Background */}
            <div className="relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0 text-center">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                        key="/home/hero.mp4"
                    >
                        <source src="/home/hero.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/50 z-10" />
                </div>

                <div className="relative z-20 text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">
                        Nuestro <span className="relative inline-block">
                            Catálogo
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-white" />
                        </span>
                    </h1>
                </div>
            </div>

            <div className="max-w-8xl mx-auto px-6 md:px-20 mt-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-medium text-black/40 uppercase tracking-widest mb-10">
                    <Link href="/" className="hover:text-black transition-colors text-nowrap">Inicio</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-black/80 font-bold">Catálogo</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Filters Sidebar - Desktop */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-32 bg-[#F8F8F8] p-8 rounded-xl border border-black/5">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
                                <h3 className="text-sm font-black uppercase tracking-widest">Filtros</h3>
                                <SlidersHorizontal className="w-4 h-4 text-black/40" />
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-black/40">Categorías</h4>
                                    <div className="space-y-4">
                                        {productTypes.map((type) => (
                                            <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        className="peer appearance-none w-5 h-5 border border-black/20 rounded group-hover:border-black transition-colors checked:bg-black checked:border-black"
                                                        checked={selectedTypes.includes(type.id)}
                                                        onChange={() => toggleType(type.id)}
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                                                        <div className="w-2 h-2 bg-white rounded-sm" />
                                                    </div>
                                                </div>
                                                <span className={`text-sm tracking-tight transition-colors ${selectedTypes.includes(type.id) ? 'text-black font-bold' : 'text-black/60 group-hover:text-black'}`}>
                                                    {type.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => updateFilters({ types: [], search: '' })}
                                    className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-black/90 transition-all"
                                >
                                    Limpiar Filtros
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-grow">
                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-black/5">
                            <p className="text-xs font-medium text-black/40 uppercase tracking-widest">
                                Mostrando <span className="text-black font-bold">{pagination.totalDocs}</span> resultados
                            </p>

                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="relative flex-grow md:flex-grow-0 md:w-64">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        value={currentSearch}
                                        onChange={(e) => updateFilters({ search: e.target.value })}
                                        className="w-full bg-[#F8F8F8] border-none rounded-lg py-3 pl-12 pr-4 focus:ring-1 focus:ring-black/10 text-sm"
                                    />
                                </div>
                                <div className="hidden md:flex items-center gap-2 border-l border-black/5 pl-6">
                                    <button className="p-2 bg-black text-white rounded"><LayoutGrid className="w-4 h-4" /></button>
                                    <button className="p-2 text-black/40"><List className="w-4 h-4" /></button>
                                </div>
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className="lg:hidden p-3 bg-[#F8F8F8] rounded-lg hover:bg-black/5 transition-all ml-auto"
                                >
                                    <SlidersHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="relative min-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={searchParams.toString()}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12"
                                >
                                    {products.map((product, index) => (
                                        <motion.article
                                            key={product.id}
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: {
                                                    opacity: 1,
                                                    transition: { delay: index * 0.05, duration: 0.5 }
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    transition: { delay: index * 0.05, duration: 0.3 }
                                                }
                                            }}
                                            className="group bg-[#F8F8F8] rounded-2xl overflow-hidden flex flex-col h-full border border-black/[0.03] transition-colors"
                                        >
                                            <div className="aspect-square overflow-hidden relative">
                                                {product.isNew && (
                                                    <span className="absolute top-4 left-4 z-20 bg-black text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-sm">
                                                        Nuevo
                                                    </span>
                                                )}
                                                <Image
                                                    src={product.thumbnail?.url || '/home/service.webp'}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain p-8 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="p-8 pt-0 flex flex-col flex-grow">
                                                <div className="space-y-3 flex-grow">
                                                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30">
                                                        {typeof product.type === 'object' ? product.type.name : ''}
                                                    </p>
                                                    <h3 className="text-xl font-black uppercase tracking-tight leading-tight transition-colors line-clamp-2">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-black/50 line-clamp-2 leading-relaxed">
                                                        {product.description || 'Calidad y durabilidad garantizada en cada uno de nuestros productos personalizados.'}
                                                    </p>
                                                </div>
                                                <div className="pt-6">
                                                    <button className="w-full bg-[#2D2D2D] text-white px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all hover:shadow-lg active:scale-[0.98]">
                                                        Ver Detalles +
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {products.length === 0 && !isPending && (
                                <div className="py-24 text-center">
                                    <Search className="w-12 h-12 text-black/10 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold opacity-30 uppercase tracking-widest">No se encontraron productos</h3>
                                </div>
                            )}

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="mt-20 flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => updateFilters({ page: Math.max(1, currentPage - 1) })}
                                        disabled={!pagination.hasPrevPage || isPending}
                                        className="p-3 rounded-lg border border-black/5 hover:bg-black hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-black"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center gap-2 px-4 overflow-x-auto max-w-[200px] md:max-w-none no-scrollbar">
                                        {[...Array(pagination.totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => updateFilters({ page: i + 1 })}
                                                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all flex-shrink-0 ${pagination.page === i + 1 ? 'bg-black text-white' : 'hover:bg-black/5'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => updateFilters({ page: Math.min(pagination.totalPages, currentPage + 1) })}
                                        disabled={!pagination.hasNextPage || isPending}
                                        className="p-3 rounded-lg border border-black/5 hover:bg-black hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-black"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[85%] bg-white z-[101] p-10 flex flex-col lg:hidden"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Filtros</h2>
                                <button onClick={() => setIsFilterOpen(false)}>
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-black/40">Categorías</h3>
                                <div className="space-y-6">
                                    {productTypes.map((type) => (
                                        <label key={type.id} className="flex items-center gap-4 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="w-6 h-6 border-black/20 rounded checked:bg-black"
                                                checked={selectedTypes.includes(type.id)}
                                                onChange={() => toggleType(type.id)}
                                            />
                                            <span className={`text-xl font-bold uppercase ${selectedTypes.includes(type.id) ? 'text-black' : 'text-black/30'}`}>
                                                {type.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="mt-8 bg-black text-white py-6 rounded-xl font-bold uppercase tracking-widest text-xs"
                            >
                                Aplicar filtros
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
