# TODO - Theme toggle + Task date

## Step 1: Theme toggle (dark/light)
- [ ] Update `TodoApp/App.tsx` to add `theme` state.
- [ ] Add a toggle button and switch container background.
- [ ] Pass theme-derived colors to `TaskCard`.
- [ ] Update `TodoApp/components/TaskCard.tsx` to render using theme colors.

## Step 2: Add task date
- [ ] Update `TodoApp/types/Task.ts` to include `date: string`.
- [ ] Update `TodoApp/App.tsx` to:
  - [ ] add a date input control
  - [ ] include `date` when creating tasks
  - [ ] set a default date when loading old tasks
- [ ] Update `TodoApp/components/TaskCard.tsx` to display the date.

## Step 3: Verify
- [ ] Run the app and confirm theme toggle works.
- [ ] Create/edit tasks and confirm dates persist.
- [ ] Confirm old stored tasks still load without crashing.

