export interface IDictionaryContent {
  key: string;
  value: string;
}
export interface ErrorTypes {
  error: {
    code: number;
    message: string;
  };
}

export interface Token {
  access_token: string;
}

export interface IDictionaryContent {
  key: string;
  value: string;
}

export interface INavigationItem {
  name: string;
  href: string;
  current: boolean;
  extraData: string | undefined;
  active: boolean | undefined;
}

export interface INavigation {
  navigation: INavigationItem[];
}
