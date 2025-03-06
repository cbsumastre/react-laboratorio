export interface PictureInfo {
    id: string;
    picUrl: string;
    title: string;
}

export interface PictureInfoSelected extends PictureInfo {
    selected: boolean;
}