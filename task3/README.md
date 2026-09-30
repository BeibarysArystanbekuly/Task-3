# REP. Workout Dashboard

A React single-page workout planner for Task 3: Rendering and State.

## Run locally

```sh
npm install
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
```

## Starter exercises

Each exercise starts with three sets. Targets are editable when adding a new exercise.

| Group | Exercises |
| --- | --- |
| Back | Pull-ups, Bent-over rows, Lat pulldowns |
| Arms | Biceps curls, Triceps pushdowns, Hammer curls |
| Legs | Squats, Reverse lunges, Calf raises |
| Chest | Bench press, Push-ups, Chest flyes |
| Core | Plank, Dead bugs, Bicycle crunches |

## Features

- Add exercises with a name, muscle group, set count, target, and equipment.
- Remove exercises with an inline confirmation.
- Toggle individual sets; set progress automatically updates exercise status.
- Override status independently using the status menu.
- Add a local note to each exercise.
- Filter by muscle group and status, and reverse list order.
- Reset an exercise to clear its sets, note, and expanded controls.
- View summary counts derived from the full exercise list.

All data is held in memory. Refreshing the page restores the starter exercises.

## Component structure

```text
src/
  App.jsx                    Shared state and exercise actions
  components/
    Header.jsx               Brand and session header
    Footer.jsx               Session persistence note
    ExerciseForm.jsx         Add-exercise inputs and validation
    ExerciseList.jsx         Ordering, visibility, keys, and empty state
    ExerciseCard.jsx         Local sets, notes, status and reset controls
    WorkoutFilters.jsx       Controlled muscle group and status filters
    WorkoutSummary.jsx       Totals derived from the exercise list
  data/
    exercises.js             Starter exercises, groups, and statuses
```

App passes data and callbacks down through props. ExerciseForm and ExerciseCard
keep their own local state. Shared styles stay in App.css and index.css.

## Rendering and state: defence notes

`App` owns the exercise list, statuses, filters, ordering, and reset counters.
`ExerciseCard` owns its completed sets, note text, note visibility, and removal confirmation.
`ExerciseForm` owns its inputs. `WorkoutSummary` derives totals from props.

A state update schedules a render. Updating a card's note only updates that card's local state; changing a status updates the parent and renders its children. Console logs in App and ExerciseCard make this visible. React StrictMode can invoke renders twice during development.

React reconciles the new element tree against the previous one. Each card uses a key combining its permanent ID and reset version. Reversing the list changes position without changing identity, so the correct local state follows each exercise. Array indices are only used for the fixed set buttons, which have no local state and never reorder.

Filtering sets the native `hidden` attribute on cards instead of removing them from the React tree. They remain mounted, so their state survives. Stable keys alone would not preserve state after unmounting a filtered-out card.

Reset increments one exercise's reset version. The resulting key change makes React replace that card with a new instance, intentionally resetting all its local state. Other cards retain their keys and state.

Only functional components, props, useState, conditional rendering, and map are used. No useEffect, Context, Redux, or external state libraries.

## Manual verification

1. Complete one set and add a note to Pull-ups.
2. Filter to Arms and back to Back: Pull-ups keeps its set and note.
3. Reverse the list: progress still belongs to Pull-ups.
4. Reset Pull-ups: its sets and note clear; other cards remain unchanged.
5. Complete all sets: status changes to Completed and the summary updates.
6. Change status manually; combine group and status filters and test an empty result.
7. Add an exercise, cancel a removal, then confirm removal.
8. Check the layout on desktop and narrow screens.

## Submission

Provide the GitHub repository link, deployed application link, and a browser screenshot.

## GitHub Pages deployment

In the repository's Settings > Pages, set Build and deployment > Source to
GitHub Actions. Commit and push the deployment configuration to main.
The workflow at `.github/workflows/deploy.yml` installs dependencies in task3,
runs lint and build, and publishes only task3/dist. It can also be run manually
from the Actions tab.

After a successful deployment, open https://beibarysarystanbekuly.github.io/Task-3/.
Vite uses `/Task-3/` as the base path so JavaScript and CSS load under the
repository URL. Do not publish the unbuilt repository root.
