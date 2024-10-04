import { PaginationParams } from '@/core/data/pagination-params'
import { ExercisesDao } from '@/gym/application/daos/exercises-dao'
import { client } from '@/lib/drizzle'
import { exercises as sqliteExercises } from '../../../../../drizzle/schema'
import { desc, sql } from 'drizzle-orm'
import { DrizzleEssentialExerciseMapper } from '../mapper/drizzle-essential-exercise-mapper'

export class DrizzleExercisesDao implements ExercisesDao {
  async findMany({ page, perPage }: PaginationParams) {
    const skip = (page - 1) * perPage

    const exercises = client
      .select()
      .from(sqliteExercises)
      .limit(perPage)
      .offset(skip)
      .orderBy(desc(sqliteExercises.createdAt))
      .all()

    const totalCountQuery = client
      .select({ count: sql`COUNT(*)`.mapWith(Number) })
      .from(sqliteExercises)
      .get()

    const totalCount = totalCountQuery ? totalCountQuery.count : 0

    return {
      totalCount,
      exercises: exercises.map(DrizzleEssentialExerciseMapper.toDto),
    }
  }
}
