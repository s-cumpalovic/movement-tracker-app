export interface VideoInformation {
  uuid: string;
  frameImageUrl: string;
  resolution: VideoResolution;
}

export interface VideoResolution {
  width: number,
  height: number,
}

export interface ImageCoordinates {
  x: number[],
  y: number[],
}

export interface CoordinatesInformation {
  filename: string;
  coordinates: ImageCoordinates,
}

export interface IChartData {
  x: number;
  time: number;
}

export interface CoordinatesChartInformation {
  videoUrl: string,
  trackingData: IChartData[][];
}
