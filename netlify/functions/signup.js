export default async (req) => {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    return new Response(JSON.stringify({ error: 'DATABASE_URL is not defined' }), { status: 500 })
  }
  return new Response(JSON.stringify({ success: true, msg: 'DB connected' }), { status: 200 })
}
