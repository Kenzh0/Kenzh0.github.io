// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface, Module } from 'react-360-web'

let r360
let welcomePanelTag

function init(bundle, parent, options = {}) {
	r360 = new ReactInstance(bundle, parent, {
		// Add custom options here
		fullScreen: true,
		nativeModules: [new appModule()],
		...options,
	})

	const welcomePanel = new Surface(500, 700, Surface.SurfaceShape.Flat)
	welcomePanel.setAngle(-0.25, 0)
	welcomePanelTag = r360.renderToSurface(
		r360.createRoot('welcomePanel', {}),
		welcomePanel
	)

	// Load the initial environment
	r360.compositor.setBackground(r360.getAssetURL('museum.jpg'))
}

class appModule extends Module {
	infoFirst
	infoSecond
	constructor() {
		super('appModule')
	}

	start() {
		this.infoFirst = new Surface(150, 150, Surface.SurfaceShape.Flat)
		this.infoFirst.setAngle(1.5, 0)
		r360.renderToSurface(
			r360.createRoot('infoPanel', {
				id: 'infoFirst',
				text: 'Мавзолей Гур-Эмир, Самарканд',
			}),
			this.infoFirst
		)

		this.infoSecond = new Surface(150, 150, Surface.SurfaceShape.Flat)
		this.infoSecond.setAngle(0.2, 0)
		r360.renderToSurface(
			r360.createRoot('infoPanel', {
				id: 'infoSecond',
			}),
			this.infoSecond
		)

		r360.detachRoot(welcomePanelTag)
	}

	resizePanel(width, height, id) {
		switch (id) {
			case 'infoFirst':
				this.infoFirst.resize(width, height)
				break
			case 'infoSecond':
				this.infoSecond.resize(width, height)
				break
			default:
				this.infoFirst.resize(width, height)
				this.infoSecond.resize(width, height)
				break
		}
	}
}

window.React360 = { init }
