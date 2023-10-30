export type ObjectData = {
  date_added: string;
  date_last_used: string;
  guid: string;
  id: string;
  name: string;
  type?: string;
  url?: string;
};

export type Children = (ObjectData | Children)[];

export type DataType = {
  children?: Children;
  date_added?: string;
  date_last_used?: string;
  guid?: string;
  id?: string;
  name?: string;
  type?: string;
  url?: string;
};

export type Bookmarks = {
  checksum: string;
  roots: {
    bookmark_bar: DataType;
    other: DataType;
    synced: DataType;
  };
  sync_metadata: string;
  version: number;
};

export type ScanAPIResponse = {
  bookmark_bar: DataType;
  other: DataType;
  synced: DataType;
};
