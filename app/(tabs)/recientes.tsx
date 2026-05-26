import React, { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, Card, Field, Row } from '../../src/components/ui';
import { useApp } from '../../src/state/AppContext';
import { colors } from '../../src/theme';
import { currencyFormat } from '../../src/utils';

function parseISODate(d?: string) {
  if (!d) return null;
  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return new Date(`${d}T00:00:00`);
    return new Date(d);
  } catch {
    return null;
  }
}

export default function Recientes() {
  const { transactions, currency } = useApp();

  // filtros simples por texto (sin date picker todavía)
  const [from, setFrom] = useState(''); // ej: 2025-11-01
  const [to, setTo] = useState('');     // ej: 2025-11-30

  // Orden descendente por fecha
  const sorted = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [transactions]
  );

  const filtered = useMemo(() => {
    const fromD = parseISODate(from);
    const toD = parseISODate(to);
    return sorted.filter(t => {
      const d = new Date(t.date).getTime();
      const geFrom = fromD ? d >= fromD.getTime() : true;
      // incluir todo el día "to"
      const leTo = toD ? d <= (toD.getTime() + 24 * 60 * 60 * 1000 - 1) : true;
      return geFrom && leTo;
    });
  }, [sorted, from, to]);

  // Si no hay filtros, mostrar top 50
  const data = (from || to) ? filtered : filtered.slice(0, 50);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Filtros */}
      <Card style={{ marginBottom: 12 }}>
        <Text style={{ color: colors.text, fontWeight: '700', marginBottom: 8 }}>Filtros</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Field label="Desde (YYYY-MM-DD)" value={from} onChangeText={setFrom} placeholder="2025-11-01" />
          </View>
          <View style={{ flex: 1 }}>
            <Field label="Hasta (YYYY-MM-DD)" value={to} onChangeText={setTo} placeholder="2025-11-30" />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button title="Limpiar" onPress={() => { setFrom(''); setTo(''); }} style={{ flex: 1 }} />
        </View>
      </Card>

      {/* Lista de movimientos */}
      <Card style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          data={data}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={{ color: colors.subtle }}>No hay movimientos para ese rango.</Text>}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#2b3940',
                borderRadius: 12,
                padding: 12,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Row
                left={`${item.type === 'expense' ? 'Gasto' : 'Ingreso'} • ${item.category || 'General'}`}
                right={currencyFormat(item.amount, currency)}
              />
              <Text style={{ color: colors.subtle, marginTop: 4 }}>
                {new Date(item.date).toLocaleString()}
              </Text>
              {item.note ? <Text style={{ color: colors.text, marginTop: 6 }}>{item.note}</Text> : null}
            </View>
          )}
        />
      </Card>
    </View>
  );
}