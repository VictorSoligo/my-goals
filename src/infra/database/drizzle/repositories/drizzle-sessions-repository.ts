import { Session } from '@/gym/domain/entities/session'
import { DrizzleSessionMapper } from '../mapper/drizzle-session-mapper'
import { sessionsRepository } from '@/gym/application/repositories/sessions-repository'
import { client } from '@/lib/drizzle'
import { sessions, sessionsExercises } from '../../../../../drizzle/schema'

export class DrizzleSessionsRepository implements sessionsRepository {
  async create(session: Session) {
    const data = DrizzleSessionMapper.toPersistence(session)

    await client
      .insert(sessions)
      .values({ createdAt: data.createdAt, id: data.id })

    await Promise.all(
      data.exercises.map((exercise) => {
        return client.insert(sessionsExercises).values({
          id: exercise.id,
          exerciseId: exercise.exerciseId,
          reps: exercise.reps,
          sessionId: data.id,
          weight: exercise.weight,
        })
      }),
    )
  }
}
