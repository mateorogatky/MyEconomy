import React from 'react';
import { ScrollView, Text } from 'react-native';
import { colors } from '../src/theme';

export default function SobreMi() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: 12 }}>
        Sobre mí
      </Text>

      <Text style={{ color: colors.subtle, lineHeight: 22 }}>
        Mi nombre es Mateo Rogatky, soy argentino y desarrollador full-stack. Trabajo constantemente para mejorar mis habilidades en programación y construir proyectos reales que sean útiles en el día a día.

Me gustan los deportes y disfruto aprender y mejorar tanto en lo personal como en lo profesional.
      </Text>
    </ScrollView>
  );
}