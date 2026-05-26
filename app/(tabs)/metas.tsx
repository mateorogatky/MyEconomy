import React, { useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';
import { v4 as uuid } from 'uuid';
import { Button, Card, Field, ProgressBar, Row } from '../../src/components/ui';
import { useApp } from '../../src/state/AppContext';
import { colors } from '../../src/theme';
import { currencyFormat } from '../../src/utils';

export default function Metas() {
  const { goals, setGoals, currency } = useApp();

  // 👇 Estos estados deben declararse DENTRO del componente,
  // antes de usarlos en cualquier función:
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [saved, setSaved] = useState('');
  const [note, setNote] = useState('');

  const addGoal = () => {
    const t = Number(target);
    const s = Number(saved || 0);
    if (!t || t <= 0) {
      Alert.alert('Objetivo inválido');
      return;
    }
    const g = { id: uuid(), name, target: t, saved: s, note };
    setGoals(prev => [g as any, ...prev]);

    // 👇 Este reset de campos debe ir dentro de la función, no al tope del archivo
    setName('');
    setTarget('');
    setSaved('');
    setNote('');
    setModalOpen(false);
  };

  const removeGoal = (id: string) => {
    Alert.alert('Eliminar', '¿Eliminar meta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => setGoals(prev => prev.filter(g => g.id !== id)),
      },
    ]);
  };

  const addSavings = (goal: any, amount: number) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === goal.id
          ? { ...g, saved: Math.max(0, (Number(g.saved) || 0) + Number(amount || 0)) }
          : g,
      ),
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      

      <Button title="Agregar meta (+)" onPress={() => setModalOpen(true)} style={{ marginBottom: 12 }} />

      <Card>
        {goals.length === 0 ? (
          <Text style={{ color: colors.subtle }}>No tienes metas aún.</Text>
        ) : (
          goals.map(g => {
            const pct = Math.min(100, Math.round(((Number(g.saved) || 0) / Number(g.target)) * 100));
            return (
              <View
                key={g.id}
                style={{
                  backgroundColor: '#2b3940',
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Row left={g.name} right={`${pct}%`} />
                <Text style={{ color: colors.subtle, marginVertical: 4 }}>
                  {currencyFormat(g.saved, currency)} / {currencyFormat(g.target, currency)}
                </Text>
                <ProgressBar value={g.saved} max={g.target} />
                {g.note ? <Text style={{ color: colors.subtle, marginTop: 6 }}>{g.note}</Text> : null}
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                  <Button title="+10" variant="good" onPress={() => addSavings(g, 10)} style={{ flex: 1 }} />
                  <Button title="+50" variant="good" onPress={() => addSavings(g, 50)} style={{ flex: 1 }} />
                  <Button title="Eliminar" variant="bad" onPress={() => removeGoal(g.id)} style={{ flex: 1 }} />
                </View>
              </View>
            );
          })
        )}
      </Card>

      <Modal visible={modalOpen} animationType="slide" onRequestClose={() => setModalOpen(false)}>
        <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
          <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: 12 }}>
            Nueva meta
          </Text>
          <Field label="Nombre" value={name} onChangeText={setName} placeholder="Ej: Ahorro regreso Argentina" />
          <Field label="Objetivo" value={target} onChangeText={setTarget} placeholder="0.00" keyboardType="numeric" />
          <Field label="Ahorro inicial" value={saved} onChangeText={setSaved} placeholder="0.00" keyboardType="numeric" />
          <Field label="Nota" value={note} onChangeText={setNote} placeholder="Opcional" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <Button title="Guardar" variant="good" onPress={addGoal} style={{ flex: 1 }} />
            <Button title="Cancelar" onPress={() => setModalOpen(false)} style={{ flex: 1 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}