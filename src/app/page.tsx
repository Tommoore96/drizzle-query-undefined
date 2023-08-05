import { db } from '@/lib/db'
import { post, user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// oh yeah, this is the future
export const runtime = 'edge'

export default async function Home() {
  console.log(db.query)
  const users = await db.query.user.findMany({
    where: eq(user.id, 1)
  })
  const tomPosts = await db.query.post.findMany({where: eq(post.authorId, 1)})
  const elliePosts = await db.query.post.findMany({where: eq(post.authorId, 2)})

  const createUser = async () => {
    'use server'

    await db.insert(user).values({ fullName: 'John Doe' })
  }

  return (
    <>
      <p>Posts by Tom:</p>
      {tomPosts.map((user) => (
        <div key={user.id}>{user.fullName}</div>
      ))}
      <p>Posts by Ellie:</p>
      {elliePosts.map((user) => (
        <div key={user.id}>{user.fullName}</div>
      ))}

      <form action={createUser}>
        <button type="submit">create user</button>
      </form>
    </>
  )
}
