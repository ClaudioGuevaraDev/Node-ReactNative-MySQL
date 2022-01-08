import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { useToast } from 'react-native-toast-notifications'
import { useNavigation } from '@react-navigation/native'

import {
    updateTask,
    deleteTask
} from '../services/tasks'

const TaskItem = ({ task, refresh, setRefresh }) => {
    const toast = useToast()
    const navigation = useNavigation()

    const handleCompleted = async () => {
        const token = await AsyncStorage.getItem('token')

        const data = {
            name: task.name,
            completed: !task.completed
        }
        try {
            await updateTask(data, task.id, token)
            setRefresh(!refresh)
        } catch (error) {
            toast.show('Error al actualizar la tarea.', {
                type: 'danger',
                duration: 5000,
                placement: 'bottom',
                animationType: 'zoom-in'
            })
        }
    }

    const handleDelete = async () => {
        const token = await AsyncStorage.getItem('token')

        try {
            await deleteTask(task.id, token)
            setRefresh(!refresh)
            toast.show('Tarea eliminada con éxito.', {
                type: 'success',
                duration: 5000,
                placement: 'bottom',
                animationType: 'zoom-in'
            })
        } catch (error) {
            toast.show('Error al eliminar la tarea.', {
                type: 'danger',
                duration: 5000,
                placement: 'bottom',
                animationType: 'zoom-in'
            })
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('TaskForm', { id: task.id })}>
                <Text style={styles.text}>{task.name}</Text>
            </TouchableOpacity>
            <View>
                <Button
                    style={styles.button}
                    icon={{
                        type: 'font-awesome',
                        name: task.completed ? 'check' : 'times'
                    }}
                    buttonStyle={{
                        backgroundColor: task.completed ? 'rgba(127, 220, 103, 1)' : 'rgba(255, 193, 7, 1)',
                        padding: 4
                    }}
                    onPress={handleCompleted}
                />
                <Button
                    style={styles.button}
                    icon={{
                        type: 'font-awesome',
                        name: 'trash'
                    }}
                    buttonStyle={{
                        backgroundColor: 'rgba(214, 61, 57, 1)',
                        padding: 4
                    }}
                    onPress={handleDelete}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#4D7EA8',
        borderRadius: 7,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center'
    },  
    button: {
        marginVertical: 5
    }
})

export default TaskItem