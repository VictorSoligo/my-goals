import { Exercise } from '@/gym/domain/entities/exercise'
import { exercises } from '../../../../../drizzle/schema'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class DrizzleExerciseMapper {
  static toDomain(raw: typeof exercises.$inferSelect): Exercise {
    const exercise = Exercise.create(
      {
        name: raw.name,
        createdAt: new Date(raw.createdAt),
      },
      new UniqueEntityID(raw.id),
    )

    return exercise
  }

  static toPersistence(exercise: Exercise): typeof exercises.$inferInsert {
    return {
      id: exercise.id.toString(),
      name: exercise.name,
      createdAt: exercise.createdAt.toJSON(),
    }
  }
}
