interface VolumeInfo {
    title: string;
    authors: Array<string>;
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: [
        {
            type: 'ISBN_10';
            identifier: string;
        },
        {
            type: 'ISBN_13';
            identifier: string;
        },
    ],
    readingModes: {
        text: boolean;
        image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: Array<string>;
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
        containsEpubBubles: boolean;
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