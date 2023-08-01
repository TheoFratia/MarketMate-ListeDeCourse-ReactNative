
import { Text,  View, Image, Pressable, FlatList, ToastAndroid} from "react-native";
import { AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';


import styles from "../Styles/TextStyles";
import Vue from "../Styles/Vue";
import Ionicons from '@expo/vector-icons/Ionicons';
import Recette from "./Recette";
import { set } from "date-fns";




const Details = ( {navigation, route} ) => {
    const { nom } = route.params;
    const { title } = route.params;
    const { id } = route.params;
    const { Temps } = route.params;
    const { list } = route.params;


    const [Recipe, setRecipe] = useState('');
    const [Ingredients, setIngredients] = useState([]);
    const [IngredientsCheck, setIngredientsCheck] = useState([]);
    const [Step, setStep] = useState([]);
    const [CheckFav, setCheckFav] = useState(false);
    const [AllFav, setAllFav] = useState([]);
    const [prevKey, setprevKey] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);


    const refreshFlatList = () => {
      setprevKey(refreshKey);
      setRefreshKey(prevKey => prevKey + 1);
    };


    const saveListIngredientCheck = async (ingredient) => {
      try {
        if(IngredientsCheck.includes(ingredient)){
          setIngredientsCheck(IngredientsCheck.filter(i => i !== ingredient));
        }else{
          IngredientsCheck.push(ingredient);
        }
        await AsyncStorage.setItem('ingredient:' + title, JSON.stringify(IngredientsCheck));
        refreshFlatList();
      } catch (error) {
          console.log(error);
      }
    };

    const AjouterFav = async () => {
      try {
        if(CheckFav){
          try {
            //supprimer l'enregistrement de la liste
            await AsyncStorage.removeItem('recette:' + title);
            console.log(`Liste 'recette:${title}' a été supprimée.`);
            ToastAndroid.show('La recette a '+ title +'bien été supprimé des favoris', ToastAndroid.SHORT);
          } catch (error) {
            console.log(`Erreur lors de la suppression de la liste ${listName}: ${error}`);
          }
          setCheckFav(false);
        }else{
          let list ={
            id: id,
            image: Recipe.image,
            element: title,
            readyInMinutes: Temps,
          };
          await AsyncStorage.setItem('recette:' + title, JSON.stringify(list));
          ToastAndroid.show('La recette '+ title +' a bien été ajouté aux favoris', ToastAndroid.SHORT);
          setCheckFav(true);
        }
      } catch (error) {
          console.log(error);
      }
    };

    const Ajouter = async () => {
      try {
        let list = await AsyncStorage.getItem(nom);
        list = JSON.parse(list);
        list.push({
          id: id,
          element: title,
          readyInMinutes: Temps,
        });
        await AsyncStorage.setItem(nom, JSON.stringify(list));
        navigation.navigate("Liste",{
          nom: nom,});
      } catch (error) {
          console.log(error);
      }
    };


    const getIngredientsCheck = async () => {
      try {
        const list = await AsyncStorage.getItem('ingredient:' + title);
        if(list !== null){
          setIngredientsCheck(JSON.parse(list));
        }
      } catch (error) {
          console.log(error);
      }
    };


    const getCheckFav = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const filteredKeys = keys.filter(key => key.startsWith('recette:'));
        setAllFav(filteredKeys);
        if (AllFav.some(key => key === `recette:${title}`)) {
          setCheckFav(true);
        } else {
          setCheckFav(false);
        }
      } catch (error) {
          console.log(error);
      }
    };

    const fetchRecipes = async () => {
      const response = await fetch('https://api.spoonacular.com/recipes/'+ id +'/information?apiKey=9986d5f487d844aaa5d71c4a230ec6a7');
      const data = await response.json();
      setRecipe(data);
    }; 
    
    const fetchIngredients= async () => {
      const response = await fetch('https://api.spoonacular.com/recipes/'+ id +'/ingredientWidget.json?apiKey=9986d5f487d844aaa5d71c4a230ec6a7');
      const data = await response.json();
      const ingredients = data.ingredients;
      let result = [];
      ingredients.forEach(ingredient => {
        result.push(ingredient);
      });
      setIngredients(result);
    };

    const fetchStep= async () => {
      try{
        const response = await fetch('https://api.spoonacular.com/recipes/'+ id +'/analyzedInstructions?apiKey=9986d5f487d844aaa5d71c4a230ec6a7');
        const data = await response.json();
        let prepa = [];
        for (let i = 0; i < data[0].steps.length; i++) {
          prepa.push({
            number: data[0].steps[i].number,
            step: data[0].steps[i].step,
          })
        }
        setStep(prepa);
      } catch (error) {
        console.log(error);
      }
    };  
 
    useEffect(() => {
      getCheckFav();
      getIngredientsCheck();
      fetchIngredients();
      fetchRecipes();
      fetchStep();
    }, [Step == [] || Ingredients == [] || Recipe == []]);

    
  return (
    <View style={Vue.container}>
      <View style={{width: "100%", justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 20,marginTop: 5, flexDirection: "row"}}>
          <Pressable
            style={{borderRadius: 40, backgroundColor:'#ffffff', width: 52, height: 52, marginBottom: 5,justifyContent: "center", alignItems: "center", alignSelf: "flex-end"}}
            onPress={() => AjouterFav()}>
              {CheckFav == false ? (
                <Ionicons name="heart" style={styles.iconHeart} />
              ) : (
                <Ionicons name="heart" style={styles.iconHeartRed} />
              )}
          </Pressable>
      </View>
      <View style={Vue.DetailsCaseNom}>
          <Image
            style={{ height: "100%", width: "45%", resizeMode: "stretch"}}
            source={{uri: Recipe.image}}/>
        <View style={{flexDirection: "column", width: "100%", height: "100%"}}>
            <Text style={styles.NomRecette}>{title}</Text>
            <Text style={styles.TempsDetails}>{Temps} min</Text>
        </View>
      </View>
      <View style={Vue.DetailsCase}>
        <Text style={styles.Titre}>Ingrédients</Text>
          <FlatList
                key={refreshKey}
                data={Ingredients}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={true}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <View style={Vue.listItemhorizontal}>
                      {IngredientsCheck && IngredientsCheck.includes(item.name) ? (
                        <Pressable onPress={() => saveListIngredientCheck(item.name)}>
                          <Text style={styles.Ingredients}>{item.name}</Text>
                          <View style={{flexDirection: "row", marginTop: 5, justifyContent: "center", alignItems: "center"}}>
                            <Text style={styles.LesText}>{item.amount.metric.value}</Text>
                            <Text style={styles.LesText}> {item.amount.metric.unit}</Text>
                          </View>
                        </Pressable>
                      ) : (
                        <Pressable onPress={() => saveListIngredientCheck(item.name)}>
                          <Text style={styles.LesText}>{item.name}</Text>
                          <View style={{flexDirection: "row", marginTop: 5, justifyContent: "center", alignItems: "center"}}>
                            <Text style={styles.LesText}>{item.amount.metric.value}</Text>
                            <Text style={styles.LesText}> {item.amount.metric.unit}</Text>
                          </View>
                        </Pressable>
                      )}
                    </View>
                  );
                }}
            />
      </View>
      <View style={Vue.DetailsCase}>
        <Text style={styles.Titre}>Préparation</Text>
        {Step != [] && (
          
          <FlatList
                  data={Step}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={true}
                  renderItem={({ item }) => {
                    return (
                      <View style={Vue.listItem}>
                        <View style={{flexDirection: "row"}}>
                          <Text style={styles.numberStep}>{item.number}</Text>
                          <Text style={styles.LesText}>{item.step}</Text>
                        </View>
                      </View>
                    );
                  }}
              />
        )}
        {Step == [] && (
          <Text style={styles.LesText}>Il n'y aucune étape de préparation pour cette recette</Text>
        )}
        
      </View>
      {list == false && (
        <View style={{width: "100%", justifyContent: "center", alignItems: "flex-end", paddingRight: 20}}>
          <Pressable
            style={{borderRadius: 40, backgroundColor:'#ffffff', width: 40, height: 40, marginTop: -10, marginBottom: 5,}}
            onPress={() => Ajouter()}>
              <Text style={{fontSize: 40, color: "#006ee8", fontWeight: "bold", textAlign: "center", marginTop: -10}}>+</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Details;
