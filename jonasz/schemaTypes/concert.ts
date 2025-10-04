import { defineField, defineType } from 'sanity'

export const concert = defineType({
  name: 'concert',
  title: 'Concert',
  type: 'document',
  fields: [
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt text', type: 'string' }
      ]
    }),
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
      name: 'ticketing',
      title: 'Ticketing Information',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Concert Type',
          type: 'string',
          options: {
            list: [
              { title: 'Free Entry', value: 'free' },
              { title: 'Paid Tickets', value: 'paid' },
              { title: 'Registration Required', value: 'registration' }
            ],
            layout: 'radio'
          },
          initialValue: 'free'
        },
        {
          name: 'eventLink',
          title: 'Event Link',
          type: 'url',
          description: 'Link to Facebook event, website, or other event page'
        },
        {
          name: 'ticketLink',
          title: 'Ticket Purchase Link',
          type: 'url',
          description: 'Link where tickets can be purchased (only for paid concerts)',
          hidden: ({ parent }) => parent?.type !== 'paid'
        },
        {
          name: 'registrationLink',
          title: 'Registration Link',
          type: 'url',
          description: 'Link for registration (only for registration required concerts)',
          hidden: ({ parent }) => parent?.type !== 'registration'
        },
        {
          name: 'price',
          title: 'Ticket Price',
          type: 'object',
          hidden: ({ parent }) => parent?.type === 'free',
          fields: [
            { name: 'pl', title: 'Polski', type: 'string', placeholder: 'np. "20 zł" lub "15-25 zł"' },
            { name: 'en', title: 'English', type: 'string', placeholder: 'e.g. "20 PLN" or "15-25 PLN"' },
            { name: 'it', title: 'Italiano', type: 'string', placeholder: 'es. "20 PLN" o "15-25 PLN"' }
          ]
        }
      ]
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ]
})
