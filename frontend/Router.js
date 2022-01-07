import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'

import { useContext, useEffect, useState } from 'react'
import { View, Modal, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ToastProvider } from 'react-native-toast-notifications'

import AppContext from './context/AppContext'

// Screens
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import TaskFormScreen from './screens/TaskFormScreen'

import {
    LOGGED_USER
} from './context/AppConstants'

const Stack = createNativeStackNavigator()

const Router = () => {
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const { state, dispatch } =  useContext(AppContext)

    const { logged } = state
    
    const validateSession = async () => {
        setLoading(true)
        const token = await AsyncStorage.getItem('token')

        if (token) {
            const { username } = jwt_decode(token)

            dispatch({
                type: LOGGED_USER,
                payload: {
                    logged: true,
                    token: token,
                    username: username
                }
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        validateSession()
    }, [])

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        dispatch({
            type: LOGGED_USER,
            payload: {
                logged: false,
                token: '',
                username: ''
            }
        })
        setModalVisible(false)
    }

    return (
        <>
        <ToastProvider>
            {loading ? (
                <View></View>
            ) : (
                <NavigationContainer>
                    <Stack.Navigator>
                    {logged ? (
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={({navigation}) => ({
                                headerTitle: 'HOME',
                                headerTintColor: '#4D7EA8',
                                headerRight: () => (
                                    <Button
                                        icon={{
                                            type: 'font-awesome',
                                            name: 'sign-out',
                                            size: 16,
                                        }}
                                        buttonStyle={{
                                            backgroundColor: 'rgba(214, 61, 57, 1)',
                                            paddingHorizontal: 15
                                        }}
                                        onPress={() => setModalVisible(true)}
                                    />
                                )
                            })}
                        />
                    ) : (
                        <Stack.Screen 
                            name="Login" 
                            component={LoginScreen}
                            options={{
                                headerTitle: 'INICIO DE SESIÓN',
                                headerTintColor: '#4D7EA8'
                            }}
                        />
                    )}
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{
                            headerTintColor: '#4D7EA8',
                            headerTitle: 'REGISTRO'
                        }}
                    />
                    <Stack.Screen
                        name="TaskForm"
                        component={TaskFormScreen}
                    />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </ToastProvider>
        <Modal 
            visible={modalVisible}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.text}>¿Estas seguro de cerrar sesión?</Text>
                    <View style={styles.buttons}>
                        <Button
                            title={'Aceptar'}
                            style={styles.button}
                            buttonStyle={{
                                backgroundColor: '#4D7EA8',
                                paddingHorizontal: 15
                            }}
                            onPress={logout}
                        />
                        <Button
                            title={'Cancelar'}
                            style={styles.button}
                            buttonStyle={{
                                backgroundColor: 'rgba(214, 61, 57, 1)',
                                paddingHorizontal: 15
                            }}
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </View>
        </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    text: {
        fontSize: 17,
        fontWeight: '500'
    },
    buttons: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 15
    },
    button: {
        marginHorizontal: 5,
        padding: 5,
        height: 50
    }
})

export default Router