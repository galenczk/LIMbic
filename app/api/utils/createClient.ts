// takes in createClient formdata and makes POST request to /projects
'use server';

export async function createClient(formData: FormData) {
    //console.log(formData);

    try {
        const response = await fetch('http://localhost:3000/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zip: formData.get('zip'),
            }),
        });

        if (!response.ok) {
            return { Error: 'No response from server.' };
        }

        const data = await response.json();
    } catch (error: any) {
        return { Error: 'No response from server.' };
    }
}
