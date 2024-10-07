import { PaginationParams } from '@/core/data/pagination-params'
import { EssentialSession } from '../dtos/essential-session'

export abstract class SessionsDao {
  abstract findMany(
    paginationParams: PaginationParams,
  ): Promise<{ sessions: EssentialSession[]; totalCount: number }>
}
