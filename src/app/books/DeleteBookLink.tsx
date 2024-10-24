'use client';

import Link from "next/link"
import { fetchUtil } from "../utils";
import { useRouter } from "next/navigation";

export function DeleteBookLink({ id, title, className = '' }: { id: string, title: string, className: string }) {
    const router = useRouter();
    const confirm = async () => {
        const isResponse = window.confirm(`Are you sure you want to delete ${title}?`)
        if (!isResponse) return;
        const res = await fetchUtil({ url: '/api/books/delete', body: { id } })
        const json = await res.json();
        if (!json.error) {
            window.location.href = '/books'
        }
    }
    const classNames = ['px-2 border border-red-500 text-red-500 text-center rounded-full hover:scale-110 transition-all']
        .concat(className).filter(Boolean).join(' ')
    return <Link href="#" onClick={confirm}
        className={classNames}
    >
        Delete
    </Link>
}