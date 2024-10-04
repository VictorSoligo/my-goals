import uuid from 'react-native-uuid'

export class UniqueEntityID {
  private value: string

  constructor(value?: string) {
    this.value = value ?? uuid.v4().toString()
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
