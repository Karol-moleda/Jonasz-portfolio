import { defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Galeria koncertu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł galerii",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "location",
      title: "Miejsce koncertu",
      type: "string",
      options: {
        list: [
          { title: "Olkusz", value: "olkusz" },
          { title: "Kraków", value: "krakow" },
          { title: "Warszawa", value: "warszawa" },
          { title: "Inne", value: "inne" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data koncertu",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
    }),
    defineField({
      name: "photos",
      title: "Zdjęcia",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "author",
              title: "Autor zdjęcia",
              type: "string",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "description",
      title: "Opis galerii",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "photos.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `📍 ${subtitle}`,
        media,
      };
    },
  },
});
