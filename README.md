# MyEconomy

**Ingresos, gastos y metas de ahorro en una aplicación móvil.**

MyEconomy busca facilitar el seguimiento de la economía personal: registrar movimientos, ver el balance del mes y saber cuánto falta para llegar a una meta. Los datos se guardan localmente en el dispositivo mediante AsyncStorage.

## Qué incluye

- Resumen mensual de ingresos, gastos y balance.
- Registro de movimientos con monto, tipo, categoría, nota y fecha.
- Consulta de movimientos recientes.
- Metas de ahorro con monto objetivo y progreso.
- Registro de ingresos y pagos recurrentes con frecuencia semanal, mensual o anual.
- Botón «Aplicar ahora» para incorporar manualmente un recurrente a los movimientos.
- Selección del código de moneda, como USD o ARS.

Por ejemplo, se puede registrar un ingreso, cargar los gastos del mes y consultar cuánto queda disponible mientras se sigue una meta de ahorro.

## Tecnologías

React Native · Expo SDK 54 · TypeScript · Expo Router · React Context · AsyncStorage.

Las pantallas están en `app/(tabs)/`, el estado compartido y la persistencia en `src/state/AppContext.tsx`, y los componentes reutilizables en `src/components/ui.tsx`.

## Ejecutar en desarrollo

Requiere Node.js, npm y un emulador o dispositivo compatible con la versión de Expo del proyecto.

```bash
git clone https://github.com/mateorogatky/MyEconomy.git
cd MyEconomy
npm install
npm start
```

El menú de Expo permite elegir el entorno. En iOS, el simulador requiere macOS. La compatibilidad con Expo Go depende de la versión del SDK y de las dependencias nativas.

## Estado y alcance

Prototipo en desarrollo con almacenamiento local. La moneda seleccionada modifica la presentación de los importes; no convierte saldos entre divisas. Los recurrentes se aplican manualmente: no hay un programador automático de pagos. El código actual no incluye sincronización entre dispositivos ni conexión bancaria.

Próximas mejoras propuestas: exportación y respaldo de datos, conversión de monedas y aplicación automática de recurrentes.

## Autor

[Mateo Nicolás Rogatky](https://github.com/mateorogatky)
