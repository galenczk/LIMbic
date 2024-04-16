'use server'

export async function getAllClients() {
    const clients = await fetch('http://localhost:3030/clients');
}