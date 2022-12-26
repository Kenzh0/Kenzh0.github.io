import React from 'react'
import { StyleSheet, Text, View, Image, asset, NativeModules } from 'react-360'

const appModule = NativeModules.appModule

export default class InfoPanel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			image: {
				src: 'information.png',
				width: 150,
				height: 150,
			},
		}
	}

	modifyPanel = id => {
		appModule.resizePanel(500, 700, id)
		this.setState({
			...this.state,
			image: {
				...this.state.image,
				src: `${id}.jpg`,
				width: 500,
				height: 500,
			},
		})
	}

	resetPanel = id => {
		appModule.resizePanel(100, 100, id)
		this.setState({
			...this.state,
			image: {
				...this.state.image,
				src: `${id}.png`,
				width: 100,
				height: 100,
			},
		})
	}

	render() {
		const { image } = this.state
		const { id, text } = this.props

		return (
			<View
				hitSlop={500}
				style={styles.panel}
				onEnter={() => this.modifyPanel(id)}
				onExit={() => this.resetPanel('information')}
			>
				<Image
					source={asset(image.src)}
					style={{ width: image.width, height: image.height }}
				/>
				<View style={styles.greetingBox}>
					<Text style={styles.greeting}>{text}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	panel: {
		// Fill the entire surface
		width: 100,
		height: 100,
		flexDirection: 'column',
	},
	greetingBox: {
		padding: 20,
		backgroundColor: 'white',
		borderColor: 'red',
		borderWidth: 2,
		width: 500,
	},
	greeting: {
		fontSize: 30,
		color: 'black',
	},
})
