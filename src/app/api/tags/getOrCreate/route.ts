import { NextRequest, NextResponse } from "next/server";
import { catchError } from "@/app/lib/catchError";
import { TagsRecord } from "../../../../../pocketbase-types";
import { getOrCreateTags } from "@/app/lib/tags";

async function handler(req: NextRequest) {
    const [error, json] = await catchError<Array<TagsRecord>>(req.json());
    if (error) return NextResponse.json({ error: error.message })
    const tags = await getOrCreateTags(json)
    return NextResponse.json({ tags })
}

export { handler as POST }