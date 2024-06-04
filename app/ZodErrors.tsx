import React from 'react';
import Alert from '@mui/material/Alert';

export function ZodErrors({ error }: { error: string[] }) {
  if (!error || error.length === 0) return null;
  return (
    <>
      {error.map((err: string, index: number) => (
        <Alert key={index} severity="error">
          {err}
        </Alert>
      ))}
    </>
  );
}
