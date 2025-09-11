import { defineField, defineType } from 'sanity'

export const biography = defineType({
  name: 'biography',
  title: 'Biography',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      initialValue: { pl: 'Biografia', en: 'Biography', it: 'Biografia' },
      fields: [
        { name: 'pl', title: 'Polski', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'it', title: 'Italiano', type: 'string' }
      ]
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            {
              name: 'heading',
              title: 'Nagłówek',
              type: 'object',
              fields: [
                { name: 'pl', title: 'Polski', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
                { name: 'it', title: 'Italiano', type: 'string' }
              ]
            },
            {
              name: 'content',
              title: 'Treść',
              type: 'object',
              fields: [
                { name: 'pl', title: 'Polski', type: 'array', of: [{ type: 'block' }] },
                { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
                { name: 'it', title: 'Italiano', type: 'array', of: [{ type: 'block' }] }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'date', 
              title: 'Data', 
              type: 'string' 
            },
            { 
              name: 'title', 
              title: 'Tytuł', 
              type: 'object',
              fields: [
                { name: 'pl', title: 'Polski', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
                { name: 'it', title: 'Italiano', type: 'string' }
              ]
            },
            { 
              name: 'description', 
              title: 'Opis', 
              type: 'object',
              fields: [
                { name: 'pl', title: 'Polski', type: 'text' },
                { name: 'en', title: 'English', type: 'text' },
                { name: 'it', title: 'Italiano', type: 'text' }
              ]
            }
          ]
        }
      ]
    })
  ]
})
