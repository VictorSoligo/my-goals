import { Either, right } from '@/core/logic/either'
import { ExercisesDao } from '../daos/exercises-dao'
import { EssentialExercise } from '../dtos/essential-exercise'

interface Request {
  page: number
  perPage: number
}

type Response = Either<
  null,
  { exercises: EssentialExercise[]; totalCount: number }
>

export class FetchExercisesUseCase {
  constructor(private exercisesDao: ExercisesDao) {}

  async execute({ page, perPage }: Request): Promise<Response> {
    const { exercises, totalCount } = await this.exercisesDao.findMany({
      page,
      perPage,
    })

    return right({ exercises, totalCount })
  }
}
