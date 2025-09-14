import { Alert, AlertTitle } from '../ui/alert';
import { Spinner } from '../ui/shadcn-io/spinner';

export const LoadingSpinner = () => {
  return (
    <Alert variant="default">
      <Spinner />
      <AlertTitle>Loading</AlertTitle>
    </Alert>
  );
};
