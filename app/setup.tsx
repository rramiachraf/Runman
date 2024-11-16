import { View, StyleSheet, Pressable, Text, TextInput } from 'react-native'
import { Formik, FormikHelpers } from 'formik'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon } from '../components/Icon'
import palette from '../constants/palette'
import { SubsonicClient } from '../utils/subsonic'
import { useConfigStore } from '../hooks/useConfigStore'

export default function Setup() {
	const router = useRouter()
	const updateConfiguredStatus = useConfigStore(state => state.updateConfiguredStatus)
	const updateCredentials = useConfigStore(state => state.updateCredentials)

	const initialValues = {
		username: '',
		password: '',
		address: ''
	}

	const handleSubmit = async (values: typeof initialValues, helpers: FormikHelpers<typeof initialValues>) => {
		try {
			const client = new SubsonicClient(values.username, values.password, values.address)
			await client.ping()
			await SecureStore.setItemAsync('servers', JSON.stringify(values))
			await AsyncStorage.setItem('configured', '1')

			updateCredentials(values.username, values.password, values.address)
			updateConfiguredStatus(true)
			router.push('/')
		} catch (e) {
			alert(e.message)
		}
	}

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{({ values, handleSubmit, handleChange, handleBlur }) => (
				<View style={style.container}>
					<View style={style.form}>
						<TextInput
							style={style.input}
							placeholder="Username"
							value={values.username}
							autoCapitalize="none"
							onChangeText={handleChange('username')}
							onBlur={handleBlur('username')}
						/>
						<TextInput
							style={style.input}
							placeholder="Password"
							autoCapitalize="none"
							secureTextEntry={true}
							value={values.password}
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
						/>
						<TextInput
							style={style.input}
							placeholder="Address"
							autoCapitalize="none"
							value={values.address}
							onChangeText={handleChange('address')}
							onBlur={handleBlur('address')}
						/>
					</View>
					<Pressable style={style.button} onPress={() => handleSubmit()}>
						<Icon name="add" size={25} />
						<Text>Add Server</Text>
					</Pressable>
				</View>
			)}
		</Formik>
	)
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		gap: 20
	},
	button: {
		backgroundColor: palette.main,
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 10,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: '500',
		flexDirection: 'row',
		gap: 10,
		textTransform: 'uppercase'
	},
	input: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderRadius: 5,
		fontSize: 16
	},
	form: {
		width: '100%',
		gap: 10
	}
})
