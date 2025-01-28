'use client';

export default function UndeleteProjectButton({ projectId, undeleteProject }) {
    return (
        <>
            <button
                onClick={() => {
                    undeleteProject(projectId);
                }}>
                Restore Project
            </button>
        </>
    );
}
