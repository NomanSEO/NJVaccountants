// sanity/schemaTypes/teamMember.ts
import { defineType, defineField } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Full Name' }),
    defineField({ name: 'role', type: 'string', title: 'Role / Title' }),
    defineField({ name: 'bio', type: 'text', title: 'Bio', rows: 3 }),
    defineField({ name: 'credentials', type: 'string', title: 'Credentials (e.g. FCA · CTA)' }),
    defineField({ name: 'initials', type: 'string', title: 'Initials (2 chars)' }),
    defineField({ name: 'gradientFrom', type: 'string', title: 'Card Gradient From (hex)' }),
    defineField({ name: 'gradientTo', type: 'string', title: 'Card Gradient To (hex)' }),
    defineField({ name: 'order', type: 'number', title: 'Sort Order' }),
  ],
})
