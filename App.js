import React, { useState, useEffect } from 'react';
import { AsyncStorage, 
          StyleSheet, 
          Text, 
          View, 
          TextInput, 
          TouchableOpacity,
          Keyboard } from 'react-native';

export default function App() {

  const[input, setInput] = useState('');
  const[nome, setNome] = useState('');


  function gravaNome() {
    setNome(input);
    alert('Salvo com sucesso!');
    Keyboard.dismiss();
  }

  useEffect(() => {

    async function getFromStore() {
      await AsyncStorage.getItem('nome').then((value)=> {
        setNome(value);
      });
    }

    getFromStore();
    
  },[]);

  useEffect(() => {

    async function store() {
      await AsyncStorage.setItem('nome', nome);
    }

    store();


  },[nome]); 

  return (
    <View style={styles.container}>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text)=>setInput(text)}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={gravaNome}>
          <Text style={styles.botao}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.nome}>{nome}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 26,
    alignItems: 'center'
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    width: 300,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10
  },
  botao: {
    backgroundColor: '#222',
    color: '#fff',
    height: 40,
    padding: 10,
    marginLeft: 4
  },
  nome:{
    fontSize: 30,
    textAlign: 'center'
  }
});
