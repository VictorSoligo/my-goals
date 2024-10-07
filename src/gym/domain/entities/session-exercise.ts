import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface SessionExerciseProps {
  sessionId: UniqueEntityID
  exerciseId: UniqueEntityID
  weight: number
  reps: number
}

export class SessionExercise extends Entity<SessionExerciseProps> {
  get sessionId() {
    return this.props.sessionId
  }

  get exerciseId() {
    return this.props.exerciseId
  }

  get weight() {
    return this.props.weight
  }

  get reps() {
    return this.props.reps
  }

  static create(props: SessionExerciseProps, id?: UniqueEntityID) {
    return new SessionExercise(props, id)
  }
}
