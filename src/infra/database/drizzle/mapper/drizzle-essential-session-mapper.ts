import { EssentialSession } from '@/gym/application/dtos/essential-session'
import { sessions } from '../../../../../drizzle/schema'
import { DrizzleSessionExercise } from '../daos/drizzle-sessions-dao'

export class DrizzleEssentialSessionMapper {
  static toDto(
    raw: typeof sessions.$inferInsert,
    rawExercises: DrizzleSessionExercise[],
  ): EssentialSession {
    return {
      id: raw.id,
      createdAt: new Date(raw.createdAt),
      exercises: rawExercises.map((rawExercise) => {
        return {
          exerciseId: rawExercise.exerciseId,
          exerciseName: rawExercise.exerciseName,
          reps: rawExercise.reps,
          weight: rawExercise.weight,
        }
      }),
    }
  }
}
