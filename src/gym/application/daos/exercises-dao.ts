import { PaginationParams } from '@/core/data/pagination-params'
import { EssentialExercise } from '../dtos/essential-exercise'

export abstract class ExercisesDao {
  abstract findMany(
    paginationParams: PaginationParams,
  ): Promise<{ exercises: EssentialExercise[]; totalCount: number }>
}
