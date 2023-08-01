
import { Text,  View, Image, TextInput, Pressable, FlatList} from "react-native";
import { AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';


import styles from "../Styles/TextStyles";
import Vue from "../Styles/Vue";
import Ionicons from '@expo/vector-icons/Ionicons';




const Accueil = ( {navigation} ) => {
  const [listName, setListName] = useState('');
  const [allList, setAllList] = useState([]);

  

  const removeItem = async (item) => {
    try {
      //supprimer l'enregistrement de la liste
      await AsyncStorage.removeItem(item.item);
      console.log(`Liste ${item.item} a été supprimée.`);

      //supprimer de la liste local
      const newList = allList.filter(i => i !== item.item);
      setAllList(newList);
    } catch (error) {
      console.log(`Erreur lors de la suppression de la liste ${listName}: ${error}`);
    }
  }
  
  const saveList = async (listName) => {
    try {
        await AsyncStorage.setItem(listName, JSON.stringify([]));
        allList.push(listName);
        setListName('');
        navigation.navigate("Liste",{
          nom: listName,
        })
    } catch (error) {
        console.log(error);
    }
  };

  const getAllLists = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter(key => !key.startsWith('ingredient:')).filter(key => !key.startsWith('recette:'));
      setAllList(filteredKeys);
    } catch (error) {
        console.log(error);
    }
  };

  
  getAllLists();

  useEffect(() => {
    getAllLists();
  }, []);
 

  return (
    <View style={Vue.container}>
      <Image
            style={{ height: "35%", width: "80%", resizeMode: "stretch", marginTop: -30, marginLeft: -15 }}
            source={require("../assets/Images/logoOnApp.png")}/>
      <View style={Vue.InputView}>
        <TextInput
        style={styles.InputText}
        onChangeText={text => setListName(text)}
        placeholder="Nom de la liste"
        placeholderTextColor={"#006ee8"}
        value={listName}
        multiline={false}
        keyboardType='default'
        />
        <Pressable
          style={{alignItems: "flex-end"}}
          onPress={() => saveList(listName)}
          >
          <Ionicons name="ios-send" style={styles.icon} />
        </Pressable>
      </View>


      <View style={Vue.Listes}>
        <Text style={styles.Titre}>Vos Listes</Text>
        <FlatList
              data={allList.sort(function compare(a, b) {
                if (a.nom < b.nom)
                  return -1;
                if (a.nom > b.nom )
                  return 1;
                return 0;
              })}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => {
                return (
                  <View style={Vue.listItem}>
                    <Pressable
                      onPress={() => navigation.navigate("Liste",{
                        nom: item,})}
                        style={{width: "75%"}}>
                        <Text style={styles.LesText}>{item}</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => removeItem({item})}
                        style={{width: "25%", alignItems:"flex-end"}}>
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

export default Accueil;
