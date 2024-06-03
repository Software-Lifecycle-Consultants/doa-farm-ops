import React from 'react';

export function ZodErrors({ error }: { error: string[] }) {
    if (!error || error.length === 0) return null;
    return (
        <>
            {error.map((err: string, index: number) => (
                <div key={index} style={{ color: 'red', fontSize: '12px', fontStyle: 'italic', marginTop: '4px', padding: '8px 0' }}>
                    {err}
                </div>
            ))}
        </>
    );
}
