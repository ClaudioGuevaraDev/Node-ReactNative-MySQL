import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useContext, useEffect } from 'react'
import { View } from 'react-native'
import { Card, Input, CheckBox, Button } from 'react-native-elements'
import { useToast } from 'react-native-toast-notifications'
import { useRoute, useNavigation } from '@react-navigation/native'

import AppContext from '../context/AppContext'

import Layout from './Layout'

import {
    createTask,
    getOneTask,
    updateTask
} from '../services/tasks'

const TaskFormScreen = () => {
    const toast = useToast()
    const route = useRoute()
    const navigation = useNavigation()

    const [task, setTask] = useState({ name: '', completed: false })
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)

    const { state } = useContext(AppContext)

    const { userId, token } = state

    const getTask = async () => {
        const token = await AsyncStorage.getItem('token')

        try {
            const res = await getOneTask(route.params.id, token)
            setTask(res)
        } catch (error) {
            toast.show('Tarea no encontrada.', {
                type: 'danger',
                duration: 5000,
                placement: 'bottom',
                animationType: 'zoom-in'
            })
        }
    }

    useEffect(() => {
        if (route.params) {
            navigation.setOptions({ headerTitle: 'Actualizar una Tarea' })
            setEditing(true)
            getTask()
        } else {
            navigation.setOptions({ headerTitle: 'Crear una Tarea' })
            setEditing(false)
        }
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        let data
        if (editing) {
            data = {
                name: task.name,
                completed: task.completed
            }
        } else {
            data = {
                name: task.name,
                completed: task.completed,
                userId: userId
            }
        }
        try {
            if (editing) {
                await updateTask(data, route.params.id, token)
                toast.show('Tarea actualizada con éxito.', {
                    type: 'success',
                    duration: 5000,
                    placement: 'bottom',
                    animationType: 'zoom-in'
                })
            } else {
                await createTask(data, token)
                toast.show('Tarea creada con éxito.', {
                    type: 'success',
                    duration: 5000,
                    placement: 'bottom',
                    animationType: 'zoom-in'
                })
            }
        } catch (error) {
            toast.show(error.response.data.message, {
                type: 'danger',
                duration: 5000,
                placement: 'bottom',
                animationType: 'zoom-in'
            })
        }
        reset()
        setLoading(false)
    }

    const reset = () => {
        setTask({ name: '', completed: false })
    }

    return (
        <Layout>
            <Card containerStyle={{ width: '90%' }}>
                <Card.Title style={{ fontSize: 25, color: '#4D7EA8', fontWeight: '900' }}>
                    {editing ? 'Editar una Tarea' : 'Crear una Tarea'}
                </Card.Title>
                <Card.Divider/>
                <View>
                    <Input
                        placeholder="Nombre"
                        value={task.name}
                        onChangeText={(text) => setTask({...task, name: text})}
                    />
                    <CheckBox
                        title='Completado'
                        checked={task.completed}
                        onPress={() => setTask({...task, completed: !task.completed})}
                    />
                    <View style={{ flexDirection: 'row', marginLeft: 9, marginTop: 15 }}>
                        <Button
                            title={editing ? 'Editar' : 'Crear'}
                            containerStyle={{
                                width: 90,
                                marginRight: 2
                            }}
                            buttonStyle={{
                                backgroundColor: '#4D7EA8'
                            }}
                            disabled={task.name === '' ? true : false}
                            onPress={handleSubmit}
                            loading={loading}
                        />
                        <Button
                            title='Cancelar'
                            containerStyle={{
                                width: 90,
                                marginLeft: 2
                            }}
                            buttonStyle={{
                                backgroundColor: 'rgba(214, 61, 57, 1)'
                            }}
                            onPress={reset}
                        />
                    </View>
                </View>
            </Card>
        </Layout>
    )
}

export default TaskFormScreen