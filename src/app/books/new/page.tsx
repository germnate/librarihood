import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Form } from "../shared/form";

export default async function SessionWrapper() {
    const session = await getServerSession(options);
    return <Form userId={session?.user?.id} />
}