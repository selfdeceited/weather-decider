import '../stylesheets/style.css'
import Vue from 'vue/dist/vue.common.js'
import VueResource from 'vue-resource';

Vue.use(VueResource);

const app = new Vue({
  el: '#app',
  data: {
    city: 'Moscow',
    forecast: {}
  }, 
  methods:{
    getResponse(){
      const yql = `
      select * from weather.forecast
      where woeid in 
      (select woeid 
       from geo.places(1)
       where text="${this.city}")
       and u='c'
      `.replace(/\s\s+/g, ' ')
      var query = `https://query.yahooapis.com/v1/public/yql
        ?q=super-query
        &format=json
        &diagnostics=true
        &env=store://datatables.org/alltableswithkeys
        &callback=`.replace(/\s\s+/g, '').replace('super-query', yql)
        
      this.$http.get(encodeURI(query)).then(function(res) { 
        const response = res.body.query;
        if(!response.results)
          this.forecast = response.diagnostics
        else
          this.forecast = res.body.query.results
      });
    }
  }
})