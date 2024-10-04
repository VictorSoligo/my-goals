import { Exercise } from '@/gym/domain/entities/exercise'

export abstract class ExercisesRepository {
  abstract findByName(name: string): Promise<Exercise | null>
  abstract create(exercise: Exercise): Promise<void>
}
