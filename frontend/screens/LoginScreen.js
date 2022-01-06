import AsyncStorage from '@react-native-async-storage/async-storage'

import { useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'
import {
    Card,
    Input,
    Icon,
    Button
} from 'react-native-elements'
import { useToast } from 'react-native-toast-notifications'

import Layout from './Layout'

import { signIn } from '../services/auth'

const LoginScreen = ({ navigation }) => {
    const toast = useToast()

    const [user, setUser] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const token = await signIn(user)
            await AsyncStorage.setItem('token', JSON.stringify(token))
            navigation.navigate('Home')
        } catch (error) {
            toast.show(error.response.data.message, {
                type: 'danger',
                duration: 5000,
                placement: 'bottom',
                animationType: 'zoom-in'
            })
        }
        setUser({ email: '', password: '' })
        setLoading(false)
    }

    return (
        <Layout>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>
                    INGRESAR
                </Card.Title>
                <Card.Divider/>
                <Input
                    placeholder='Correo electrónico'
                    inputStyle={styles.input}
                    leftIcon={
                        <Icon
                            type='font-awesome'
                            name='envelope'
                            size={19}
                        />
                    }
                    value={user.email}
                    onChangeText={(text) => setUser({...user, email: text})}
                />
                <Input
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    inputStyle={styles.input}
                    leftIcon={
                        <Icon
                            type='font-awesome'
                            name='lock'
                            size={28}
                        />
                    }
                    value={user.password}
                    onChangeText={(text) => setUser({...user, password: text})}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.paragraph}>
                        ¿No tienes una cuenta registrada?
                    </Text>
                </TouchableOpacity>
                <Button
                    title={'INICIAR SESIÓN'}
                    loading={loading}
                    disabled={user.email === '' && user.password === '' ? true : false}
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={{
                        borderWidth: 0,
                        borderRadius: 5,
                        borderColor: 'transparent',
                        backgroundColor: '#4D7EA8'
                    }}
                    onPress={handleSubmit}
                />
            </Card>
        </Layout>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '90%',
        padding: 25
    },
    cardTitle: {
        fontSize: 25,
        fontWeight: '900',
        color: '#4D7EA8'
    },
    input: {
        marginLeft: 5,
        alignItems: 'center'
    },
    paragraph: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 25,
        color: '#4D7EA8',
        fontSize: 15,
        textDecorationLine: 'underline'
    }
})

export default LoginScreen