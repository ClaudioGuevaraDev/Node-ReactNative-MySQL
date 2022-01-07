import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'

import { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
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
        </>
    )
}

export default Router