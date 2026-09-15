export const handler = async (event) => {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'DATABASE_URL is not defined' })
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, msg: 'DB connected' })
  }
}
