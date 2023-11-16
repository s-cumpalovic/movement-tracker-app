import axios from 'axios';
import { API_URL, endpoints } from '../constants';
import {
  CoordinatesChartInformation,
  CoordinatesInformation,
  SaveVideoInformation,
  SpecificVideoInformation,
  VideoInformation,
} from '../interface';

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

export async function saveVideo(data: SaveVideoInformation) {
  try {
    const response = await axios.post<CoordinatesChartInformation>(`${API_URL}${endpoints.CREATE_VIDEO}`, data);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export async function getAllRecords() {
  try {
    const response = await axios.get<any>(`${API_URL}${endpoints.ALL_RECORDS}`);

    return response.data;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export async function getSpecificRecord(videoUuid: string) {
  try {
    const response = await axios.get<SpecificVideoInformation>(`${API_URL}${endpoints.ALL_RECORDS}/${videoUuid}`);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export async function deleteRecord(videoUuid: string, onSuccess: () => void) {
  try {
    const response = await axios.delete<SpecificVideoInformation>(`${API_URL}${endpoints.ALL_RECORDS}/${videoUuid}`);

    if (response.status === 204) {
      onSuccess();
    }

    return response.data;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
