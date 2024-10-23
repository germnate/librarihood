type IsbnType = {
    type: 'ISBN_10' | 'ISBN_13';
    identifier: string;
}

type IndustryIdentifiers = IsbnType[]

interface VolumeInfo {
    title: string;
    authors?: Array<string> | undefined;
    publisher: string | undefined;
    publishedDate: string | undefined;
    description: string;
    industryIdentifiers?: IndustryIdentifiers,
    readingModes: {
        text: boolean;
        image: boolean;
    };
    pageCount: number | undefined;
    printType: string;
    categories: Array<string>;
    averageRating: number | undefined;
    ratingsCount: number | undefined;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
    };
    imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

interface Item {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: {
        country: string,
        saleability: string,
        isEbook: boolean,
    },
    accessInfo: {
        country: string,
        viewability: string,
        embeddable: boolean,
        publicDomain: boolean,
        textToSpeechPermission: string,
        epub: {
            isAvailable: boolean
        },
        pdf: {
            isAvailable: boolean
        },
        webReaderLink: string,
        accessViewStatus: string,
        quoteSharingAllowed: boolean
    }
}

interface GoogleJson {
    data: {
        kind: string;
        totalItems: number,
        items: Array<Item>
    }
}

export { GoogleJson, Item, VolumeInfo }