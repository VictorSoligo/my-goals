import { exercises } from '../drizzle/schema'
import { client } from './lib/drizzle'

export async function poc() {
  await client.insert(exercises).values({
    id: '1',
    name: 'Pushups',
    createdAt: new Date().toJSON(),
  })

  const ex = client.select().from(exercises).all()

  console.log(ex)
}
