import pb from '../../lib/db'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'



async function handler(req: Request, res: Response) {
    try {
        const submissionData = await req.json()
        const result = await pb.collection('users').create(submissionData)
        console.log('result', result)
        return new Response(JSON.stringify({success: true}), { status: 200 })
    } catch (error: any) {
        // Check if the error is an object with status and message
        console.log(error.data)
        const status = error.status || 500; // Default to 500 if not specified
        const message = error.message || 'Internal server error'; // Default message
        const details = error.data
        
        console.log('Error:', message, 'Status:', status, 'Details:', details ); // Log the error
        
        return new Response(JSON.stringify({ message, details }), { status });
    }
}

export { handler as POST }