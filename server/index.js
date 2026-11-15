
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json({ limit: '1mb' }));

// Server health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'FrameForge AI backend is running!',
  });
});

// Generate AI Story and Screenplay
app.post('/api/generate-story', async (req, res) => {
  try {
    const { concept, genre, visualStyle, pace } = req.body;

    if (!concept || typeof concept !== 'string' || !concept.trim()) {
      return res.status(400).json({
        success: false,
        error: 'A valid film concept is required.',
      });
    }

    if (concept.length > 3000) {
      return res.status(400).json({
        success: false,
        error: 'Film concept must be under 3000 characters.',
      });
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      throw new Error('Cloudflare credentials are missing.');
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.3-70b-instruct-fp8-fast`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              
content: `You are FrameForge AI, a professional film co-writer and pre-production assistant.

Develop the filmmaker's concept into an original, coherent cinematic production blueprint.

Respect the filmmaker's creative intent.

Return ONLY valid JSON. Do not use Markdown code fences or add explanations outside the JSON.

Use exactly this structure:

{
  "title": "Film title",
  "logline": "One-sentence film premise",
  "synopsis": "Detailed story synopsis",
  "characters": [
    {
      "name": "Character name",
      "role": "Main or supporting",
      "description": "Appearance and personality",
      "motivation": "Character's main motivation",
      "arc": "Character development"
    }
  ],
  "acts": [
    {
      "act": "Act 1",
      "summary": "What happens in this act"
    }
  ],
  "scenes": [
    {
      "sceneNumber": 1,
      "heading": "INT. LOCATION - NIGHT",
      "location": "Scene location",
      "time": "Night",
      "description": "What happens in the scene",
      "action": "Detailed cinematic action",
      "dialogue": [
        {
          "character": "Character name",
          "line": "Dialogue"
        }
      ]
    }
  ],
  "shots": [
    {
      "shotNumber": 1,
      "sceneNumber": 1,
      "shotType": "Wide Shot",
      "cameraAngle": "Eye Level",
      "movement": "Slow Dolly In",
      "description": "What the camera captures"
    }
  ],
  "storyboard": [
    {
      "frameNumber": 1,
      "title": "Frame title",
      "sceneNumber": 1,
      "visualDescription": "Detailed visual description",
      "imagePrompt": "Detailed cinematic image generation prompt"
    }
  ],
  "directorNotes": "Overall cinematic direction and visual approach"
}

Generate multiple meaningful scenes, characters, shots and storyboard frames based on the concept. Keep character names and story continuity consistent.`
            },
            {
              role: 'user',
              content: `Develop this film concept:

Concept: ${concept}
Genre: ${genre || 'Not specified'}
Visual Style: ${visualStyle || 'Cinematic'}
Narrative Pace: ${pace || 'Balanced'}

Create an original film blueprint.`
            }
          ],
          max_tokens: 3000,
          temperature: 0.7,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success || !result.result?.response) {
      console.error('Cloudflare text API error:', result.errors || result);

      throw new Error(
        result.errors?.[0]?.message || 'AI story generation failed.'
      );
    }

   


const aiResponse = result.result.response;

let blueprint;

try {
  if (typeof aiResponse === 'string') {
    const jsonStart = aiResponse.indexOf('{');
    const jsonEnd = aiResponse.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No JSON object found.');
    }

    const cleanJson = aiResponse.slice(jsonStart, jsonEnd + 1);
    blueprint = JSON.parse(cleanJson);

  } else if (
    aiResponse &&
    typeof aiResponse === 'object' &&
    !Array.isArray(aiResponse)
  ) {
    blueprint = aiResponse;

  } else {
    throw new Error('Unexpected AI response format.');
  }

  if (
    !blueprint.title ||
    !Array.isArray(blueprint.characters) ||
    !Array.isArray(blueprint.scenes) ||
    !Array.isArray(blueprint.shots) ||
    !Array.isArray(blueprint.storyboard)
  ) {
    throw new Error('AI blueprint is missing required sections.');
  }

} catch (error) {
  console.error('AI JSON parsing error:', error.message);
  console.error('AI raw response:', aiResponse);

  throw new Error('AI returned invalid JSON. Please generate again.');
}

res.json({
  success: true,
  story: aiResponse,
  blueprint: blueprint,
});


  } catch (error) {
    console.error('Story generation error:', error.message);

    res.status(500).json({
      success: false,
      error: error.message || 'Story generation failed.',
    });
  }
});

// Generate AI storyboard image using Cloudflare FLUX
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        error: 'A valid image prompt is required.',
      });
    }

    if (prompt.length > 2048) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is too long. Maximum 2048 characters.',
      });
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      throw new Error('Cloudflare credentials are missing from .env');
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          steps: 4,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success || !result.result?.image) {
      console.error('Cloudflare API error:', result.errors || result);
      throw new Error(
        result.errors?.[0]?.message || 'Cloudflare image generation failed.'
      );
    }

    res.json({
      success: true,
      image: `data:image/jpeg;base64,${result.result.image}`,
    });

  } catch (error) {
    console.error('Image generation error:', error.message);

    res.status(500).json({
      success: false,
      error: error.message || 'Image generation failed.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`FrameForge AI backend running at http://localhost:${PORT}`);
});
