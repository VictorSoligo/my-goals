import { FetchSessionsUseCase } from '@/gym/application/use-cases/fetch-sessions'
import { DrizzleSessionsDao } from '@/infra/database/drizzle/daos/drizzle-sessions-dao'

export async function fetchSessions() {
  const drizzleSessionsDao = new DrizzleSessionsDao()
  const fetchSessionsUseCase = new FetchSessionsUseCase(drizzleSessionsDao)

  const result = await fetchSessionsUseCase.execute({ page: 1, perPage: 20 })

  if (result.isLeft()) {
    return { error: result.value }
  }

  const { sessions, totalCount } = result.value

  return { sessions, totalCount }
}
