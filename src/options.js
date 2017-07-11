import Vue from 'vue';
import iView from 'iview';
import Options from '@/view/Options';

// Plugin
Vue.use(iView);

// Stylesheet
import 'iview/dist/styles/iview.css';

new Vue({
	el: '#app',
	render: h => h(Options)
});
