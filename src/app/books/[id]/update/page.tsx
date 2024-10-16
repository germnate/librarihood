import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Form } from "../../shared/form";
import { getBook } from "@/app/lib/books";
import { Book } from "@/app/models/book";
import { RecordModel } from "pocketbase";

function recordIsBook(record: RecordModel): record is Book {
    return record.id && record.title && record.userId
}

export default async function SessionWrapper({ params }: { params: { id: string } }) {
    const session = await getServerSession(options);
    const bookData = await getBook(params.id)
    if (!recordIsBook(bookData)) return null;
    return <Form userId={session?.user?.id} book={bookData} />
}