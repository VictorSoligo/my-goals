export interface EssentialSession {
  id: string
  exercises: {
    exerciseId: string
    exerciseName: string
    reps: number
    weight: number
  }[]
  createdAt: Date
}
