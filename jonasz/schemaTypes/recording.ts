import { defineField, defineType } from "sanity"


export const recording = defineType({
  name: 'recording',
  title: 'Nagranie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: Rule => Rule.required().max(120)
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'date',
      title: 'Data nagrania / publikacji',
      type: 'date',
      options: { dateFormat: 'DD.MM.YYYY' }
    }),
    defineField({
      name: 'status',
      title: 'Status nagrania',
      type: 'string',
      options: {
        list: [
          { title: 'Bieżące', value: 'current' },
          { title: 'Archiwalne', value: 'archival' }
        ],
        layout: 'radio'
      },
      initialValue: 'current'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Link do nagrania (YouTube / Vimeo / inny)',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https'],
        allowRelative: false
      })
    }),
    defineField({
      name: 'thumbnail',
      title: 'Miniaturka (opcjonalnie)',
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
      name: 'tags',
      title: 'Tagi / Kategorie',
      type: 'array',
      of: [{ type: 'string' }]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'thumbnail'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === 'current' ? '🔴 Bieżące' : '📼 Archiwalne',
        media
      }
    }
  }
})