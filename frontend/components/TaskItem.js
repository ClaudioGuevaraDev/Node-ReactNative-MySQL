import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

const TaskItem = ({ task }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{task.name}</Text>
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