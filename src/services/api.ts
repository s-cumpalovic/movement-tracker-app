import axios from 'axios';
import { useMutation } from 'react-query';
import { VideoInformation } from './interface';
import { API_URL, endpoints } from './constants';

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

export const Pera = 'pera';
