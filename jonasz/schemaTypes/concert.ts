import { defineField, defineType } from 'sanity'

export const concert = defineType({
  name: 'concert',
  title: 'Concert',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'pl', title: 'Polski', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'it', title: 'Italiano', type: 'string' }
      ]
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'Data koncertu (będzie używana do określenia, czy koncert jest archiwalny czy nadchodzący)'
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'pl', title: 'Polski', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'it', title: 'Italiano', type: 'string' }
      ]
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'object',
      fields: [
        { name: 'pl', title: 'Polski', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'it', title: 'Italiano', type: 'string' }
      ]
    }),
    defineField({
      name: 'program',
      title: 'Program',
      type: 'object',
      fields: [
        { name: 'pl', title: 'Polski', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'it', title: 'Italiano', type: 'text' }
      ]
    }),
    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ]
})
