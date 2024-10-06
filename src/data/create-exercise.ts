import { CreateExerciseUseCase } from '@/gym/application/use-cases/create-exercise'
import { DrizzleExercisesRepository } from '@/infra/database/drizzle/repositories/drizzle-exercises-repository'

interface CreateExerciseRequest {
  name: string
  category: string
}

export async function createExercise({
  name,
  category,
}: CreateExerciseRequest) {
  const drizzleExercisesRepository = new DrizzleExercisesRepository()
  const createExerciseUseCase = new CreateExerciseUseCase(
    drizzleExercisesRepository,
  )

  await createExerciseUseCase.execute({ name, category })
}
