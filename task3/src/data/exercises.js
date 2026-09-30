export const groups = ['Back', 'Arms', 'Legs', 'Chest', 'Core']
export const statuses = ['Planned', 'In progress', 'Completed']
export const initialExercises = [
  ['Pull-ups', 'Back', '8 reps', 'Bodyweight'],
  ['Bent-over rows', 'Back', '10 reps', 'Barbell'],
  ['Lat pulldowns', 'Back', '12 reps', 'Cable'],
  ['Biceps curls', 'Arms', '12 reps', 'Dumbbells'],
  ['Triceps pushdowns', 'Arms', '12 reps', 'Cable'],
  ['Hammer curls', 'Arms', '10 reps', 'Dumbbells'],
  ['Squats', 'Legs', '10 reps', 'Barbell'],
  ['Reverse lunges', 'Legs', '10 reps / side', 'Dumbbells'],
  ['Calf raises', 'Legs', '15 reps', 'Bodyweight'],
  ['Bench press', 'Chest', '10 reps', 'Barbell'],
  ['Push-ups', 'Chest', '12 reps', 'Bodyweight'],
  ['Chest flyes', 'Chest', '12 reps', 'Dumbbells'],
  ['Plank', 'Core', '30 seconds', 'Bodyweight'],
  ['Dead bugs', 'Core', '10 reps / side', 'Bodyweight'],
  ['Bicycle crunches', 'Core', '12 reps / side', 'Bodyweight'],
].map(([name, group, target, equipment], index) => ({ id: `exercise-${index}`, name, group, target, equipment, sets: 3, status: 'Planned', resetVersion: 0 }))
