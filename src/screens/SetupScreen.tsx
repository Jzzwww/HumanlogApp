import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  Dimensions
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useUserContext } from '../utils/UserContext';
import * as ImagePicker from 'expo-image-picker';
import ToggleSwitch from '../components/ToggleSwitch';

type SetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SetupScreen'>;

interface SetupScreenProps {
  navigation: SetupScreenNavigationProp;
}

const { height } = Dimensions.get('window');

const SetupScreen: React.FC<SetupScreenProps> = ({ navigation }) => {
  const { userData, setSingleUserDataProperty, setRecordOption, generateSampleId } = useUserContext();
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | ''>('');
  const sampleId = useRef(generateSampleId()).current;
  
  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    setSingleUserDataProperty('gender', gender);
  };

  const handleAvatarUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('需要访问相册权限以选择头像');
      return;
    }
    
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!pickerResult.canceled) {
      setSingleUserDataProperty('avatar', pickerResult.assets[0].uri);
    }
  };

  const handleDateSelection = () => {
    // 临时使用Alert代替DatePicker，避免原生模块的问题
    const today = new Date();
    const birthYear = 1994;
    const age = today.getFullYear() - birthYear;
    
    Alert.alert(
      '出生日期选择',
      '在实际应用中，这里将显示日期选择器',
      [
        {
          text: '确定',
          onPress: () => {
            const birthDate = new Date(birthYear, 1, 9); // 1994-02-09
            setSingleUserDataProperty('birthDate', birthDate);
            setSingleUserDataProperty('age', age);
          }
        }
      ]
    );
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '09/02/1994'; // 默认显示一个固定日期
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleContinue = () => {
    navigation.navigate('MainScreen');
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        scrollEnabled={true}
      >
        {/* 标题 */}
        <Text style={styles.headerTitle}>上传样本照片</Text>
        
        {/* 头像上传区域 */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={handleAvatarUpload}>
            {userData.avatar ? (
              <View style={styles.avatarWithOverlay}>
                {/* 头像底部装饰图片作为背景 */}
                <Image 
                  source={require('../../assets/images/avatar_overlay.png')} 
                  style={styles.avatarBackground} 
                  resizeMode="cover"
                />
                <Image source={{ uri: userData.avatar }} style={styles.avatar} />
              </View>
            ) : (
              <View style={styles.avatarPlaceholder}>
                {/* 头像底部装饰图片作为背景 */}
                <Image 
                  source={require('../../assets/images/avatar_overlay.png')} 
                  style={styles.avatarBackground} 
                  resizeMode="cover"
                />
                <Text style={styles.addIcon}>+</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        {/* 编号 */}
        <Text style={styles.sampleId}>
          <Text style={styles.idLabel}>编号：</Text>
          <Text style={styles.idValue}>{sampleId}</Text>
        </Text>
        
        {/* 基础信息 */}
        <Text style={styles.sectionLabel}>基础信息</Text>
        
        {/* 性别 */}
        <TouchableOpacity style={styles.inputRow} onPress={() => handleGenderSelect(selectedGender === 'male' ? 'female' : 'male')}>
          <Text style={styles.rowLabel}>性别</Text>
          <Text style={styles.rowValue}>
            {selectedGender === 'male' ? '男' : selectedGender === 'female' ? '女' : '女'}
          </Text>
        </TouchableOpacity>
        
        {/* 出生日期 */}
        <TouchableOpacity style={styles.inputRow} onPress={handleDateSelection}>
          <Text style={styles.rowLabel}>出生日期</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateValue}>09</Text>
            <Text style={styles.dateValue}>/</Text>
            <Text style={styles.dateValue}>02</Text>
            <Text style={styles.dateValue}>/</Text>
            <Text style={styles.dateValue}>1994</Text>
          </View>
        </TouchableOpacity>
        
        {/* 年龄 */}
        <View style={styles.inputRow}>
          <Text style={styles.rowLabel}>年龄</Text>
          <Text style={styles.rowValue}>{userData.age || '31'}</Text>
        </View>

        {/* 地址信息 */}
        <Text style={styles.sectionLabel}>栖息地</Text>
        
        {/* 工作地址 */}
        <TouchableOpacity style={styles.inputRow}>
          <Text style={styles.rowLabel}>选择地址</Text>
          <Text style={styles.rowValue}>工作地</Text>
        </TouchableOpacity>
        
        {/* 家庭地址 */}
        <TouchableOpacity style={styles.inputRow}>
          <Text style={styles.rowLabel}>选择地址</Text>
          <Text style={styles.rowValue}>家</Text>
        </TouchableOpacity>
        
        {/* 记录维度 */}
        <Text style={styles.sectionLabel}>记录维度</Text>
        
        {/* 应用使用时间 */}
        <View style={styles.switchRow}>
          <Text style={styles.rowLabel}>应用使用时间</Text>
          <ToggleSwitch 
            isOn={userData.recordOptions.appUsageTracking}
            onToggle={() => setRecordOption('appUsageTracking', !userData.recordOptions.appUsageTracking)}
          />
        </View>
        
        {/* 工作/家状态 */}
        <View style={styles.switchRow}>
          <Text style={styles.rowLabel}>工作/家状态</Text>
          <ToggleSwitch 
            isOn={userData.recordOptions.locationTracking}
            onToggle={() => setRecordOption('locationTracking', !userData.recordOptions.locationTracking)}
            isActive={false}
          />
        </View>
        
        {/* 完成按钮 */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>完成</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000', // 纯黑色背景
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    paddingTop: 30,
    paddingBottom: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Source Han Serif CN',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarWrapper: {
    width: 144,
    height: 144,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarWithOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  avatarOverlayInside: {
    width: 120,
    height: 40,
    position: 'absolute',
    bottom: 5,
  },
  addIcon: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'normal',
    zIndex: 1,
  },
  sampleId: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  idLabel: {
    color: '#9E9E9E',
    fontSize: 10,
  },
  idValue: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat',
    fontWeight: '300',
  },
  sectionLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    marginBottom: 10,
    marginTop: 15,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 8,
    height: 47,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginBottom: 12,
    height: 48,
  },
  rowLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  rowValue: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    textAlign: 'right',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateValue: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#FFDD00',
    paddingVertical: 15,
    borderRadius: 99,
    marginVertical: 30,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
});

export default SetupScreen; 