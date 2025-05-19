import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  BackHandler,
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useUserContext } from '../utils/UserContext';

// 导入组件
import HeaderCard from '../components/HeaderCard';
import AISummaryCard from '../components/AISummaryCard';
import StatusRow from '../components/StatusRow';
import FoodCard from '../components/FoodCard';
import AppUsageCard from '../components/AppUsageCard';
import AIGoalCard from '../components/AIGoalCard';
import MainBackground from '../components/MainBackground';
import CurrentStatusBox from '../components/CurrentStatusBox';
import TimeManagementBox from '../components/TimeManagementBox';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const { userData, behaviorData, aiRecommendation } = useUserContext();

  // 处理返回键，防止回到设置页面
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // 阻止默认返回行为
    });

    return () => backHandler.remove();
  }, []);

  // 处理"增加记录"按钮点击
  const handleAddRecord = () => {
    Alert.alert(
      '即将上线',
      '记录功能即将上线，敬请期待！',
      [
        { text: '确定', style: 'default' }
      ]
    );
  };

  // 获取情绪状态颜色
  const getEmotionColor = () => {
    switch (behaviorData.emotionState.type) {
      case 'anxious':
        return '#ff3b30';
      case 'calm':
        return '#34c759';
      case 'happy':
        return '#ffcc00';
      case 'stressed':
        return '#ff9500';
      default:
        return '#ffffff';
    }
  };

  // 获取当前状态文本
  const getStatusText = () => {
    switch (behaviorData.currentStatus) {
      case 'working':
        return '工作中';
      case 'home':
        return '家中';
      case 'outside':
        return '外出';
      default:
        return '未知';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <MainBackground />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* 头部信息卡片 */}
        <HeaderCard />
        
        {/* AI系统摘要 */}
        <View style={styles.aiSummaryWrapper}>
          <AISummaryCard 
            mainTitle="今日在'虚拟社交区'停留超出安全阈值，请干预。"
            subtitle="建议优化 注意力机制系统。"
          />
        </View>
        
        {/* 状态数据区 */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>状态数据</Text>
          
          {/* 当前状态与工作时间 */}
          <CurrentStatusBox 
            status={getStatusText()}
            workTime="06:25:27"
          />
          
          {/* 情绪状态和饮食状态并排 */}
          <View style={styles.rowContainer}>
            <AppUsageCard 
              hours={behaviorData.digitalUsage.socialMediaHours}
              apps={[]}
            />
            <View style={{width: 10}} />
            <FoodCard 
              title={behaviorData.dietState.lastMeal} 
              calories={behaviorData.dietState.calories}
            />
          </View>
        </View>
        
        {/* 时间管理 */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>时间管理</Text>
          <TimeManagementBox 
            hours={behaviorData.digitalUsage.socialMediaHours}
          />
        </View>
        
        {/* 底部按钮 */}
        <TouchableOpacity style={styles.bottomButton} onPress={handleAddRecord}>
          <Text style={styles.bottomButtonText}>增加记录</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 15,
    paddingBottom: 30,
  },
  aiSummaryWrapper: {
    marginTop: 180,
    marginBottom: 30,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9E9E9E',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButton: {
    backgroundColor: '#FFDD00',
    borderRadius: 99,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  bottomButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
});

export default MainScreen; 