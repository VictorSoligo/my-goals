import { Link } from 'expo-router'
import { Button } from './ui/button'
import { Text } from './ui/text'

export function AddExerciseButton() {
  return (
    <Link href="add-exercise" asChild>
      <Button variant="outline" className="border-white">
        <Text>Add</Text>
      </Button>
    </Link>
  )
}
