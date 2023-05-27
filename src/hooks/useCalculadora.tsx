import { useRef, useState } from "react";

//* Este enum devuelve numeros empezando desde el 0 en orden
enum Operadores {
  sumar, // 0
  restar, // 1
  multiplicar, // 2
  dividir, // 3
}

const useCalculadora = () => {
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');

  const ultimaOperacion = useRef<Operadores>();

  //* Borra toda el numero
  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  //* Muestra el numero actual
  const armarNumero = (numeroTexto: string) => {
    //* No aceptar más de un punto decimal
    if (numero.includes('.') && numeroTexto === '.') return;

    //* Si el número empieza con 0 o -0...
    if (numero.startsWith('0') || numero.startsWith('-0')) {
      //* Evaluar punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);

        //* Evaluar si es otro 0 y hay un punto decimal
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);

        //* Evaluar si es diferente de 0 y no tiene punto decimal
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);

        //* Evitar 000.0
      } else if (numeroTexto === '0' && numero.includes('0')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
      return;
    }

    setNumero(numero + numeroTexto);
  };

  //* Convierte a positivo o negativo un numero
  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
      return;
    }
    setNumero('-' + numero);
  };

  //* Borra uno por uno el dígito de un numero
  const btnDelete = () => {
    let negativo = '';
    let numeroTemp = numero;

    //* Si el numero es negativo...
    if (numero.includes('-')) {
      negativo = '-';
      numeroTemp = numero.slice(1); //* numero sin menos
    }

    //* Si el numero sin '-' es igual a 1...
    if (numeroTemp.length > 1) {
      setNumero(negativo + numeroTemp.slice(0, -1));
      return;
    }

    setNumero('0');
  };

  //* Permite cambiar el numero actual al numero anterior al momento de ejecutar una operación
  const cambiarNumPorAnterior = () => {
    //* Si el numero termina con un punto...
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }

    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };

  const btnMultiplicar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };

  const btnRestar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  };

  const btnSumar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${num1 + num2}`);
        break;
      case Operadores.restar:
        setNumero(`${num2 - num1}`);
        break;
      case Operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        break;
      case Operadores.dividir:
        setNumero(`${num2 / num1}`);
        break;
    }

    setNumeroAnterior('0');
  };

  return {
    numero,
    numeroAnterior,
    limpiar,
    armarNumero,
    positivoNegativo,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
  };
};

export default useCalculadora;
