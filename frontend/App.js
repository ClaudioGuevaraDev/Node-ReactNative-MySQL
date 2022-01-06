import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ToastProvider } from 'react-native-toast-notifications'

// Screens
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import TaskFormScreen from './screens/TaskFormScreen'

const Stack = createNativeStackNavigator()

const App = () => {
    
    return (
        <NavigationContainer>
            <ToastProvider>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Login" 
                        component={LoginScreen}
                        options={{
                            headerTitle: 'INICIO DE SESIÓN',
                            headerTintColor: '#4D7EA8'
                        }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{
                            headerTintColor: '#4D7EA8',
                            headerTitle: 'REGISTRO'
                        }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                    />
                    <Stack.Screen
                        name="TaskForm"
                        component={TaskFormScreen}
                    />
                </Stack.Navigator>
            </ToastProvider>
        </NavigationContainer>
    )
}

export default App