import { Either, left, right } from '@/core/logic/either'
import { ExercisesRepository } from '../repositories/exercises-repository'
import { ExerciseAlreadyExistsError } from './errors/exercise-already-exists-error'
import { Exercise } from '@/gym/domain/entities/exercise'

interface Request {
  name: string
}

type Response = Either<ExerciseAlreadyExistsError, null>

export class CreateExerciseUseCase {
  constructor(private exercisesRepository: ExercisesRepository) {}

  async execute({ name }: Request): Promise<Response> {
    const exerciseWithSameName = await this.exercisesRepository.findByName(name)

    if (exerciseWithSameName) {
      return left(new ExerciseAlreadyExistsError())
    }

    const exercise = Exercise.create({ name })

    await this.exercisesRepository.create(exercise)

    return right(null)
  }
}
