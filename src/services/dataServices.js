import axios from "axios"
// const qs = require('qs');

export default {
    async getEvents() {
      let res = await axios.get("http://localhost:8080/api/dev/getAllDevice",{headers: {'Access-Control-Allow-Origin': '*'}});
      console.log("export default", res.data);
      return res.data;
    },
    // async getAllDevice53() {
    //   let res = await axios.get("http://localhost:8080/api/dev/getAllDevice53",{headers: {'Access-Control-Allow-Origin': '*'}});
    //   console.log("export default", res.data);
    //   return res.data;
    // },
    async getEventSingle(eventId) {
      let res = await axios.get("http://localhost:8080/data/" + eventId,{headers: {'Access-Control-Allow-Origin': '*'}});
      return res.data;
    },
    async getCC(){
      let res = axios.get("http://localhost:8080/cc/getAllCC");
      console.log("cc ", res.data );
      return res.data
    },


//    async getSearch(jdata){
//      var obj = JSON.parse(jdata);
//
//      let objText = obj[1]['text'];
//      console.log("dataService ", objText, ":", obj[0]['branch']);
//
//      let res = await axios.get('http://localhost:8080/api/dev/getAllByPattern',
//      {
//        params: {
//          page: 1,
//          size: 10,
//          legion: 'E3010'
//        }
//        // paramsSerializer: function(params) {
//        //   return qs.stringify(params)
//        // }
//
//      }).catch(function (error) {
//        console.log(error.response.status);
//      });
//      return res.data;
//
//    }

  }