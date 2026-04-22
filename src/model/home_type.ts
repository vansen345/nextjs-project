export interface HomeItem {
  _id: string;
  FO100: number;
  FO100H: number;
  FT300: number;
  PV301: string;
  PV302: string;
  PN303: number;
  PV305: string;
  PV307: string;
  PD308: string;
  PN309: number;
  PV314: string;
  PV319: string;
  PV325: string;
  PN326: number;
  PN350: number;

  PO322: {
    image: {
      FM600: number;
      index: number;
      THUMB: string;
      IMG: string;
      RATIO: number;
      DES: string;
      _id: string;
    }[];
    audio: unknown[];
    video: unknown[];
  };

  PO323: {
    PO323_COND?: { TEXT: string };
    PA323_SRE?: string[];
    PN323_LPBA?: number;
    PV323_SEE?: string;
    pinTop?: number;
  };

  PA316: {
    KEY: string;
    KEY_STEM: string;
    _id: string;
  }[];

  TOTALLIKES: number;
  TOTALCOMMENTS: number;
  PP300: number;
  TYPE: string;
  NV106: string;
  NV126: string;
  NV117: string;
  KV102: string;
  ISLIKED: number;
  FNC951: number;
  RN331: number;

  SPIN: { TUT: number };
  PL347?: string;
  PL348?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getDecryptedTitle = (pv301?: string): string => {
  return decodeURIComponent(pv301?.trim() ?? "");
};

export const getDecryptedContent = (pv314?: string): string => {
  return decodeURIComponent(pv314?.trim() ?? "");
};

  