import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as Notifications from 'expo-notifications';


import TextStyles from '../Styles/TextStyles';
import Vue from '../Styles/Vue';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const Rappel = ({navigation, route}) => {
  const { nom } = route.params;
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function Notification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Vous avez un rappel pour la liste " + nom,
        body: description,
      },
      trigger: { date: new Date(selectedDate) },
    });
    navigation.navigate("Liste",{
      nom: nom,
    });
  }


  const onDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  return (
    <View style={Vue.container}>
      <Image
            style={{ height: "28%", width: "80%", resizeMode: "stretch", marginTop: -30}}
            source={require("../assets/Images/logoOnApp.png")}/>
      <View style={Vue.DetailsCaseDesc}>
        <TextInput value={description} placeholder="Description (optionnel)" placeholderTextColor={"#006ee8"} onChangeText={setDescription} />
      </View>
      <View style={Vue.DetailsCaseNom}>
        <Calendar
          style={{backgroundColor: '#ffff', width: "128%",}}
          onDayPress={onDateSelect}
          minDate={currentDateString}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' }
          }}
        />
      </View>
      <View style={TextStyles.DetailsCaseNom}>
        <TouchableOpacity
          style={{backgroundColor: '#ffffff', borderRadius: 5, width: 100, height: 40, marginBottom: 10, alignItems: 'center', justifyContent: 'center'}} 
          onPress={() => Notification()}>
          <Text style={TextStyles.Button}>Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Rappel;
