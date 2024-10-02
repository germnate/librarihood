import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'

export default async function Home() {
  const session = await getServerSession(options)
  return (
    <>
      {session ? (
        <div>Signed in!</div>
      ): (
        <h1 className= 'text-5xl'>You shall not pass!</h1>
      )}
    </>
  );
}
