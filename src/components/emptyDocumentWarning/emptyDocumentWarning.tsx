import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import Link from 'next/link';

export const EmptyDocumentWarning = () => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Document Not Found</AlertTitle>
      <AlertDescription>
        <Link href={'/'}>Back to Home</Link>
      </AlertDescription>
    </Alert>
  );
};
