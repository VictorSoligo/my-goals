import { PaginationParams } from '@/core/data/pagination-params'
import { SessionsDao } from '@/gym/application/daos/sessions.dao'
import { client } from '@/lib/drizzle'
import {
  exercises,
  sessions as sqliteSessions,
  sessionsExercises as sqliteSessionsExercises,
} from '../../../../../drizzle/schema'
import { desc, eq, sql } from 'drizzle-orm'
import { DrizzleEssentialSessionMapper } from '../mapper/drizzle-essential-session-mapper'

export type DrizzleSessionExercise =
  typeof sqliteSessionsExercises.$inferSelect & {
    exerciseName: string
  }

export class DrizzleSessionsDao implements SessionsDao {
  async findMany({ page, perPage }: PaginationParams) {
    const skip = (page - 1) * perPage

    const sessions = client
      .select()
      .from(sqliteSessions)
      .limit(perPage)
      .offset(skip)
      .orderBy(desc(sqliteSessions.createdAt))
      .all()

    const sessionsExercises = await Promise.all(
      sessions.map((session) => {
        return client
          .select({
            id: sqliteSessionsExercises.id,
            exerciseId: sqliteSessionsExercises.exerciseId,
            sessionId: sqliteSessionsExercises.sessionId,
            reps: sqliteSessionsExercises.reps,
            weight: sqliteSessionsExercises.weight,
            exerciseName: exercises.name,
          })
          .from(sqliteSessionsExercises)
          .where(eq(sqliteSessionsExercises.sessionId, session.id))
          .innerJoin(
            exercises,
            eq(sqliteSessionsExercises.exerciseId, exercises.id),
          )
          .all()
      }),
    )

    const totalCountQuery = client
      .select({ count: sql`COUNT(*)`.mapWith(Number) })
      .from(sqliteSessions)
      .get()

    const totalCount = totalCountQuery ? totalCountQuery.count : 0

    return {
      totalCount,
      sessions: sessions.map((session, index) => {
        return DrizzleEssentialSessionMapper.toDto(
          session,
          sessionsExercises[index],
        )
      }),
    }
  }
}
