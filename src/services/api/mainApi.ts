import axios from 'axios';
import { API_URL, endpoints } from '../constants';
import { CoordinatesChartInformation, CoordinatesInformation, VideoInformation } from '../interface';

export async function uploadVideo(videoFile: File) {
  try {
    const formData = new FormData();
    formData.append('video', videoFile);

    const response = await axios.post<VideoInformation>(`${API_URL}${endpoints.UPLOAD}`, formData);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export async function uploadCoordinates(coordinates: CoordinatesInformation) {
  try {
    const response = await axios.post<CoordinatesChartInformation>(`${API_URL}${endpoints.COORDINATES}`, coordinates);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
