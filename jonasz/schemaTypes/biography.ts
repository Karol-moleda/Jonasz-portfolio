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
      title: 'Timeline (Oś czasu)',
      type: 'array',
      description: '⚠️ WAŻNE: Każde osiągnięcie/wydarzenie dodaj jako OSOBNY wpis! Jeśli w tym samym roku było kilka nagród - dodaj kilka wpisów z tym samym rokiem. Każdy wpis = osobna linia na stronie.',
      of: [
        {
          type: 'object',
          title: 'Wydarzenie',
          fields: [
            { 
              name: 'year', 
              title: 'Rok', 
              type: 'string',
              description: 'Np. "2020", "2019-2021"',
              validation: (Rule: any) => Rule.required()
            },
            { 
              name: 'event', 
              title: 'Wydarzenie', 
              type: 'object',
              description: 'Co się wydarzyło',
              fields: [
                { name: 'pl', title: 'Polski', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
                { name: 'it', title: 'Italiano', type: 'string' }
              ]
            },
            { 
              name: 'location', 
              title: 'Miejsce', 
              type: 'object',
              description: 'Gdzie się odbyło',
              fields: [
                { name: 'pl', title: 'Polski', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
                { name: 'it', title: 'Italiano', type: 'string' }
              ]
            },
            { 
              name: 'achievement', 
              title: 'Osiągnięcie/Nagroda', 
              type: 'object',
              description: 'Np. "I miejsce", "Laureat", "Wyróżnienie" - będzie wyróżnione',
              fields: [
                { name: 'pl', title: 'Polski', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
                { name: 'it', title: 'Italiano', type: 'string' }
              ]
            },
            { 
              name: 'details', 
              title: 'Dodatkowe szczegóły (opcjonalne)', 
              type: 'object',
              description: 'Dodatkowe informacje, jeśli potrzebne',
              fields: [
                { name: 'pl', title: 'Polski', type: 'text' },
                { name: 'en', title: 'English', type: 'text' },
                { name: 'it', title: 'Italiano', type: 'text' }
              ]
            }
          ],
          preview: {
            select: {
              year: 'year',
              event: 'event.pl',
              achievement: 'achievement.pl',
              location: 'location.pl'
            },
            prepare({ year, event, achievement, location }: any) {
              return {
                title: `${year} → ${event || 'Bez tytułu'}`,
                subtitle: `🏆 ${achievement || 'Brak osiągnięcia'} ${location ? '📍 ' + location : ''}`,
                media: undefined
              }
            }
          }
        }
      ]
    })
  ]
})
