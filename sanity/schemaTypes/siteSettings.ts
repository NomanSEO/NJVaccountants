// sanity/schemaTypes/siteSettings.ts
import { defineType, defineField, defineArrayMember } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroTitleHighlight', title: 'Hero Title Highlight Word', type: 'string' }),
    defineField({ name: 'heroDesc', title: 'Hero Description', type: 'text', rows: 3 }),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'num', type: 'string', title: 'Number' }),
          defineField({ name: 'label', type: 'string', title: 'Label' }),
        ],
      })],
    }),
    defineField({
      name: 'trustLogos',
      title: 'Trust Strip Logos',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [defineField({ name: 'name', type: 'string', title: 'Company Name' })],
      })],
    }),
    defineField({ name: 'ctaTitle', title: 'CTA Banner Title', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'CTA Banner Subtitle', type: 'string' }),
  ],
})
