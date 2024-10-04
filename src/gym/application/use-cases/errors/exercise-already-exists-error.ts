import { ConflictError } from '@/core/errors/implementations/conflict-error'

export class ExerciseAlreadyExistsError extends ConflictError {
  constructor() {
    super('Exercise already exists')
  }
}
