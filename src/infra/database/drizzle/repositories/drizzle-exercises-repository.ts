import { ExercisesRepository } from '@/gym/application/repositories/exercises-repository'
import { Exercise } from '@/gym/domain/entities/exercise'
import { client } from '@/lib/drizzle'
import { exercises } from '../../../../../drizzle/schema'
import { DrizzleExerciseMapper } from '../mapper/drizzle-exercise-mapper'
import { eq } from 'drizzle-orm'

export class DrizzleExercisesRepository implements ExercisesRepository {
  async findByName(name: string) {
    const exercise = client
      .select()
      .from(exercises)
      .where(eq(exercises.name, name))
      .get()

    if (!exercise) {
      return null
    }

    return DrizzleExerciseMapper.toDomain(exercise)
  }

  async create(exercise: Exercise) {
    const data = DrizzleExerciseMapper.toPersistence(exercise)

    await client.insert(exercises).values({
      id: data.id,
      name: data.name,
      category: data.category,
      createdAt: data.createdAt,
    })
  }
}
