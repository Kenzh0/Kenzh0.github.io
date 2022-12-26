import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	asset,
	VrButton,
	NativeModules,
} from 'react-360'

const appModule = NativeModules.appModule

export default class WelcomePanel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			image: {
				src: '#',
			},
		}
	}

	render() {
		const { image } = this.state
		return (
			<View style={styles.panel}>
				<Image
					source={asset(image.src)}
					style={{ width: image.width, height: image.height }}
				/>
				<View style={styles.greetingBox}>
					<VrButton onClick={() => appModule.start()}>
						<Text style={styles.greeting}>
							Добро пожаловать в Tamellan Museum!
						</Text>
					</VrButton>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	panel: {
		// Fill the entire surface
		width: 400,
		height: 700,
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	greetingBox: {
		padding: 20,
		backgroundColor: '#000000',
		borderColor: '#639dda',
		borderWidth: 2,
	},
	greeting: {
		fontSize: 24,
	},
})
