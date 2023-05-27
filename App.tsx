import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { CalculadoraScreen } from './src/screens/CalculadoraScreen';
import { styles } from './src/theme/appTheme';

function App() {
  return (
    <SafeAreaView style={styles.fondo}>
      {/* Cambiando color de fondo de barra de estado del movil */}
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <CalculadoraScreen />
    </SafeAreaView>
  );
}


export default App;
