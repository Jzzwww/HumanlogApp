// 用户信息类型
export interface UserData {
  avatar?: string; // 头像的base64字符串或URL
  gender: 'male' | 'female' | '';
  birthDate: Date | null;
  age: number;
  workAddress: string;
  homeAddress: string;
  recordOptions: {
    appUsageTracking: boolean;
    locationTracking: boolean;
    dietTracking: boolean;
    emotionTracking: boolean;
  };
}

// 初始用户数据
export const initialUserData: UserData = {
  avatar: undefined,
  gender: '',
  birthDate: null,
  age: 0,
  workAddress: '',
  homeAddress: '',
  recordOptions: {
    appUsageTracking: false,
    locationTracking: false,
    dietTracking: false,
    emotionTracking: false,
  },
};

// 行为数据类型
export interface BehaviorData {
  currentStatus: 'working' | 'home' | 'outside';
  workDuration: string; // 格式化的时间字符串，如 "06:25:27"
  emotionState: {
    value: number; // 百分比
    type: 'anxious' | 'calm' | 'happy' | 'stressed';
  };
  dietState: {
    lastMeal: string;
    calories: number;
    imageUrl?: string;
  };
  digitalUsage: {
    socialMediaHours: number;
    apps: string[]; // 使用的应用名称数组
  };
}

// 示例行为数据
export const sampleBehaviorData: BehaviorData = {
  currentStatus: 'working',
  workDuration: '06:25:27',
  emotionState: {
    value: 62,
    type: 'anxious',
  },
  dietState: {
    lastMeal: '最近进食',
    calories: 2742,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  },
  digitalUsage: {
    socialMediaHours: 6,
    apps: ['微信', '微博', '抖音'],
  },
};

// AI建议类型
export interface AIRecommendation {
  title: string;
  content: string;
}

// 示例AI建议
export const sampleAIRecommendation: AIRecommendation = {
  title: '削减社交媒体依赖',
  content: '当前样本在"虚拟社交回路"中呈现出高频交互冲动、情绪反馈依赖与昼夜节律破坏特征。社交媒体机制被用于短时多巴胺获取，导致长期注意力稳定机制削弱与认知能耗效率下降。',
}; 