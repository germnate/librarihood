'use client';

import Link from "next/link"
import { fetchUtil } from "../utils";
import { useRouter } from "next/navigation";

export function DeleteBookLink({ id, title }: { id: string, title: string }) {
    const router = useRouter();
    const confirm = async () => {
        const isResponse = window.confirm(`Are you sure you want to delete ${title}?`)
        if (!isResponse) return;
        await fetchUtil({ url: '/api/books/delete', body: { id } })
        router.refresh();
    }
    return <Link href="#" onClick={confirm}
        className='absolute right-3 top-3 px-2 border border-red-500 text-red-500 rounded-full hover:scale-110 transition-all'
    >
        &times;
    </Link>
}