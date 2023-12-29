import { get } from 'axios';

export async function handler (event) {
  const { queryStringParameters } = event;
  const { searchString } = queryStringParameters;

  try {
    const response = await get(`${import.meta.env.MOVIE_API_URL}&s=${searchString}`);
    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}