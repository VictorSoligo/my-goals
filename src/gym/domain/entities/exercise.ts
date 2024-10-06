import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ExerciseProps {
  name: string
  category: string
  createdAt: Date
}

export class Exercise extends Entity<ExerciseProps> {
  get name() {
    return this.props.name
  }

  get category() {
    return this.props.category
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<ExerciseProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new Exercise(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
  }
}
