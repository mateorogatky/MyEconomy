import React, { useState } from 'react';
import { Alert, FlatList, Modal, Text, View } from 'react-native';
import { v4 as uuid } from 'uuid';

import { Button, Card, Field, Row } from '../../src/components/ui';
import { useApp } from '../../src/state/AppContext';
import { colors } from '../../src/theme';
import { currencyFormat, monthKey, todayISO } from '../../src/utils';

export default function Recurrentes() {
  const { recurrings, setRecurrings, setTransactions } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<'income'|'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [cadence, setCadence] = useState<'weekly'|'monthly'|'yearly'>('monthly');
  const [category, setCategory] = useState('General');
  const [nextDate, setNextDate] = useState(todayISO());

  const addRecurring = () => {
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      Alert.alert('Monto inválido');
      return;
    }
    const r = { id: uuid(), name, type, amount: amt, cadence, category, nextDate };
    setRecurrings(prev => [r, ...prev]);
    // reset
    setName('');
    setAmount('');
    setCadence('monthly');
    setCategory('General');
    setType('expense');
    setNextDate(todayISO());
    setModalOpen(false);
  };

  const removeRecurring = (id: string) => {
    Alert.alert('Eliminar', '¿Eliminar recurrente?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => setRecurrings(prev => prev.filter(r => r.id !== id)),
      },
    ]);
  };

  const applyNow = (r: any) => {
    const tx = {
      id: uuid(),
      type: r.type,
      amount: r.amount,
      category: r.category || r.name,
      note: `Recurrente: ${r.name}`,
      date: todayISO(),
      month: monthKey(),
    };
    setTransactions(prev => [tx as any, ...prev]);
    Alert.alert(
      'Aplicado',
      `Se agregó un ${r.type === 'expense' ? 'gasto' : 'ingreso'} de ${currencyFormat(r.amount)}.`
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      

      <Button title="Agregar recurrente (+)" onPress={() => setModalOpen(true)} style={{ marginBottom: 12 }} />

      <Card style={{ flex: 1 }}>
  <FlatList
    style={{ flex: 1 }}
    contentContainerStyle={{ paddingBottom: 16 }}
    data={recurrings}
    keyExtractor={(item) => item.id}
    ListEmptyComponent={<Text style={{ color: colors.subtle }}>No tienes pagos/ingresos recurrentes.</Text>}
    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
    renderItem={({ item: r }) => (
      <View
        style={{
          backgroundColor: '#2b3940',
          borderRadius: 12,
          padding: 12,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Row left={`${r.name} • ${r.cadence}`} right={currencyFormat(r.amount)} />
        <Text style={{ color: colors.subtle, marginTop: 4 }}>
          {r.type === 'expense' ? 'Gasto' : 'Ingreso'} • Próx.: {new Date(r.nextDate).toLocaleDateString()}
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <Button title="Aplicar ahora" variant="good" onPress={() => applyNow(r)} style={{ flex: 1 }} />
          <Button title="Eliminar" variant="bad" onPress={() => removeRecurring(r.id)} style={{ flex: 1 }} />
        </View>
      </View>
    )}
  />
</Card>

      <Modal visible={modalOpen} animationType="slide" onRequestClose={() => setModalOpen(false)}>
        <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
          <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: 12 }}>
            Nuevo recurrente
          </Text>
          <Field label="Nombre" value={name} onChangeText={setName} placeholder="Ej: Alquiler, Sueldo" />
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
            <Button
              title={type === 'expense' ? 'Tipo: Gasto' : 'Tipo: Ingreso'}
              onPress={() => setType(t => (t === 'expense' ? 'income' : 'expense'))}
              style={{ flex: 1 }}
            />
            <Button
              title={`Frecuencia: ${cadence}`}
              onPress={() =>
                setCadence(c => (c === 'monthly' ? 'weekly' : c === 'weekly' ? 'yearly' : 'monthly'))
              }
              style={{ flex: 1 }}
            />
          </View>
          <Field label="Monto" value={amount} onChangeText={setAmount} placeholder="0.00" keyboardType="numeric" />
          <Field label="Categoría" value={category} onChangeText={setCategory} placeholder="General" />
          <Field label="Próxima fecha (ISO)" value={nextDate} onChangeText={setNextDate} placeholder={todayISO()} />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <Button title="Guardar" variant="good" onPress={addRecurring} style={{ flex: 1 }} />
            <Button title="Cancelar" onPress={() => setModalOpen(false)} style={{ flex: 1 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}