import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Container from "./Container";

export default async function SessionWrapper() {
    const session = await getServerSession(options);
    return (
        <Container userId={session?.user?.id} />
    )
}