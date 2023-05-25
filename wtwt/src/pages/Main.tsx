import React from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import List from "./List";
import NewPost from "./NewPost";
import {LoggedInParamList, RootStackParamList} from "../../App";


export type MainStackParamList = {
    List: undefined;
    NewPost: undefined;
};

type MainScreenProps = NativeStackScreenProps<LoggedInParamList, 'Main'>;
const Stack = createNativeStackNavigator<MainStackParamList>();
function Main({navigation}: MainScreenProps){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="List"
                component={List}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="NewPost"
                component={NewPost}
                options={{headerShown: false}}
            />
        </Stack.Navigator>

)
}



export default Main;
