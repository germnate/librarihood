import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'

export default async function Home() {
  return (
    <div>Signed in!</div>
  );
}
