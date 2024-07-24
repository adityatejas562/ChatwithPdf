import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';

// Load environment variables from.env file
dotenv.config();

// Ensure the environment variable is correctly loaded
const apiKey = process.env.COHERE_API_KEY;

if (!apiKey) {
  throw new Error('COHERE_API_KEY environment variable is not set');
}

// Initialize the Cohere client with the API key
const cohereClient = new CohereClient({ token: apiKey }); // Create an Options object with token property

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    // Replace newlines in the input text and call the embed method
    const response = await cohereClient.embed({
      texts: [text.replace(/\n/g, " ")],
      model: 'large',
    });

    // Assuming the response is in the correct format
    const embeddings = response.embeddings;

    // Check if embeddings are returned and return the first one
    if (Array.isArray(embeddings) && embeddings.length > 0 && Array.isArray(embeddings[0])) {
      return embeddings[0] as number[];
    }

    throw new Error('No embeddings returned from Cohere');
  } catch (error) {
    console.error("Error calling Cohere embeddings API", error);
    throw error;
  }
}