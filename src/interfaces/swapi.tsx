interface ISwapiData {
  count: number;
  next: string | undefined;
  previous: string | undefined;
}

export interface Book {
  kind: string;
  totalItems: number;
  items: BookItem[];
}

export interface BookItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
      title: string;
      subtitle?: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: {
          type: string;
          identifier: string;
      }[];
      readingModes: {
          text: boolean;
          image: boolean;
      };
      pageCount: number;
      printType: string;
      categories: string[];
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
  };
  saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean;
      listPrice: {
          amount: number;
          currencyCode: string;
      };
      retailPrice: {
          amount: number;
          currencyCode: string;
      };
      buyLink: string;
      offers: {
          finskyOfferType: number;
          listPrice: {
              amountInMicros: number;
              currencyCode: string;
          };
          retailPrice: {
              amountInMicros: number;
              currencyCode: string;
          };
      }[];
  };
  accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: {
          isAvailable: boolean;
      };
      pdf: {
          isAvailable: boolean;
      };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean;
  };
  searchInfo: {
      textSnippet: string;
  };
}


//People
export interface ISwapiPeople extends ISwapiData {
  results: Array<ISwapiCharacter>;
}

export interface ISwapiCharacter {
  name: string;
  height: string;
  mass: string;
  gender: string;
  url: string;
}

export interface ISwapiUser {
  name: string;
  height: string;
  birth_year: string;
  gender: string;
}
//Planets
export interface ISwapiPlanets extends ISwapiData {
  results: Array<ISwapiPlanet>;
}
export interface ISwapiPlanetDetail {
  id: string | undefined;
  name: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
  url: string;
  created: Date;
}

export interface ISwapiPlanetWishlist extends ISwapiData {
  result: Array<ISwapiPlanet> | null;
}
export interface ISwapiPlanet {
  name: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
  url: string;
  created: Date;
}




