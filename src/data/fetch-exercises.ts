import { FetchExercisesUseCase } from '@/gym/application/use-cases/fetch-exercises'
import { DrizzleExercisesDao } from '@/infra/database/drizzle/daos/drizzle-exercises-dao'

export async function fetchExercises() {
  const drizzleExercisesDao = new DrizzleExercisesDao()
  const fetchExercisesUseCase = new FetchExercisesUseCase(drizzleExercisesDao)

  const result = await fetchExercisesUseCase.execute({ page: 1, perPage: 10 })

  if (result.isLeft()) {
    return { error: result.value }
  }

  const { exercises, totalCount } = result.value

  return { exercises, totalCount }
}
