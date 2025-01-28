'use client';

export default function UndeleteClientButton({ clientId, undeleteClient }) {
    return (
        <>
            <button
                onClick={() => {
                    undeleteClient(clientId);
                }}>
                Restore Client
            </button>
        </>
    );
}
