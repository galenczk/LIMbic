import express, { Request, Response } from 'express';
import * as fs from './firestore';

// Create an Express server
const app = express();
const port = 3030;

// Middleware for JSON parsing
app.use(express.json());

// GET all clients
app.get('/clients', async (req: Request, res: Response) => {
    try {
        const reply = await fs.getAllClients()        

        res.status(200).send(reply)
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
