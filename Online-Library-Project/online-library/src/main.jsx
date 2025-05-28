import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faBookOpen, 
  faSearch, 
  faHome, 
  faBook, 
  faPlus,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'
import { 
  faFacebook, 
  faTwitter, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faBookOpen, 
  faSearch, 
  faHome, 
  faBook, 
  faPlus,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faFacebook,
  faTwitter,
  faInstagram
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)