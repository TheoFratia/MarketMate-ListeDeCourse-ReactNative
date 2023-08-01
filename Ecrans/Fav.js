
import { Text,  View, Image, TextInput, Pressable, FlatList} from "react-native";
import { AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';


import styles from "../Styles/TextStyles";
import Vue from "../Styles/Vue";
import Ionicons from '@expo/vector-icons/Ionicons';




const Fav = ( {navigation, route} ) => {
  const { nom } = route.params;
  const [listName, setListName] = useState('');
  const [allList, setAllList] = useState([]);


  const removeItem = async (item) => {
    try {
      //supprimer l'enregistrement de la liste
      await AsyncStorage.removeItem('recette:' + item.element);
      console.log(`Liste 'recette:${item.element}' a été supprimée.`);

      //supprimer de la liste local
      const newList = allList.filter(i => i !== item.item);
      setAllList(newList);
    } catch (error) {
      console.log(`Erreur lors de la suppression de la liste ${listName}: ${error}`);
    }
  }

  const getAllLists = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter(key => key.startsWith('recette:'));
      const results = await AsyncStorage.multiGet(filteredKeys);
      const allListsreturn = results.map(([key, value]) => {
        const parsedValue = JSON.parse(value); // Si la valeur est une chaîne JSON, vous pouvez la désérialiser ici
        return parsedValue;
      });
      setAllList(allListsreturn);
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
            style={{ height: "35%", width: "80%", resizeMode: "stretch", marginTop: -30}}
            source={require("../assets/Images/logoOnApp.png")}/>
      <View style={Vue.Listes}>
        <Text style={styles.Titre}>Vos Recettes Favoris</Text>
        <FlatList
              data={allList}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => {
                return (
                  <View style={Vue.listItemFav}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                      {item.image == null ? (
                              <Image style={{width: "100%", height: "100%"}} source={require("../assets/Images/logoOnApp.png")} />
                            ): ( 
                              <Image style={{width: "100%", height: "100%"}} source={{uri: item.image}} />
                            )}
                    </View>
                      <Pressable
                        onPress={() => 
                          navigation.navigate("Details",{
                          nom: nom,
                          id: item.id,
                          title: item.element,
                          Temps: item.readyInMinutes,
                          list: false, })}
                          style={{flex:2, flexDirection: "row", marginLeft: 10}}>
                          <Text style={styles.LesText}>{item.element}</Text>
                      </Pressable>
                      <View style={{flex: 1, flexDirection: "row"}}>
                        <Pressable
                          onPress={() => removeItem(item)}
                          style={{alignItems:"flex-end", width: "100%"}}>
                          <Ionicons name="trash" style={styles.icon} />
                        </Pressable>
                      </View>
                  </View>
                );
              }}
            />
      </View>
    </View>
  );
};

export default Fav;
