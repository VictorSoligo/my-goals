import { Either, right } from '@/core/logic/either'
import { sessionsRepository } from '../repositories/sessions-repository'
import { Session } from '@/gym/domain/entities/session'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SessionExercise } from '@/gym/domain/entities/session-exercise'
import { ExerciseList } from '@/gym/domain/value-objects/exercise-list'

interface Request {
  exercises: {
    exerciseId: string
    weight: number
    reps: number
  }[]
}

type Response = Either<null, null>

export class CreateSessionUseCase {
  constructor(private sessionsRepository: sessionsRepository) {}

  async execute({ exercises }: Request): Promise<Response> {
    const sessionId = new UniqueEntityID()

    const sessionExercises = exercises.map((exercises) => {
      return SessionExercise.create({
        sessionId,
        exerciseId: new UniqueEntityID(exercises.exerciseId),
        weight: exercises.weight,
        reps: exercises.reps,
      })
    })

    const exercisesList = ExerciseList.create(sessionExercises)

    const session = Session.create({ exercises: exercisesList })

    await this.sessionsRepository.create(session)

    return right(null)
  }
}
