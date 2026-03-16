import { createApp } from 'vue'
import App from './App.vue'
import { registerDirectives } from './directives'

import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'glightbox/dist/css/glightbox.min.css'
import './styles/main.css'
import './styles/layout-refresh.css'
import './styles/theme-neobrutal.css'
import './styles/portfolio-cards.css'

const app = createApp(App)
registerDirectives(app)
app.mount('#app')
