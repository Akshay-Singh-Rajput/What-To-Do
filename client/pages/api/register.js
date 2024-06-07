export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            // Send registration data to Node.js backend
            const response = await axios.post('http://your-backend-url/register', { email, password });
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}