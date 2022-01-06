import { 
    View, 
    StyleSheet 
} from 'react-native'

const Layout = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#272932',
        flex: 1,
        padding: 20,
        alignItems: 'center'
    }
})

export default Layout