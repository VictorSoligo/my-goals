import { WatchedList } from '@/core/entities/watched-list'
import { SessionExercise } from '../entities/session-exercise'

export class ExerciseList extends WatchedList<SessionExercise> {
  compareItems(a: SessionExercise, b: SessionExercise): boolean {
    return a.equals(b)
  }

  static create(sessionExercises: SessionExercise[]) {
    return new ExerciseList(sessionExercises)
  }
}
