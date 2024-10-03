import pb from '../../lib/db'
import { hashPassword } from '@/app/utils/auth'

async function handler(req: Request, res: Response) {
  try {
    const submissionData = await req.json()
    if (submissionData.password !== submissionData.passwordConfirm) {
      throw new Error("Passwords don't match")
    }
    const passwordHash = hashPassword(submissionData.password)
    const result = await pb.collection('users').create({
      username: submissionData.username,
      password: passwordHash,
      passwordConfirm: passwordHash
    })
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    const details = error.data || {}

    return new Response(JSON.stringify({ message, details }), { status });
  }
}

export { handler as POST }