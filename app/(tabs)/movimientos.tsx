import React, { useState } from 'react';
import { Alert, FlatList, Modal, Text, View } from 'react-native';
import { v4 as uuid } from 'uuid';

import { Button, Card, Field, Row } from '../../src/components/ui';
import { useApp } from '../../src/state/AppContext';
import { colors } from '../../src/theme';
import { currencyFormat, monthKey, todayISO } from '../../src/utils';

export default function Movimientos() {
  const { transactions, setTransactions, currency, currentMonth } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(todayISO()); // <= ahora sí está importado

  const addTx = () => {
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      Alert.alert('Monto inválido', 'Ingresa un monto mayor a 0.');
      return;
    }
    const tx = {
      id: uuid(),
      type,
      amount: amt,
      category,
      note,
      date,
      month: monthKey(date),
    } as const;

    setTransactions(prev => [tx as any, ...prev]);
    setModalOpen(false);
    setAmount('');
    setNote('');
    setCategory('General');
    setType('expense');
    setDate(todayISO());
  };

  const removeTx = (id: string) => {
    Alert.alert('Eliminar', '¿Eliminar este movimiento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => setTransactions(prev => prev.filter(t => t.id !== id)),
      },
    ]);
  };

  const monthTx = transactions.filter(t => t.month === currentMonth);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      

      <Button title="Agregar movimiento (+)" onPress={() => setModalOpen(true)} style={{ marginBottom: 12 }} />

      {monthTx.length === 0 ? (
  <Card>
    <Text style={{ color: colors.subtle }}>Aún no hay movimientos este mes.</Text>
  </Card>
) : (
  <Card style={{ flex: 1 }}>
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 16 }}
      data={monthTx}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      renderItem={({ item }) => (
        <View style={{ backgroundColor: '#2b3940', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: colors.border }}>
          <Row left={`${item.type === 'expense' ? 'Gasto' : 'Ingreso'} • ${item.category}`} right={currencyFormat(item.amount, currency)} />
          <Text style={{ color: colors.subtle, marginTop: 4 }}>{new Date(item.date).toLocaleString()}</Text>
          {item.note ? <Text style={{ color: colors.text, marginTop: 6 }}>{item.note}</Text> : null}
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <Button title="Eliminar" variant="bad" onPress={() => removeTx(item.id)} style={{ flex: 1 }} />
          </View>
        </View>
      )}
    />
  </Card>
)}

      <Modal visible={modalOpen} animationType="slide" onRequestClose={() => setModalOpen(false)}>
        <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
          <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: 12 }}>
            Nuevo movimiento
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
            <Button
              title={type === 'expense' ? 'Tipo: Gasto' : 'Tipo: Ingreso'}
              onPress={() => setType(t => (t === 'expense' ? 'income' : 'expense'))}
              style={{ flex: 1 }}
            />
          </View>
          <Field
            label={`Monto (${currency})`}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
          />
          <Field
            label="Categoría"
            value={category}
            onChangeText={setCategory}
            placeholder="Ej: Comida, Alquiler"
          />
          <Field label="Nota" value={note} onChangeText={setNote} placeholder="Opcional" />
          <Field
            label="Fecha (ISO)"
            value={date}
            onChangeText={setDate}
            placeholder={todayISO()}
          />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <Button title="Guardar" variant="good" onPress={addTx} style={{ flex: 1 }} />
            <Button title="Cancelar" onPress={() => setModalOpen(false)} style={{ flex: 1 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}