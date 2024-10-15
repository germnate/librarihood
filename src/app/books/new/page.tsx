import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import NewBookPage from "./NewBookPage";

export default async function SessionWrapper() {
    const session = await getServerSession(options);
    return <NewBookPage userId={session?.user?.id} />
}