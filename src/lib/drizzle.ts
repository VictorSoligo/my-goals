import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync, deleteDatabaseSync } from 'expo-sqlite/next'

deleteDatabaseSync('mygoals.db')

const expo = openDatabaseSync('mygoals.db')

export const client = drizzle(expo)
