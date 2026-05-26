import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import "react-native-gesture-handler";
import "react-native-reanimated";
import { Card, ProgressBar, Row } from '../../src/components/ui';
import { useApp } from '../../src/state/AppContext';
import { colors } from '../../src/theme';
import { currencyFormat } from '../../src/utils';

export default function Dashboard() {
  const router = useRouter();
  const { currency, currentMonth, income, expense, balance, goals } = useApp();

  const spendCap = Math.max(100, income || 100);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* Resumen mensual */}
      <Card style={{ marginBottom: 12 }}>
        <Text style={{ color: colors.subtle, marginBottom: 6 }}>Mes actual</Text>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: 8 }}>
          {currentMonth}
        </Text>
        <Row left={'Ingresos'} right={currencyFormat(income, currency)} />
        <Row left={'Gastos'} right={currencyFormat(expense, currency)} />
        <View style={{ height: 8 }} />
        <Row left={'Balance'} right={currencyFormat(balance, currency)} />
        <View style={{ height: 8 }} />
        <ProgressBar value={expense} max={spendCap} />
        <Text style={{ color: colors.subtle, marginTop: 6 }}>Gasto vs ingresos (barra)</Text>
      </Card>

      {/* Meta principal (opcional) */}
      {goals.length > 0 && (
        <Card style={{ marginBottom: 12 }}>
          <Text style={{ color: colors.text, fontWeight: '700', marginBottom: 6 }}>Meta principal</Text>
          {(() => {
            const g = goals[0]; // elegí la que quieras
            const pct = Math.min(100, Math.round(((Number(g.saved) || 0) / Number(g.target)) * 100));
            return (
              <View>
                <Row left={g.name} right={`${pct}%`} />
                <Text style={{ color: colors.subtle, marginVertical: 4 }}>
                  {currencyFormat(g.saved, currency)} / {currencyFormat(g.target, currency)}
                </Text>
                <ProgressBar value={g.saved} max={g.target} />
                {g.note ? <Text style={{ color: colors.subtle, marginTop: 6 }}>{g.note}</Text> : null}
              </View>
            );
          })()}
        </Card>
      )}

      
    </ScrollView>
  );
}