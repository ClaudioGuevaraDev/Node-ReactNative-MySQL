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

import { signUp } from '../services/auth'

const RegisterScreen = ({ navigation }) => {
    const toast = useToast()

    const [user, setUser] = useState({ username: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await signUp(user)
            toast.show('Cuenta creada con éxito.', {
                type: 'success',
                duration: 5000,
                placement: 'bottom',
                animationType: 'zoom-in'
            })
            setUser({ username: '', email: '', password: '' })
            setLoading(false)
            navigation.navigate('Login')
        } catch (error) {
            toast.show(error.response.data.message, {
                type: 'danger',
                duration: 5000,
                placement: 'bottom',
                animationType: 'zoom-in'
            })
            setUser({ username: '', email: '', password: '' })
            setLoading(false)
        }
    }

    return (
        <Layout>
            <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>
                    CREARSE UNA CUENTA
                </Card.Title>
                <Card.Divider/>
                <Input
                    placeholder='Username'
                    inputStyle={styles.input}
                    leftIcon={
                        <Icon
                            type='font-awesome'
                            name='user'
                            size={19}
                        />
                    }
                    value={user.username}
                    onChangeText={(text) => setUser({...user, username: text})}
                />
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
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.paragraph}>
                        ¿Ya tienes una cuenta registrada?
                    </Text>
                </TouchableOpacity>
                <Button
                    title={'REGISTRARSE'}
                    titleStyle={{ fontWeight: '700' }}
                    disabled={user.username === '' && user.email === '' && user.password === '' ? true : false}
                    buttonStyle={{
                        borderWidth: 0,
                        borderRadius: 5,
                        borderColor: 'transparent',
                        backgroundColor: '#4D7EA8'
                    }}
                    onPress={handleSubmit}
                    loading={loading}
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
        fontSize: 20,
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


export default RegisterScreen