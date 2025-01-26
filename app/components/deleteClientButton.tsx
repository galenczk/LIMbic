'use client'

export default function DeleteClientButton({clientId, deleteClient}) {
    return (
        <>
            <button
                onClick={() => {
                    deleteClient(clientId);
                }}>
                Delete Client
            </button>
        </>
    );
}
