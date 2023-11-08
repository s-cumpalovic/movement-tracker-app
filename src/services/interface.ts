export interface VideoInformation {
  uuid: string;
  frameImageUrl: string;
  resolution: VideoResolution;
}

export interface VideoResolution {
  width: number,
  height: number,
}
