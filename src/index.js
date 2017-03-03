import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { LocaleProvider } from 'antd'
import { locales } from 'antd/dist/antd-with-locales'
import 'antd/dist/antd.css'  

import App from './App';
import './index.css';

//import Layout from "./components/Layout"
import store from "./store"

const app = document.getElementById('root')

ReactDOM.render(
	<Provider store={store} >
		<LocaleProvider locale={locales.en_US}>
  		<App />
		</LocaleProvider>
	</Provider>, 
	app
);
