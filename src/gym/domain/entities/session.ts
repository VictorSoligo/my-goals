import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { ExerciseList } from '../value-objects/exercise-list'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface SessionProps {
  exercises: ExerciseList
  createdAt: Date
}

export class Session extends Entity<SessionProps> {
  get exercises() {
    return this.props.exercises
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<SessionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new Session(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
  }
}
