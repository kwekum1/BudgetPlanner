import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { domain, clientId } from "../auth_config.json";
 import { Auth0Plugin } from "./auth";


library.add(faUserSecret);


// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});


Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.filter("toCurrency", function(value: number) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});

Vue.mixin({
  methods: {
    VerifyFloat(CaptureNumber: string) {
      var amount;
      if (Number.isNaN(Number.parseFloat(CaptureNumber))) amount = 0;
      else amount = Number.parseFloat(CaptureNumber);
      return amount;
    }
  }
});


new Vue({
  router,
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
  },
  created() {
    this.$store.watch(
      (state, getters) => getters.AllExpenses,
      (newValue, oldValue) => {  
        localStorage.setItem('BudgetStoreStateInformation', JSON.stringify(store.state));
      },
    );
    
    this.$store.watch(
      (state, getters) => state.incomeInput,
      (newValue, oldValue) => {  
        localStorage.setItem('BudgetStoreStateInformation', JSON.stringify(store.state));
      },
    );
    
    this.$store.subscribe((mutation, state) => {
      // Store the state object as a JSON string
     // alert('mutation occured; Setting the state');
        // Store the state object as a JSON string
      localStorage.setItem('BudgetStoreStateInformation', JSON.stringify(state));
    });
    

  },
  render: h => h(App)
}).$mount("#app");

