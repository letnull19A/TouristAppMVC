import 'primeicons/primeicons.css'
import { PrimeReactProvider } from 'primereact/api'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterApp } from './routes'
import '/node_modules/primeflex/primeflex.css'
import './theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<PrimeReactProvider>
			<RouterApp />
		</PrimeReactProvider>
	</React.StrictMode>
)
