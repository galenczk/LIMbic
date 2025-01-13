// takes in createProject formdata and makes POST request to /projects
'use server'
import { NextResponse } from 'next/server';

export async function createProject(formData: FormData) {
    //console.log(formData);
    
    try {
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                client: formData.get('client'),
                type: formData.get('type'),
                numberSamples: formData.get('numberSamples'),
                tat: formData.get('tat'),
            }),
        });

        if (!response.ok) {
            return {'Error': 'No response from server.'}
        }

        const data = await response.json();
    } catch (error: any) {
        return {'Error': 'No response from server.'}
    }
}
