// sanity/schemaTypes/post.ts
import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt', rows: 2 }),
    defineField({ name: 'category', type: 'string', title: 'Category' }),
    defineField({
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: [{ type: 'teamMember' }],
    }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
    defineField({ name: 'readTime', type: 'number', title: 'Read Time (minutes)' }),
  ],
})
