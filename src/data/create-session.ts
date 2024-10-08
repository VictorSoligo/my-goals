import { CreateSessionUseCase } from '@/gym/application/use-cases/create-session'
import { DrizzleSessionsRepository } from '@/infra/database/drizzle/repositories/drizzle-sessions-repository'

interface CreateSessionRequest {
  exercises: {
    exerciseId: string
    weight: number
    reps: number
  }[]
}

export async function createSession({ exercises }: CreateSessionRequest) {
  const drizzleSessionsRepository = new DrizzleSessionsRepository()
  const createSessionUseCase = new CreateSessionUseCase(
    drizzleSessionsRepository,
  )

  await createSessionUseCase.execute({ exercises })
}
