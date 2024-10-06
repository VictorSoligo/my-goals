import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const exercises = sqliteTable('exercises', {
  id: text('id').primaryKey(),
  name: text('name').unique().notNull(),
  category: text('category').notNull(),
  createdAt: integer('created_at').notNull(),
})

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at').notNull(),
})

export const sessionsExercises = sqliteTable('sessions_exercises', {
  id: text('id').primaryKey(),
  weight: integer('weight').notNull(),
  reps: integer('reps').notNull(),
  exerciseId: text('exercise_id').references(() => exercises.id),
  sessionId: text('session_id').references(() => sessions.id),
})
