import React, {
  createContext, useContext, ReactNode, useState,
} from 'react';
import { CoordinatesChartInformation, SpecificVideoInformation, VideoInformation } from './services/interface';

interface AppContextProps {
  videoInformation: VideoInformation | undefined;
  setVideoInformation: React.Dispatch<React.SetStateAction<VideoInformation | undefined>>;

  chartCoordinates: CoordinatesChartInformation | undefined,
  setChartCoordinates: React.Dispatch<React.SetStateAction<
  CoordinatesChartInformation | undefined
  >>;

  specificRecord: SpecificVideoInformation | undefined;
  setSpecificRecord: React.Dispatch<React.SetStateAction<SpecificVideoInformation | undefined>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videoInformation, setVideoInformation] = useState<VideoInformation | undefined>();
  const [
    chartCoordinates,
    setChartCoordinates,
  ] = useState<CoordinatesChartInformation | undefined>();
  const [specificRecord, setSpecificRecord] = useState<SpecificVideoInformation | undefined>();

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValues: AppContextProps = {
    videoInformation,
    setVideoInformation,
    chartCoordinates,
    setChartCoordinates,
    specificRecord,
    setSpecificRecord,
  };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};

export { AppProvider, useAppContext };
