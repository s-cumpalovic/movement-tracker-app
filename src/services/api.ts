import axios from 'axios';
import { useMutation } from 'react-query';
import {
  CoordinatesInformation,
  ImageCoordinates,
  VideoInformation,
  VideoResolution, VideoResolutionDifferenceIndex,
} from './interface';
import { API_URL, endpoints } from './constants';
import { ICoordinate } from '../components/VideoFrame/constants';

export const useUploadVideo = () => {
  const uploadVideoMutation = useMutation(
    async (videoFile: File) => {
      const formData = new FormData();
      formData.append('video', videoFile);

      const response = await axios.post<VideoInformation>(`${API_URL}${endpoints.UPLOAD}`, formData);
      return response.data;
    },
  );

  return {
    uploadVideo: uploadVideoMutation.mutate,
    isLoading: uploadVideoMutation.isLoading,
    videoInformation: uploadVideoMutation.data,
  };
};

export const useProcessCoordinates = () => {
  const processCoordinatesMutation = useMutation(
    async (body: CoordinatesInformation) => {
      const response = await axios.post(`${API_URL}${endpoints.COORDINATES}`, body);
      return response.data;
    }
  );

  const structureCoordinates = (
    filename: string,
    coordinates: ICoordinate[],
    resolutionDifferenceIndex: VideoResolutionDifferenceIndex,
  ) => {
    const imageCoordinates: ImageCoordinates = { x: [], y: [] };

    coordinates.forEach((coordinate) => {
      imageCoordinates.x.push(coordinate.x * resolutionDifferenceIndex.widthDiffIndex);
      imageCoordinates.y.push(coordinate.y * resolutionDifferenceIndex.heightDiffIndex);
    });

    const structuredCoordinates: CoordinatesInformation = {
      filename,
      coordinates: imageCoordinates,
    };

    return structuredCoordinates;
  };

  const calculateResolutionDifferenceIndex = (
    originalVideoResolution: VideoResolution,
    deviceVideoResolution: VideoResolution,
  ): VideoResolutionDifferenceIndex => {
    const x = originalVideoResolution.width / deviceVideoResolution.width;
    const y = originalVideoResolution.height / deviceVideoResolution.height;

    return {
      widthDiffIndex: x,
      heightDiffIndex: y,
    };
  };

  return {
    structureCoordinates,
    isLoading: processCoordinatesMutation.isLoading,
    result: processCoordinatesMutation.data,
    processCoordinates: processCoordinatesMutation.mutate,
    calculateResolutionDifferenceIndex,
  };
};
