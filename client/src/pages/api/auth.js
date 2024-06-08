export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { email, password } = req.body;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            res.status(200).json(data);
        } else {
            res.status(response.status).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
