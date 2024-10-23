/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Books = "books",
	Loans = "loans",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type BooksRecord<Tauthors = unknown, Tcategories = unknown, Ttags = unknown> = {
	authors?: null | Tauthors
	categories?: null | Tcategories
	cover?: string
	description?: string
	isbn?: string
	pageCount?: number
	publishedDate?: string
	publisher?: string
	selfLink?: string
	smallThumbnail?: string
	tags?: null | Ttags
	thumbnail?: string
	title?: string
	userId?: RecordIdString
}

export type LoansRecord = {
	bookId?: RecordIdString
	borrower?: RecordIdString
	borrowerName?: string
	owner?: RecordIdString
	returnDate?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	name?: string
	providerId?: string
}

// Response types include system fields and match responses from the PocketBase API
export type BooksResponse<Tauthors = unknown, Tcategories = unknown, Ttags = unknown, Texpand = unknown> = Required<BooksRecord<Tauthors, Tcategories, Ttags>> & BaseSystemFields<Texpand>
export type LoansResponse<Texpand = unknown> = Required<LoansRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	books: BooksRecord
	loans: LoansRecord
	users: UsersRecord
}

export type CollectionResponses = {
	books: BooksResponse
	loans: LoansResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'books'): RecordService<BooksResponse>
	collection(idOrName: 'loans'): RecordService<LoansResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
