import { Session } from '@/gym/domain/entities/session'

export abstract class sessionsRepository {
  abstract create(session: Session): Promise<void>
}
