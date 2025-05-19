import React, { createContext, useState, useContext, useRef } from 'react';
import { UserData, initialUserData, BehaviorData, sampleBehaviorData, AIRecommendation, sampleAIRecommendation } from '../types';

interface UserContextType {
  userData: UserData;
  behaviorData: BehaviorData;
  aiRecommendation: AIRecommendation;
  setUserData: (data: UserData) => void;
  setSingleUserDataProperty: <K extends keyof UserData>(key: K, value: UserData[K]) => void;
  setRecordOption: (key: keyof UserData['recordOptions'], value: boolean) => void;
  generateSampleId: () => string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [behaviorData] = useState<BehaviorData>(sampleBehaviorData);
  const [aiRecommendation] = useState<AIRecommendation>(sampleAIRecommendation);
  const sampleIdRef = useRef<string>('');

  const setSingleUserDataProperty = <K extends keyof UserData>(key: K, value: UserData[K]) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const setRecordOption = (key: keyof UserData['recordOptions'], value: boolean) => {
    setUserData(prev => ({
      ...prev,
      recordOptions: {
        ...prev.recordOptions,
        [key]: value
      }
    }));
  };

  // 生成一个随机的样本ID，并确保它只生成一次
  const generateSampleId = (): string => {
    if (!sampleIdRef.current) {
      const prefix = 'EAC';
      const number = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      sampleIdRef.current = `${prefix}-${number}`;
    }
    return sampleIdRef.current;
  };

  const value = {
    userData,
    behaviorData,
    aiRecommendation,
    setUserData,
    setSingleUserDataProperty,
    setRecordOption,
    generateSampleId
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}; 