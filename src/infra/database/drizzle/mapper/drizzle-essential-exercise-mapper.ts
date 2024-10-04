import { EssentialExercise } from '@/gym/application/dtos/essential-exercise'
import { exercises } from '../../../../../drizzle/schema'

export class DrizzleEssentialExerciseMapper {
  static toDto(raw: typeof exercises.$inferSelect): EssentialExercise {
    return {
      id: raw.id,
      name: raw.name,
      createdAt: new Date(raw.createdAt),
    }
  }
}
