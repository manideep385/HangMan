// AI Service for generating words and hints using Google Gemini

// Get API key from environment variable (Vue CLI uses process.env, not import.meta.env)
const API_KEY = process.env.VUE_APP_GEMINI_API_KEY || ''

/**
 * List available Gemini models (for debugging)
 */
async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`)
    const data = await response.json()
    console.log('📋 Available Gemini models:', data.models?.map(m => m.name))
    return data.models
  } catch (error) {
    console.error('Failed to list models:', error)
    return []
  }
}

// Call this once to see available models
if (API_KEY) {
  listModels()
}

/**
 * Generate a word and hints using Google Gemini API
 */
async function generateWithGemini(category, difficulty) {
  const lengthMap = {
    easy: 'maximum 5 letters',
    medium: '5 to 8 letters',
    hard: '8 to 15 letters'
  }

  const prompt = `Generate a single word for a Hangman game:
Category: ${category}
Difficulty: ${difficulty} (${lengthMap[difficulty]})

Return JSON only:
{
  "word": "example",
  "hints": ["hint1", "hint2", "hint3"]
}`

  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 2000
      }
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    console.error('Gemini API error details:', errorData)
    throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`)
  }

  const data = await response.json()
  console.log('Gemini raw response:', data)
  
  const content = data.candidates[0].content.parts[0].text.trim()
  console.log('Gemini content:', content)
  
  // Extract JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Invalid response format from Gemini')
  }
  
  const result = JSON.parse(jsonMatch[0])
  
  return {
    word: result.word.toLowerCase(),
    hints: result.hints
  }
}

/**
 * Main function to generate word using Google Gemini
 * Returns null if API key not configured or on error (triggers fallback to JSON)
 */
export async function generateWord(category, difficulty) {
  // Check if API key exists
  if (!API_KEY) {
    console.log('🔑 No API key found - using fallback words from JSON')
    return null
  }

  try {
    console.log(`🤖 Generating word with Gemini for ${category} (${difficulty})...`)
    const result = await generateWithGemini(category, difficulty)
    console.log('✅ AI generated word:', result)
    return result
  } catch (error) {
    console.error('❌ Gemini API failed:', error.message)
    console.log('📚 Falling back to JSON words')
    return null
  }
}
