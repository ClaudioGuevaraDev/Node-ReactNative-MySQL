import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useIsFocused } from '@react-navigation/native'

import AppContext from '../context/AppContext'

import TaskItem from './TaskItem'

import {
    getAllTasks
} from '../services/tasks'

const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [refresh, setRefresh] = useState(true)
    const { state } = useContext(AppContext)
    const toast = useToast()
    const isFocused = useIsFocused()

    const { userId } = state

    const getTasks = async () => {
        const token = await AsyncStorage.getItem('token')

        try {
            const data = await getAllTasks(userId, token)
            setTasks(data)
        } catch (error) {
            toast.show('Error al listar las tareas.', {
                type: 'danger',
                duration: 5000,
                placement: 'bottom',
                animationType: 'zoom-in'
            })
        }
        setLoading(false)
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getTasks()
        setRefreshing(false)
    }

    useEffect(() => {
        getTasks()
    }, [isFocused, refresh])

    const renderItem = ({ item }) => (
        <TaskItem task={item} refresh={refresh} setRefresh={setRefresh}/>
    )

    return (
        <>
        {loading ? (
            <View></View>
        ) : (
            <View style={{ marginTop: 20, width: '90%' }}>
                <FlatList
                    data={tasks}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        )}
        </>
    )
}

const styles = StyleSheet.create({

})

export default TaskList