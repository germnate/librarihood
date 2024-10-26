import pb from './db'
import { catchError } from './catchError'
import { RecordModel } from 'pocketbase'
import { TagsRecord } from '../../../pocketbase-types'

async function getTag(id: string) {
    const [error, tag] = await catchError<RecordModel>(pb.collection('tags').getOne(id))
    if (error.status === 404) return null;
    if (tag?.id) return tag;
    throw error;
}

function getTagsBy(field: string, value: string) {
    return pb.collection('tags').getFullList({
        filter: `${field} = "${value}"`,
        cache: 'no-store'
    })
}

function getTags(filters: string) {
    return pb.collection('tags').getFullList({
        filter: filters,
        cache: 'no-store',
    })
}

function createTag(tag: TagsRecord) {
    return pb.collection('tags').create(tag)
}

function updateTag(tag: TagsRecord) {
    return pb.collection('tags').update(tag.id, tag)
}

function updateTagProperty(id: string, property: { [key: string]: string }) {
    console.log(id, property)
    return pb.collection('tags').update(id, property)
}

function bulkUpdateTags(ids: Array<string>, property: { [key: string]: string }) {
    const promises = ids.map(async id => {
        await updateTagProperty(id, property)
    })

    return Promise.all(promises)
}

function deleteTag(id: string) {
    return pb.collection('tags').delete(id);
}

async function getOrCreateTags(tags: Array<TagsRecord>) {
    const promises = tags.map(async tag => {
        const t = await getTag(tag.id)
        if (t) return t;
        return createTag(tag)
    })
    return Promise.all(promises)
}

export { getTag, createTag, updateTag, getTagsBy, getTags, deleteTag, getOrCreateTags, bulkUpdateTags }