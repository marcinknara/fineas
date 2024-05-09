import axios from 'axios';


export default async function handler(req, res) {
  const openai = new OpenAI();

  // const openai = new OpenAI({
  //   organization: 'org-IfDeAnDrC7PFaUnMw2x3YfUR',
  //   project: 'proj_mldD65B6TiAkJ8JoT5BsbvM5',
  // });

  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          prompt: req.body.prompt,
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      res.status(200).json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

