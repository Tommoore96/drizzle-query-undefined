import { relations } from 'drizzle-orm';
import { mysqlTable, serial, text, varchar, int } from 'drizzle-orm/mysql-core'

/**
 * This is a sample schema.
 * Replace this with your own schema and then run migrations.
 */

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
})



export const post = mysqlTable('post', {
  id: serial('id').primaryKey(),
  title: text('title'),
  likes: int('likes'),
  authorId: int('author_id'),
})

export const postsRelations = relations(post, ({ one }) => ({
	author: one(user, {
		fields: [post.authorId],
		references: [user.id],
	}),
}));

export const usersRelations = relations(user, ({ many }) => ({
	posts: many(post),
}));