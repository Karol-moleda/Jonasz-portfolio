import { defineField, defineType } from 'sanity'

export const biography = defineType({
  name: 'biography',
  title: 'Biography',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Biografia'
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
              type: 'string'
            },
            {
              name: 'content',
              title: 'Treść',
              type: 'array',
              of: [{ type: 'block' }]
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
            { name: 'date', title: 'Data', type: 'string' },
            { name: 'title', title: 'Tytuł', type: 'string' },
            { name: 'description', title: 'Opis', type: 'text' }
          ]
        }
      ]
    })
  ]
})
