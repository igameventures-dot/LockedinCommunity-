import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export const handler = async (event) => {
  const userId = event.queryStringParameters.userId;

  try {
    const result = await pool.query(
      'SELECT data FROM progress WHERE user_id = $1',
      [userId]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows[0]?.data || {})
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
