import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<TextInput[]>([]);
  const theme = useTheme();

  const handleChange = (text: string, index: number) => {
    if (isNaN(Number(text))) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    const code = newOtp.join('');
    if (code.length === length) {
      onComplete(code);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => ref && (inputs.current[index] = ref)}
          style={[styles.input, { borderColor: theme.colors.primary }]}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  input: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
