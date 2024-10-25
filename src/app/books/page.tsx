import { BookList } from "./BookList";
import { SessionUser } from "../types/session-user";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function ManageBooks() {
    const session = await getServerSession(options);
    const user: SessionUser | undefined = session?.user

    return (
        <div className='pt-4'>
            <BookList userId={user?.id} />
        </div>
    )

}