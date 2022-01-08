import { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import AppContext from '../context/AppContext'

import Layout from './Layout'
import TaskList from '../components/TaskList'

const HomeScreen = () => {
    const navigation = useNavigation()

    const { state } = useContext(AppContext)

    const { username } = state

    return (
        <Layout>
            <View style={styles.firstSection}>
                <Text style={styles.welcomeText}>Bienvenido: <Text style={styles.usernameText}>{username}</Text> </Text>
                <Button
                    containerStyle={{
                        
                    }}
                    icon={{
                        type: 'font-awesome',
                        name: 'plus',
                        color: 'white'
                    }}
                    onPress={() => navigation.navigate('TaskForm')}
                />
            </View>
            <TaskList/>
        </Layout>
    )
}

const styles = StyleSheet.create({
    firstSection: {
        width: "90%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '800'
    },
    usernameText: {
        fontWeight: '600'
    },
    addTaskButton: {
        width: 70,
        padding: 3
    }
})

export default HomeScreen