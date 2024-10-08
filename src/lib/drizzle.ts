import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite/next'

const expo = openDatabaseSync('mygoals.db')

export const client = drizzle(expo)
