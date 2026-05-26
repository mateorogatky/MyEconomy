import React from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';


export function Card({ children, style }: any) {
return (
<View style={[{ backgroundColor: colors.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.border }, style]}>
{children}
</View>
);
}


export function Button({ title, onPress, variant = 'default', style }: any) {
const bg = variant === 'good' ? colors.good : variant === 'bad' ? colors.bad : colors.card;
return (
<TouchableOpacity onPress={onPress} style={[{ backgroundColor: bg, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.border }, style]}>
<Text style={{ color: colors.text, fontWeight: '600', textAlign: 'center' }}>{title}</Text>
</TouchableOpacity>
);
}


export function Field({ label, value, onChangeText, placeholder, keyboardType, style }: any) {
return (
<View style={[{ marginBottom: 10 }, style]}>
<Text style={{ color: colors.subtle, marginBottom: 6 }}>{label}</Text>
<TextInput
value={value}
onChangeText={onChangeText}
placeholder={placeholder}
placeholderTextColor={colors.subtle}
keyboardType={keyboardType}
style={{ backgroundColor: '#2b3940', borderRadius: 10, color: colors.text, paddingHorizontal: 12, paddingVertical: Platform.OS === 'ios' ? 12 : 8, borderWidth: 1, borderColor: colors.border }}
/>
</View>
);
}


export function Row({ left, right }: any) {
return (
<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
<Text style={{ color: colors.subtle }}>{left}</Text>
<Text style={{ color: colors.text, fontWeight: '600' }}>{right}</Text>
</View>
);
}


export function ProgressBar({ value = 0, max = 100 }: { value?: number; max?: number }) {
const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
return (
<View style={{ height: 10, backgroundColor: '#2b3940', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: colors.border }}>
<View style={{ width: `${pct}%`, height: '100%', backgroundColor: pct >= 100 ? colors.bad : colors.good }} />
</View>
);
}