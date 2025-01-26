'use client'

export default function DeleteProjectButton({projectId, deleteProject}) {
    return (
        <>
            <button
                onClick={() => {
                    deleteProject(projectId);
                }}>
                Delete Project
            </button>
        </>
    );
}
