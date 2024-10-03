import pb from '../../lib/db'

async function handler(req: Request, res: Response) {
  try {
    const submissionData = await req.json()
    const result = await pb.collection('users').create(submissionData)
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    const details = error.data || {}

    return new Response(JSON.stringify({ message, details }), { status });
  }
}

export { handler as POST }