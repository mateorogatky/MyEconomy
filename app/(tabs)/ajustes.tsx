import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, Card, Field } from '../../src/components/ui';
import { useApp } from '../../src/state/AppContext';
import { colors } from '../../src/theme';

export default function Ajustes() {
const { currency, setCurrency } = useApp();
const [code, setCode] = useState(currency);
const router = useRouter();

const save = () => {
if (!code || code.length < 3) return Alert.alert('Código inválido (ej: USD, ARS)');
setCurrency(code.toUpperCase());
Alert.alert('Listo', 'Moneda actualizada.');
};


const resetData = async () => {
Alert.alert('Reiniciar', '¿Borrar todos los datos?', [
{ text: 'Cancelar', style: 'cancel' },
{ text: 'Borrar', style: 'destructive', onPress: async () => {
const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
await AsyncStorage.removeItem('economia:v1');
Alert.alert('Hecho', 'Reinicia la app para empezar de cero.');
}}
]);
};


return (
<View style={{ flex: 1, padding: 16 }}>

<Card>
<Field label="Moneda" value={code} onChangeText={setCode} placeholder="USD o ARS" />
<Button title="Guardar" variant="good" onPress={save} />
<View style={{ height: 12 }} />
<Button title="Borrar todos los datos" variant="bad" onPress={resetData} />
<View style={{ height: 12 }} />
<Text style={{ color: colors.subtle }}>Sugerencia: USD para EE.UU., ARS si migrás a Argentina. Más adelante agregamos conversión automática.</Text>
</Card>
<Button
  title="Sobre mí"
  onPress={() => router.push('/sobre-mi')}
  style={{ marginTop: 12 }}
/>
</View>
);
}