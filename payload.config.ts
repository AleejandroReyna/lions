import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb' // <--- El cambio clave
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const revalidate = async (doc: any) => {
    const url = `${process.env.SERVER_URL || 'http://localhost:3000'}/api/revalidate?path=/&secret=${process.env['PAYLOAD-SECRET']}`;
    try {
        await fetch(url);
    } catch (err) {
        console.error("Error revalidating:", err);
    }
    return doc;
};

const editorState: DefaultTypedEditorState = {
    root: {
        type: 'root',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Some text. Every property here is fully-typed',
                        type: 'text',
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                textFormat: 0,
                version: 1,
            },
        ],
    },
}


export default buildConfig({
    admin: {
        user: 'admins', // Define qué colección se usa para el login del CMS
    },
    collections: [
        {
            slug: 'admins',
            auth: true,
            admin: {
                useAsTitle: 'name',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
                {
                    name: 'thumbnail',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
        {
            slug: 'posts',
            admin: {
                useAsTitle: 'title',
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    unique: true, // Importante para tus URLs de Next.js
                    admin: {
                        position: 'sidebar',
                    },
                },
                {
                    name: 'content',
                    type: 'richText',
                    defaultValue: editorState,
                },
                {
                    name: 'author',
                    type: 'relationship',
                    relationTo: 'admins',
                    required: true,
                    hasMany: false,
                    admin: {
                        position: 'sidebar',
                    },
                },
                {
                    name: 'categories',
                    type: 'relationship',
                    relationTo: 'categories',
                    hasMany: true,
                    admin: {
                        position: 'sidebar',
                    },
                },
                {
                    name: 'tags',
                    type: 'relationship',
                    relationTo: 'tags',
                    hasMany: true,
                    admin: {
                        position: 'sidebar',
                    },
                },
                // Relación para la imagen destacada
                {
                    name: 'coverImage',
                    type: 'upload',
                    required: true,
                    relationTo: 'media',
                    admin: {
                        position: 'sidebar',
                    },
                },
            ],
            hooks: {
                afterChange: [revalidate],
            },
        },
        {
            slug: 'categories',
            admin: {
                useAsTitle: 'name',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    unique: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
                {
                    name: 'thumbnail',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'parent',
                    type: 'relationship',
                    relationTo: 'categories',
                },
            ],
            hooks: {
                afterChange: [revalidate],
            },
        },
        {
            slug: 'tags',
            admin: {
                useAsTitle: 'name',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    unique: true,
                },
            ],
            hooks: {
                afterChange: [revalidate],
            },
        },
        {
            slug: 'product-types',
            admin: {
                useAsTitle: 'name',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    unique: true,
                    admin: {
                        position: 'sidebar',
                    },
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
                {
                    name: 'thumbnail',
                    type: 'upload',
                    relationTo: 'media',
                    admin: {
                        position: 'sidebar',
                    },
                },
            ],
            hooks: {
                afterChange: [revalidate],
            },
        },
        {
            slug: 'products',
            admin: {
                useAsTitle: 'name',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    unique: true,
                    admin: {
                        position: 'sidebar',
                    },
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
                {
                    name: 'url',
                    type: 'text',
                },
                {
                    name: 'thumbnail',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'type',
                    type: 'relationship',
                    relationTo: 'product-types',
                    required: true,
                    admin: {
                        position: 'sidebar',
                    },
                },
            ],
            hooks: {
                afterChange: [revalidate],
            },
        },
        {
            slug: 'clients',
            admin: {
                useAsTitle: 'name',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'thumbnail',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                },
            ],
            hooks: {
                afterChange: [revalidate],
            },
        },
        {
            slug: 'services',
            admin: {
                useAsTitle: 'name',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    unique: true,
                    admin: {
                        position: 'sidebar',
                    },
                },
                {
                    name: 'content',
                    type: 'richText',
                    editor: lexicalEditor({}),
                },
                {
                    name: 'thumbnail',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
            hooks: {
                afterChange: [revalidate],
            },
        },
        {
            slug: 'media',
            access: {
                read: () => true,
            },
            upload: {
                disableLocalStorage: true,
                imageSizes: [
                    {
                        name: 'thumbnail',
                        width: 400,
                        height: 300,
                        position: 'center',
                    },
                ],
                adminThumbnail: 'thumbnail',
                mimeTypes: ['image/*'],
            },
            fields: [
                {
                    name: 'alt',
                    type: 'text',
                },
            ],
            hooks: {
                afterChange: [revalidate],
            },
        },
    ],

    globals: [
        {
            slug: 'settings',
            admin: {
                group: 'Admin',
            },
            fields: [
                {
                    name: 'contactInfo',
                    type: 'group',
                    fields: [
                        {
                            name: 'email',
                            type: 'email',
                        },
                        {
                            name: 'phone',
                            type: 'text',
                        },
                    ],
                },
                {
                    name: 'socialLinks',
                    type: 'group',
                    fields: [
                        {
                            name: 'facebook',
                            type: 'text',
                        },
                        {
                            name: 'instagram',
                            type: 'text',
                        },
                        {
                            name: 'x',
                            type: 'text',
                            label: 'X (Twitter)',
                        },
                        {
                            name: 'linkedin',
                            type: 'text',
                        },
                    ],
                },
                {
                    name: 'customSettings',
                    type: 'array',
                    label: 'Configuraciones Extra (Llave-Valor)',
                    fields: [
                        {
                            name: 'key',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'value',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
            hooks: {
                afterChange: [revalidate],
            },
        },
        {
            slug: 'home',
            admin: {
                group: 'Admin',
            },
            fields: [
                {
                    name: 'hero',
                    type: 'array',
                    label: 'Hero Slides (Solo Texto)',
                    minRows: 1,
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
            hooks: {
                afterChange: [revalidate],
            },
        },
    ],

    secret: process.env.PAYLOAD_SECRET || 'ESTO_DEBE_SER_SECRETO',

    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },

    // CONFIGURACIÓN DE MONGO DB
    db: mongooseAdapter({
        url: process.env.DATABASE_URL as string, // Tu connection string
    }),

    editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => [
            ...defaultFeatures,
            ...rootFeatures,
        ],
    }),

    plugins: [
        vercelBlobStorage({
            enabled: true,
            collections: {
                media: {
                    prefix: `${process.env.UPLOAD_PREFIX}/media`,
                    disableLocalStorage: true,
                    disablePayloadAccessControl: true,
                }
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
    ],

    sharp,
})