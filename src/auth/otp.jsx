import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle2, Clock3, Gem, ShieldCheck } from 'lucide-react-native';

const gold = '#c2933f';
const otpLength = 4;
const cardShadow = {
  shadowColor: '#7b5d2f',
  shadowOffset: { width: 0, height: 18 },
  shadowOpacity: 0.12,
  shadowRadius: 26,
  elevation: 8,
};
const softWhiteOverlay = {
  backgroundColor: 'rgba(255,255,255,0.65)',
};
const glowOrbStyle = {
  backgroundColor: 'rgba(234, 199, 120, 0.35)',
};
const infoLabelStyle = {
  letterSpacing: 1.1,
};
const titleStyle = {
  color: '#1f1712',
  fontSize: 29,
  lineHeight: 34,
};
const subtitleStyle = {
  color: '#6f5e51',
  fontSize: 14,
  lineHeight: 22,
};
const cardTitleStyle = {
  color: '#211812',
  fontSize: 21,
};
const cardCopyStyle = {
  color: '#7a6a5d',
  fontSize: 14,
  lineHeight: 22,
};
const otpInputStyle = {
  height: 60,
  fontSize: 24,
  color: '#1f1712',
};
const resendMetaStyle = {
  color: '#927553',
  fontSize: 14,
};
const resendLinkStyle = {
  color: gold,
  fontSize: 15,
};
const infoTextStyle = {
  color: '#7b6448',
  fontSize: 14,
  lineHeight: 22,
};

function OtpScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const phoneNumber = route?.params?.phoneNumber || '9876543210';
  const maskedPhone = `+91 ${phoneNumber.slice(0, 2)}******${phoneNumber.slice(-2)}`;
  const isComplete = otp.every(value => value.length === 1);

  const handleChange = (value, index) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const updatedOtp = [...otp];
    updatedOtp[index] = digit;
    setOtp(updatedOtp);

    if (digit && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-1 bg-[#f7f1e7]">
      <StatusBar barStyle="dark-content" backgroundColor="#f7f1e7" />

      <KeyboardAvoidingView
        className="flex-1 bg-[#f7f1e7]"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View
          className="flex-1"
          style={{ paddingBottom: Math.max(insets.bottom, 20) }}
        >
          <View
            className="bg-[#f7f1e7] px-6 pb-[18px]"
            style={{ paddingTop: insets.top + 10 }}
          >
          
            <View className="mt-[8px] flex-row items-center self-start rounded-full border border-[#ecd6ad] bg-[#fff8ee] px-[14px] py-2">
              <Gem size={18} color={gold} strokeWidth={1.9} />
              <Text className="ml-2 text-[13px] font-bold text-[#826236]">
                Secure Verification
              </Text>
            </View>

            <Text
              className="mt-[18px] font-extrabold"
              style={titleStyle}
            >
              Enter your OTP
            </Text>
            <Text
              className="mt-[8px] pr-3"
              style={subtitleStyle}
            >
              A one-time code has been sent to {maskedPhone} to protect your account and purchases.
            </Text>
          </View>

          <View className="flex-1 px-5 pb-2">
            <View
              className="absolute right-[30px] top-[18px] h-24 w-24 rounded-full"
              style={glowOrbStyle}
            />
            <View
              className="rounded-[28px] bg-[#fffdf9] px-5 py-[22px]"
              style={cardShadow}
            >
              <View className="h-[58px] w-[58px] self-center items-center justify-center rounded-[18px] bg-[#1f1712]">
                <ShieldCheck size={26} color="#fffaf3" strokeWidth={2.1} />
              </View>

              <Text
                className="mt-[14px] text-center font-extrabold"
                style={cardTitleStyle}
              >
                Verify your mobile number
              </Text>
              <Text
                className="mt-2 px-2 text-center"
                style={cardCopyStyle}
              >
                Use the 4-digit code below to continue into the Shree Yamunaji experience.
              </Text>

              <View className="mt-[22px] flex-row justify-between gap-3">
                {otp.map((digit, index) => (
                  <TextInput
                    key={`otp-${index}`}
                    ref={ref => {
                      inputRefs.current[index] = ref;
                    }}
                    value={digit}
                    onChangeText={value => handleChange(value, index)}
                    onKeyPress={event => handleKeyPress(event, index)}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    maxLength={1}
                    className={`flex-1 rounded-[18px] border text-center font-extrabold ${
                      digit
                        ? 'border-[#c2933f] bg-[#fff6e6]'
                        : 'border-[#e7dcc9] bg-[#fffaf4]'
                    }`}
                    style={otpInputStyle}
                    selectionColor={gold}
                  />
                ))}
              </View>

              <TouchableOpacity
                activeOpacity={0.92}
                disabled={!isComplete}
                className={`mt-[22px] h-[54px] flex-row items-center justify-center rounded-[18px] ${
                  isComplete ? 'bg-[#17120e]' : 'bg-[#b7aea4]'
                }`}
              >
                <Text className="mr-[10px] text-[17px] font-extrabold text-white">
                  Verify & Continue
                </Text>
                <CheckCircle2 size={20} color="#fff" strokeWidth={2.2} />
              </TouchableOpacity>

              <View className="mt-4 flex-row items-center justify-center">
                <Clock3 size={16} color="#927553" strokeWidth={2} />
                <Text
                  className="ml-2 font-semibold"
                  style={resendMetaStyle}
                >
                  Resend code in 00:28
                </Text>
              </View>

              <TouchableOpacity activeOpacity={0.85}>
                <Text
                  className="mt-[14px] text-center font-extrabold"
                  style={resendLinkStyle}
                >
                  Didn't receive it? Resend OTP
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-[14px] rounded-[20px] border border-[#f0dfbd] bg-[#fff7e8] px-[18px] py-[13px]">
              <Text
                className="text-[13px] font-extrabold uppercase text-[#6c522d]"
                style={infoLabelStyle}
              >
                Why this matters
              </Text>
              <Text className="mt-2" style={infoTextStyle}>
                OTP verification keeps your wishlist, orders, and premium offers safe.
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default OtpScreen;
