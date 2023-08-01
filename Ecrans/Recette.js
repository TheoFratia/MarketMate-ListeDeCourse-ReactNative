
import { Text,  View, Image, TextInput, Pressable, FlatList} from "react-native";
import React, { useState, useEffect } from 'react';


import styles from "../Styles/TextStyles";
import Vue from "../Styles/Vue";




const Recette = ( {navigation, route} ) => {
    const { nom } = route.params;
    const [allRecipe, setallRecipe] = useState('');

    const fetchRecipes = async () => {
      const id = Math.floor(Math.random() * 10000) + 1;
      const response = await fetch('https://api.spoonacular.com/recipes/random?number=100&apiKey=9986d5f487d844aaa5d71c4a230ec6a7');
      const data = await response.json();
      setallRecipe(data.recipes);
    };


    
    
 
    useEffect(() => {
        fetchRecipes();
    }, []);

  return (
    <View style={Vue.container}>
      <Image
            style={{ height: "35%", width: "80%", resizeMode: "stretch", marginTop: -30}}
            source={require("../assets/Images/logoOnApp.png")}/>

      <View style={Vue.Listes}>
        <Text style={styles.Titre}>Recettes</Text>
        <FlatList
              data={allRecipe}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => {
                return (
                  <View style={Vue.listItem}>
                    <Pressable
                      onPress={() => navigation.navigate("Details",{
                        nom: nom,
                        id: item.id,
                        title: item.title,
                        Temps: item.readyInMinutes,
                        list: false,
                        })}
                        style={{width: "100%"}}>
                        <View style={{flexDirection: "row"}}>
                          <View style={{flex: 1.5, flexDirection: "row"}}>
                            {item.image == null ? (
                              <Image style={{width: "100%", height: "100%"}} source={require("../assets/Images/logoOnApp.png")} />
                            ): ( 
                              <Image style={{width: "100%", height: "100%"}} source={{uri: item.image}} />
                            )}     
                          </View>
                          <View style={{flexDirection: "column", marginLeft: 10, flex: 2, marginRight: 10}}>
                            <Text style={styles.LesText}>{item.title}</Text>
                            <Text style={styles.Temps}>Prêt en {item.readyInMinutes} minutes</Text>
                          </View>
                        </View>
                    </Pressable>
                  </View>
                );
              }}
            />
      </View>
    </View>
  );
};

export default Recette;
