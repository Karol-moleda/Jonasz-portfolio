import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      description: 'Tytuł artykułu',
      fields: [
        { name: 'pl', title: 'Polski', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'it', title: 'Italiano', type: 'string' }
      ]
    }),
    defineField({
      name: 'publication',
      title: 'Publication',
      type: 'string',
      description: 'Nazwa gazety lub portalu'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Miasto, w którym opublikowano artykuł'
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'Data publikacji'
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Autor artykułu (jeśli podany)'
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link do artykułu online'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Tekst alternatywny do SEO i dostępności'
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Podpis pod zdjęciem'
        })
      ]
    })
  ]
})
