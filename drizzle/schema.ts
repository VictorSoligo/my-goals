import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const exercises = sqliteTable('exercises', {
  id: text('id').primaryKey(),
  name: text('name').unique().notNull(),
  createdAt: text('created_at').notNull(),
})

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  createdAt: text('created_at').notNull(),
})

export const sessionsExercises = sqliteTable('sessions_exercises', {
  id: text('id').primaryKey(),
  exerciseId: text('exercise_id').references(() => exercises.id),
  sessionId: text('session_id').references(() => sessions.id),
})
