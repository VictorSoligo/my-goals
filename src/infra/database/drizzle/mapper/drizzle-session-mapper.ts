import { Session } from '@/gym/domain/entities/session'
import { sessions, sessionsExercises } from '../../../../../drizzle/schema'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SessionExercise } from '@/gym/domain/entities/session-exercise'
import { ExerciseList } from '@/gym/domain/value-objects/exercise-list'

export class DrizzleSessionMapper {
  static toDomain(
    raw: typeof sessions.$inferInsert,
    rawExercises: (typeof sessionsExercises.$inferInsert)[],
  ) {
    const sessionExercises = rawExercises.map((sessionExercise) => {
      return SessionExercise.create(
        {
          exerciseId: new UniqueEntityID(sessionExercise.exerciseId),
          sessionId: new UniqueEntityID(sessionExercise.sessionId),
          reps: sessionExercise.reps,
          weight: sessionExercise.weight,
        },

        new UniqueEntityID(sessionExercise.id),
      )
    })

    const session = Session.create(
      {
        createdAt: new Date(raw.createdAt),
        exercises: ExerciseList.create(sessionExercises),
      },
      new UniqueEntityID(raw.id),
    )

    return session
  }

  static toPersistence(session: Session) {
    return {
      id: session.id.toString(),
      createdAt: session.createdAt.getTime(),
      exercises: session.exercises.currentItems.map((exercise) => {
        return {
          id: exercise.id.toString(),
          sessionId: session.id.toString(),
          exerciseId: exercise.exerciseId.toString(),
          weight: exercise.weight,
          reps: exercise.reps,
        }
      }),
    }
  }
}
