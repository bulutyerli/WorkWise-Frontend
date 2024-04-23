import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_layout/staff/$staffId/edit-staff')({
  component: EditStaff,
});

function EditStaff() {
  return <div>edit</div>;
}
