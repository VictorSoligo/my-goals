import { Either, right } from '@/core/logic/either'
import { SessionsDao } from '../daos/sessions.dao'
import { EssentialSession } from '../dtos/essential-session'

interface Request {
  page: number
  perPage: number
}

type Response = Either<
  null,
  { sessions: EssentialSession[]; totalCount: number }
>

export class FetchSessionsUseCase {
  constructor(private sessionsDao: SessionsDao) {}

  async execute({ page, perPage }: Request): Promise<Response> {
    const { sessions, totalCount } = await this.sessionsDao.findMany({
      page,
      perPage,
    })

    return right({ sessions, totalCount })
  }
}
