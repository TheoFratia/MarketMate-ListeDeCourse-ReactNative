import { Text,  View, Pressable, Image, TextInput, FlatList, StatusBar } from "react-native";
import { AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from "../Styles/TextStyles";
import Vue from "../Styles/Vue";
import Ionicons from '@expo/vector-icons/Ionicons';



const Liste = ( {navigation, route}) => {
  const { nom } = route.params;
  const [element, setElement] = useState('');
  const [list, setList] = useState([]);



  const removeList = async () => {
    try {
      //supprimer l'enregistrement de la liste
      await AsyncStorage.removeItem(nom);
      
      //retour a l'écran principal
      navigation.navigate("Accueil");

    } catch (error) {
      console.log(`Erreur lors de la suppression de la liste ${listName}: ${error}`);
    }
  }

  const removeItemListe = async (item) => {
    try {
      //supprimer de la liste local
      const newList = list.filter(i => i.element !== item);
      setList(newList);

      //enregistrement de la modification de la liste 
      await AsyncStorage.setItem(nom, JSON.stringify(newList));

    } catch (error) {
      console.log(`Erreur lors de la suppression de la liste ${listName}: ${error}`);
    }
  }

  const saveList = async (listElement) => {
    try {
      let listPushed = [{
        id: null,
        element: listElement,
      }];
      list.push(listPushed[0]);
      await AsyncStorage.setItem(nom, JSON.stringify(list));
      setElement('');
    } catch (error) {
        console.log(error);
    }
  };

  const getLists = async () => {
    try {
      const list = await AsyncStorage.getItem(nom);
      setList(JSON.parse(list));
    } catch (error) {
        console.log(error);
    }
  };


  useEffect(() => {
    getLists();
  }, []);



  return (
    <View style={Vue.container}>
      <StatusBar/>

      <View style={Vue.entete}>

        <Pressable
          style={{padding: 10, marginTop: 3}}
          onPress={() => navigation.navigate("Rappel",{
            nom: nom,
          })}>
          <Ionicons name="alarm-outline" style={styles.icon} />
        </Pressable>

        <Pressable
          style={{padding: 10, marginTop: 3}}
          onPress={() => navigation.navigate("Fav",{
            nom: nom,
          })}>
          <Ionicons name="heart" style={styles.icon} />
        </Pressable>

        <Pressable
          style={{padding: 10}}
          onPress={() => navigation.navigate("Recette",{
            nom: nom,
          })}>
          <Ionicons name="ios-fast-food-outline" style={styles.icon}/>
        </Pressable>

        <Pressable
          style={{padding: 10}}
          onPress={() => removeList()}>
          <Ionicons name="trash" style={styles.icon} />
        </Pressable>

      </View>


        <Image
            style={{ height: "35%", width: "80%", resizeMode: "stretch", marginTop: -30}}
            source={require("../assets/Images/logoOnApp.png")}/>
      <View style={Vue.InputView}>
        <TextInput
        style={styles.InputText}
        onChangeText={text => setElement(text)}
        placeholder="Ajouter un élément"
        placeholderTextColor={"#006ee8"}
        multiline={false}
        value={element}
        keyboardType='default'
        />
        <Pressable
          style={{alignItems: "flex-end"}}
          onPress={() => saveList(element)}
          >
          <Ionicons name="ios-send" style={styles.icon} />
        </Pressable>
      </View>


      <View style={Vue.Listes}>
        <Text style={styles.Titre}>{nom}</Text>
        <FlatList
              data={list}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => {
                return (
                  <View style={Vue.listItem}>
                    {item.id != null && (
                      <Pressable
                        onPress={() => navigation.navigate("Details",{
                          nom: nom,
                          id: item.id,
                          title: item.element,
                          Temps: item.readyInMinutes,
                          list: true, })}
                          style={{width: "60%", flexDirection: "row"}}>
                          <Text style={styles.LesText}>{item.element}</Text>
                          <View style={{flexDirection: "column",justifyContent: "center", marginLeft: 15}}>
                            <Ionicons name="ios-restaurant" style={styles.icon} />
                          </View>
                      </Pressable>
                    )}
                    {item.id == null && (
                      <Pressable
                        onPress={() => console.log("pas une recette")}
                          style={{width: "55%", flexDirection: "row"}}>
                          <Text style={styles.LesText}>{item.element}</Text>
                      </Pressable>
                    )}


                      <Pressable
                      onPress={() => removeItemListe(item.element)}
                        style={{width: "43%", flexDirection: "row", alignItems:"flex-end", justifyContent: "flex-end", paddingRight: 10}}>
                        <Ionicons name="trash" style={styles.icon} />
                      </Pressable>
                  </View>
                );
              }}
            />
      </View>
    </View>
  );
};
export default Liste;
