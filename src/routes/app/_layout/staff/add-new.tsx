import { createFileRoute } from '@tanstack/react-router';
import NewStaffForm from '../../../../components/NewStaffForm';

export const Route = createFileRoute('/app/_layout/staff/add-new')({
  component: AddNew,
});

function AddNew() {
  return <NewStaffForm />;
}
