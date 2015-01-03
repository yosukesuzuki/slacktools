(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BuildForm, BuildFormList, BuildFormUpdate, SetPostData, appStoreOptions, appStores, iOSAppSchema, key, schemas, value;

document.addEventListener("DOMContentLoaded", function(event) {
  var pathName;
  console.log("DOM fully loaded and parsed");
  pathName = location.pathname.split("/")[2];
  switch (pathName) {
    case "form":
      BuildForm();
      window.onhashchange = BuildForm;
  }
});

BuildForm = function() {
  var crudMethod, hashArr, keyName, modelName, schema;
  hashArr = location.hash.split("/");
  modelName = hashArr[1];
  crudMethod = hashArr[2];
  keyName = hashArr[3];
  schema = schemas[modelName];
  switch (crudMethod) {
    case "update":
      return BuildFormUpdate(schema, keyName);
    case "list":
      return BuildFormList(schema);
  }
};

SetPostData = function(items) {
  var returnObject, v, _i, _len;
  returnObject = {};
  for (_i = 0, _len = items.length; _i < _len; _i++) {
    v = items[_i];
    returnObject[v.fieldName] = v.fieldValue;
  }
  return returnObject;
};

BuildFormUpdate = function(schema, keyName) {
  var formVue, request;
  formVue = new Vue({
    el: "#form-container",
    template: "#formTemplate",
    data: {
      formTitle: schema.formTitle,
      items: schema.schema
    },
    methods: {
      cancel: function(e) {
        return location.hash = "/" + schema.modelName + "/list";
      },
      submitUpdate: function(e) {
        var request;
        e.preventDefault();
        request = window.superagent;
        return request.post(schema.apiEndpoint).send(SetPostData(this.$data.items)).set("Accept", "application/json").end(function(error, res) {
          var items;
          if (error == null) {
            items = res.body;
            console.log(items);
            return location.hash = "/" + schema.modelName + "/list";
          }
        });
      }
    }
  });
  if (keyName) {
    request = window.superagent;
    return request.get(schema.apiEndpoint + "/" + keyName, function(res) {
      var data, v, _i, _len, _ref, _results;
      data = res.body;
      _ref = formVue.$data.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        _results.push(v.fieldValue = data[v.fieldName]);
      }
      return _results;
    });
  }
};

BuildFormList = function(schema) {
  var listVue, request;
  listVue = new Vue({
    el: "#form-container",
    template: "#listTemplate",
    data: {
      formTitle: schema.formTitle,
      formDescription: schema.formDescription,
      modelName: schema.modelName,
      items: []
    },
    methods: {
      deleteEntity: function(e) {
        var keyName, request;
        if (window.confirm('Delete this entity?')) {
          keyName = e.targetVM.$data.app_id;
          request = window.superagent;
          return request.del(schema.apiEndpoint + "/" + keyName, function(res) {
            var items;
            return items = res.body;
          });
        }
      }
    }
  });
  request = window.superagent;
  return request.get(schema.apiEndpoint, function(res) {
    var items;
    items = res.body;
    return listVue.$data.items = items.items;
  });
};

Vue.filter("dateFormat", function(value) {
  var localTime;
  value = value.replace(/T/, " ");
  localTime = moment.utc(value.slice(0, 16)).toDate();
  localTime = moment(localTime).format("YYYY-MM-DD HH:mm (Z)");
  return localTime;
});

Vue.filter("dateFormatUTC", function(value) {
  value = value.replace(/T/, " ");
  return value.slice(0, 16);
});

appStores = {
  Argentina: 143505,
  Australia: 143460,
  Belgium: 143446,
  Brazil: 143503,
  Canada: 143455,
  Chile: 143483,
  China: 143465,
  Colombia: 143501,
  "Costa Rica": 143495,
  Croatia: 143494,
  "Czech Republic": 143489,
  Denmark: 143458,
  Deutschland: 143443,
  "El Salvador": 143506,
  Espana: 143454,
  Finland: 143447,
  France: 143442,
  Greece: 143448,
  Guatemala: 143504,
  "Hong Kong": 143463,
  Hungary: 143482,
  India: 143467,
  Indonesia: 143476,
  Ireland: 143449,
  Israel: 143491,
  Italia: 143450,
  Korea: 143466,
  Kuwait: 143493,
  Lebanon: 143497,
  Luxembourg: 143451,
  Malaysia: 143473,
  Mexico: 143468,
  Nederland: 143452,
  "New Zealand": 143461,
  Norway: 143457,
  Osterreich: 143445,
  Pakistan: 143477,
  Panama: 143485,
  Peru: 143507,
  Phillipines: 143474,
  Poland: 143478,
  Portugal: 143453,
  Qatar: 143498,
  Romania: 143487,
  Russia: 143469,
  "Saudi Arabia": 143479,
  "Schweiz/Suisse": 143459,
  Singapore: 143464,
  Slovakia: 143496,
  Slovenia: 143499,
  "South Africa": 143472,
  "Sri Lanka": 143486,
  Sweden: 143456,
  Taiwan: 143470,
  Thailand: 143475,
  Turkey: 143480,
  "United Arab Emirates": 143481,
  "United Kingdom": 143444,
  "United States": 143441,
  Venezuela: 143502,
  Vietnam: 143471,
  Japan: 143462,
  "Dominican Republic": 143508,
  Ecuador: 143509,
  Egypt: 143516,
  Estonia: 143518,
  Honduras: 143510,
  Jamaica: 143511,
  Kazakhstan: 143517,
  Latvia: 143519,
  Lithuania: 143520,
  Macau: 143515,
  Malta: 143521,
  Moldova: 143523,
  Nicaragua: 143512,
  Paraguay: 143513,
  Uruguay: 143514
};

appStoreOptions = [];

for (key in appStores) {
  value = appStores[key];
  appStoreOptions.push({
    text: key,
    value: value
  });
}

iOSAppSchema = [
  {
    fieldTitle: "Application ID",
    fieldName: "app_id",
    fieldType: "inputtext",
    fieldValue: ""
  }, {
    fieldTitle: "Title",
    fieldName: "title",
    fieldType: "inputtext",
    fieldValue: ""
  }, {
    fieldTitle: "Webhook URL",
    fieldName: "webhook_url",
    fieldType: "inputtext",
    fieldValue: ""
  }, {
    fieldTitle: "Description",
    fieldName: "content",
    fieldType: "textarea",
    fieldValue: ""
  }, {
    fieldTitle: "Region",
    fieldName: "region",
    fieldType: "select",
    options: appStoreOptions,
    fieldValue: ""
  }
];

schemas = {
  iosapp: {
    schema: iOSAppSchema,
    modelName: "iosapp",
    apiEndpoint: "/admin/api/v1/iosapp",
    formTitle: "AppStore App settings",
    formDescription: "When a review is posted to AppStore, notification is send to your slack channel"
  }
};



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdXp1a2l5b3N1a2UvZGV2L3NsYWNrLXRvb2xzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9zdXp1a2l5b3N1a2UvZGV2L3NsYWNrLXRvb2xzL3NyYy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLHFIQUFBOztBQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsU0FBQyxLQUFELEdBQUE7QUFDNUMsTUFBQSxRQUFBO0FBQUEsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDZCQUFaLENBQUEsQ0FBQTtBQUFBLEVBQ0EsUUFBQSxHQUFXLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBbEIsQ0FBd0IsR0FBeEIsQ0FBNkIsQ0FBQSxDQUFBLENBRHhDLENBQUE7QUFFQSxVQUFPLFFBQVA7QUFBQSxTQUNPLE1BRFA7QUFFSSxNQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLFNBRHRCLENBRko7QUFBQSxHQUg0QztBQUFBLENBQTlDLENBQUEsQ0FBQTs7QUFBQSxTQVVBLEdBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSwrQ0FBQTtBQUFBLEVBQUEsT0FBQSxHQUFVLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBZCxDQUFvQixHQUFwQixDQUFWLENBQUE7QUFBQSxFQUNBLFNBQUEsR0FBWSxPQUFRLENBQUEsQ0FBQSxDQURwQixDQUFBO0FBQUEsRUFFQSxVQUFBLEdBQWEsT0FBUSxDQUFBLENBQUEsQ0FGckIsQ0FBQTtBQUFBLEVBR0EsT0FBQSxHQUFVLE9BQVEsQ0FBQSxDQUFBLENBSGxCLENBQUE7QUFBQSxFQUlBLE1BQUEsR0FBUyxPQUFRLENBQUEsU0FBQSxDQUpqQixDQUFBO0FBS0EsVUFBTyxVQUFQO0FB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RGQ7QUFBQSxJQUVFLFNBQUEsRUFBVSxRQUZaO0FBQUEsSUFHRSxTQUFBLEVBQVUsV0FIWjtBQUFBLElBSUUsVUFBQSxFQUFXLEVBSmI7R0FEYSxFQU9iO0FBQUEsSUFDRSxVQUFBLEVBQVksT0FEZDtBQUFBLElBRUUsU0FBQSxFQUFVLE9BRlo7QUFBQSxJQUdFLFNBQUEsRUFBVSxXQUhaO0FBQUEsSUFJRSxVQUFBLEVBQVcsRUFKYjtHQVBhLEVBYWI7QUFBQSxJQUNFLFVBQUEsRUFBWSxhQURkO0FBQUEsSUFFRSxTQUFBLEVBQVUsYUFGWjtBQUFBLElBR0UsU0FBQSxFQUFVLFdBSFo7QUFBQSxJQUlFLFVBQUEsRUFBVyxFQUpiO0dBYmEsRUFtQmI7QUFBQSxJQUNFLFVBQUEsRUFBWSxhQURkO0FBQUEsSUFFRSxTQUFBLEVBQVUsU0FGWjtBQUFBLElBR0UsU0FBQSxFQUFVLFVBSFo7QUFBQSxJQUlFLFVBQUEsRUFBVyxFQUpiO0dBbkJhLEVBeUJiO0FBQUEsSUFDRSxVQUFBLEVBQVcsUUFEYjtBQUFBLElBRUUsU0FBQSxFQUFVLFFBRlo7QUFBQSxJQUdFLFNBQUEsRUFBVSxRQUhaO0FBQUEsSUFJRSxPQUFBLEVBQVMsZUFKWDtBQUFBLElBS0UsVUFBQSxFQUFXLEVBTGI7R0F6QmE7Q0EzS2YsQ0FBQTs7QUFBQSxPQTZNQSxHQUNFO0FBQUEsRUFBQSxNQUFBLEVBQ0U7QUFBQSxJQUFBLE1BQUEsRUFBTyxZQUFQO0FBQUEsSUFDQSxTQUFBLEVBQVcsUUFEWDtBQUFBLElBRUEsV0FBQSxFQUFhLHNCQUZiO0FBQUEsSUFHQSxTQUFBLEVBQVUsdUJBSFY7QUFBQSxJQUlBLGVBQUEsRUFBZ0IsaUZBSmhCO0dBREY7Q0E5TUYsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIFwiRE9NQ29udGVudExvYWRlZFwiLCAoZXZlbnQpIC0+XG4gIGNvbnNvbGUubG9nIFwiRE9NIGZ1bGx5IGxvYWRlZCBhbmQgcGFyc2VkXCJcbiAgcGF0aE5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIilbMl1cbiAgc3dpdGNoIHBhdGhOYW1lXG4gICAgd2hlbiBcImZvcm1cIlxuICAgICAgQnVpbGRGb3JtKClcbiAgICAgIHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSBCdWlsZEZvcm1cbiAgcmV0dXJuXG5cblxuQnVpbGRGb3JtID0gLT5cbiAgaGFzaEFyciA9IGxvY2F0aW9uLmhhc2guc3BsaXQoXCIvXCIpXG4gIG1vZGVsTmFtZSA9IGhhc2hBcnJbMV1cbiAgY3J1ZE1ldGhvZCA9IGhhc2hBcnJbMl1cbiAga2V5TmFtZSA9IGhhc2hBcnJbM11cbiAgc2NoZW1hID0gc2NoZW1hc1ttb2RlbE5hbWVdXG4gIHN3aXRjaCBjcnVkTWV0aG9kXG4gICAgd2hlbiBcInVwZGF0ZVwiIHRoZW4gQnVpbGRGb3JtVXBkYXRlKHNjaGVtYSxrZXlOYW1lKVxuICAgIHdoZW4gXCJsaXN0XCIgdGhlbiBCdWlsZEZvcm1MaXN0KHNjaGVtYSlcblxuU2V0UG9zdERhdGEgPSAoaXRlbXMpIC0+XG4gIHJldHVybk9iamVjdCA9IHt9XG4gIGZvciB2IGluIGl0ZW1zXG4gICAgcmV0dXJuT2JqZWN0W3YuZmllbGROYW1lXSA9IHYuZmllbGRWYWx1ZVxuICByZXR1cm4gcmV0dXJuT2JqZWN0XG5cbkJ1aWxkRm9ybVVwZGF0ZSA9IChzY2hlbWEsa2V5TmFtZSkgLT5cbiAgZm9ybVZ1ZSA9IG5ldyBWdWUoXG4gICAgZWw6IFwiI2Zvcm0tY29udGFpbmVyXCJcbiAgICB0ZW1wbGF0ZTogXCIjZm9ybVRlbXBsYXRlXCJcbiAgICBkYXRhOlxuICAgICAgZm9ybVRpdGxlOiBzY2hlbWEuZm9ybVRpdGxlXG4gICAgICBpdGVtczogc2NoZW1hLnNjaGVtYVxuICAgIG1ldGhvZHM6XG4gICAgICBjYW5jZWw6IChlKSAtPlxuICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvXCIrc2NoZW1hLm1vZGVsTmFtZStcIi9saXN0XCJcbiAgICAgIHN1Ym1pdFVwZGF0ZTogKGUpIC0+XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICByZXF1ZXN0ID0gd2luZG93LnN1cGVyYWdlbnRcbiAgICAgICAgcmVxdWVzdC5wb3N0KHNjaGVtYS5hcGlFbmRwb2ludClcbiAgICAgICAgICAuc2VuZChTZXRQb3N0RGF0YShAJGRhdGEuaXRlbXMpKVxuICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgLmVuZCAoZXJyb3IsIHJlcykgLT5cbiAgICAgICAgICAgIHVubGVzcyBlcnJvcj9cbiAgICAgICAgICAgICAgaXRlbXMgPSByZXMuYm9keVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyBpdGVtc1xuICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvXCIrc2NoZW1hLm1vZGVsTmFtZStcIi9saXN0XCJcbiAgKVxuICBpZiBrZXlOYW1lXG4gICAgcmVxdWVzdCA9IHdpbmRvdy5zdXBlcmFnZW50XG4gICAgcmVxdWVzdC5nZXQgc2NoZW1hLmFwaUVuZHBvaW50K1wiL1wiK2tleU5hbWUsIChyZXMpIC0+XG4gICAgICBkYXRhID0gcmVzLmJvZHlcbiAgICAgIGZvciB2IGluIGZvcm1WdWUuJGRhdGEuaXRlbXNcbiAgICAgICAgdi5maWVsZFZhbHVlID0gZGF0YVt2LmZpZWxkTmFtZV1cblxuXG5CdWlsZEZvcm1MaXN0ID0gKHNjaGVtYSkgLT5cbiAgbGlzdFZ1ZSA9IG5ldyBWdWUoXG4gICAgZWw6IFwiI2Zvcm0tY29udGFpbmVyXCJcbiAgICB0ZW1wbGF0ZTogXCIjbGlzdFRlbXBsYXRlXCJcbiAgICBkYXRhOlxuICAgICAgZm9ybVRpdGxlOiBzY2hlbWEuZm9ybVRpdGxlXG4gICAgICBmb3JtRGVzY3JpcHRpb246IHNjaGVtYS5mb3JtRGVzY3JpcHRpb25cbiAgICAgIG1vZGVsTmFtZTogc2NoZW1hLm1vZGVsTmFtZVxuICAgICAgaXRlbXM6IFtdXG4gICAgbWV0aG9kczpcbiAgICAgIGRlbGV0ZUVudGl0eTogKGUpIC0+XG4gICAgICAgIGlmIHdpbmRvdy5jb25maXJtKCdEZWxldGUgdGhpcyBlbnRpdHk/JylcbiAgICAgICAgICBrZXlOYW1lID0gZS50YXJnZXRWTS4kZGF0YS5hcHBfaWRcbiAgICAgICAgICByZXF1ZXN0ID0gd2luZG93LnN1cGVyYWdlbnRcbiAgICAgICAgICByZXF1ZXN0LmRlbCBzY2hlbWEuYXBpRW5kcG9pbnQrXCIvXCIra2V5TmFtZSwgKHJlcykgLT5cbiAgICAgICAgICAgIGl0ZW1zID0gcmVzLmJvZHlcbiAgKVxuICByZXF1ZXN0ID0gd2luZG93LnN1cGVyYWdlbnRcbiAgcmVxdWVzdC5nZXQgc2NoZW1hLmFwaUVuZHBvaW50LCAocmVzKSAtPlxuICAgIGl0ZW1zID0gcmVzLmJvZHlcbiAgICBsaXN0VnVlLiRkYXRhLml0ZW1zID0gaXRlbXMuaXRlbXNcblxuVnVlLmZpbHRlciBcImRhdGVGb3JtYXRcIiwgKHZhbHVlKSAtPlxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1QvLCBcIiBcIilcbiAgbG9jYWxUaW1lID0gbW9tZW50LnV0Yyh2YWx1ZS5zbGljZSgwLCAxNikpLnRvRGF0ZSgpXG4gIGxvY2FsVGltZSA9IG1vbWVudChsb2NhbFRpbWUpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW0gKFopXCIpXG4gIGxvY2FsVGltZVxuXG5WdWUuZmlsdGVyIFwiZGF0ZUZvcm1hdFVUQ1wiLCAodmFsdWUpIC0+XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvVC8sIFwiIFwiKVxuICB2YWx1ZS5zbGljZSAwLCAxNlxuXG5hcHBTdG9yZXMgPVxuICBBcmdlbnRpbmE6IDE0MzUwNVxuICBBdXN0cmFsaWE6IDE0MzQ2MFxuICBCZWxnaXVtOiAxNDM0NDZcbiAgQnJhemlsOiAxNDM1MDNcbiAgQ2FuYWRhOiAxNDM0NTVcbiAgQ2hpbGU6IDE0MzQ4M1xuICBDaGluYTogMTQzNDY1XG4gIENvbG9tYmlhOiAxNDM1MDFcbiAgXCJDb3N0YSBSaWNhXCI6IDE0MzQ5NVxuICBDcm9hdGlhOiAxNDM0OTRcbiAgXCJDemVjaCBSZXB1YmxpY1wiOiAxNDM0ODlcbiAgRGVubWFyazogMTQzNDU4XG4gIERldXRzY2hsYW5kOiAxNDM0NDNcbiAgXCJFbCBTYWx2YWRvclwiOiAxNDM1MDZcbiAgRXNwYW5hOiAxNDM0NTRcbiAgRmlubGFuZDogMTQzNDQ3XG4gIEZyYW5jZTogMTQzNDQyXG4gIEdyZWVjZTogMTQzNDQ4XG4gIEd1YXRlbWFsYTogMTQzNTA0XG4gIFwiSG9uZyBLb25nXCI6IDE0MzQ2M1xuICBIdW5nYXJ5OiAxNDM0ODJcbiAgSW5kaWE6IDE0MzQ2N1xuICBJbmRvbmVzaWE6IDE0MzQ3NlxuICBJcmVsYW5kOiAxNDM0NDlcbiAgSXNyYWVsOiAxNDM0OTFcbiAgSXRhbGlhOiAxNDM0NTBcbiAgS29yZWE6IDE0MzQ2NlxuICBLdXdhaXQ6IDE0MzQ5M1xuICBMZWJhbm9uOiAxNDM0OTdcbiAgTHV4ZW1ib3VyZzogMTQzNDUxXG4gIE1hbGF5c2lhOiAxNDM0NzNcbiAgTWV4aWNvOiAxNDM0NjhcbiAgTmVkZXJsYW5kOiAxNDM0NTJcbiAgXCJOZXcgWmVhbGFuZFwiOiAxNDM0NjFcbiAgTm9yd2F5OiAxNDM0NTdcbiAgT3N0ZXJyZWljaDogMTQzNDQ1XG4gIFBha2lzdGFuOiAxNDM0NzdcbiAgUGFuYW1hOiAxNDM0ODVcbiAgUGVydTogMTQzNTA3XG4gIFBoaWxsaXBpbmVzOiAxNDM0NzRcbiAgUG9sYW5kOiAxNDM0NzhcbiAgUG9ydHVnYWw6IDE0MzQ1M1xuICBRYXRhcjogMTQzNDk4XG4gIFJvbWFuaWE6IDE0MzQ4N1xuICBSdXNzaWE6IDE0MzQ2OVxuICBcIlNhdWRpIEFyYWJpYVwiOiAxNDM0NzlcbiAgXCJTY2h3ZWl6L1N1aXNzZVwiOiAxNDM0NTlcbiAgU2luZ2Fwb3JlOiAxNDM0NjRcbiAgU2xvdmFraWE6IDE0MzQ5NlxuICBTbG92ZW5pYTogMTQzNDk5XG4gIFwiU291dGggQWZyaWNhXCI6IDE0MzQ3MlxuICBcIlNyaSBMYW5rYVwiOiAxNDM0ODZcbiAgU3dlZGVuOiAxNDM0NTZcbiAgVGFpd2FuOiAxNDM0NzBcbiAgVGhhaWxhbmQ6IDE0MzQ3NVxuICBUdXJrZXk6IDE0MzQ4MFxuICBcIlVuaXRlZCBBcmFiIEVtaXJhdGVzXCI6IDE0MzQ4MVxuICBcIlVuaXRlZCBLaW5nZG9tXCI6IDE0MzQ0NFxuICBcIlVuaXRlZCBTdGF0ZXNcIjogMTQzNDQxXG4gIFZlbmV6dWVsYTogMTQzNTAyXG4gIFZpZXRuYW06IDE0MzQ3MVxuICBKYXBhbjogMTQzNDYyXG4gIFwiRG9taW5pY2FuIFJlcHVibGljXCI6IDE0MzUwOFxuICBFY3VhZG9yOiAxNDM1MDlcbiAgRWd5cHQ6IDE0MzUxNlxuICBFc3RvbmlhOiAxNDM1MThcbiAgSG9uZHVyYXM6IDE0MzUxMFxuICBKYW1haWNhOiAxNDM1MTFcbiAgS2F6YWtoc3RhbjogMTQzNTE3XG4gIExhdHZpYTogMTQzNTE5XG4gIExpdGh1YW5pYTogMTQzNTIwXG4gIE1hY2F1OiAxNDM1MTVcbiAgTWFsdGE6IDE0MzUyMVxuICBNb2xkb3ZhOiAxNDM1MjNcbiAgTmljYXJhZ3VhOiAxNDM1MTJcbiAgUGFyYWd1YXk6IDE0MzUxM1xuICBVcnVndWF5OiAxNDM1MTRcblxuYXBwU3RvcmVPcHRpb25zID0gW11cbmZvciBrZXksdmFsdWUgb2YgYXBwU3RvcmVzXG4gIGFwcFN0b3JlT3B0aW9ucy5wdXNoKHt0ZXh0OmtleSx2YWx1ZTp2YWx1ZX0pXG5cbmlPU0FwcFNjaGVtYSA9IFtcbiAge1xuICAgIGZpZWxkVGl0bGU6IFwiQXBwbGljYXRpb24gSURcIlxuICAgIGZpZWxkTmFtZTpcImFwcF9pZFwiXG4gICAgZmllbGRUeXBlOlwiaW5wdXR0ZXh0XCJcbiAgICBmaWVsZFZhbHVlOlwiXCJcbiAgfVxuICB7XG4gICAgZmllbGRUaXRsZTogXCJUaXRsZVwiXG4gICAgZmllbGROYW1lOlwidGl0bGVcIlxuICAgIGZpZWxkVHlwZTpcImlucHV0dGV4dFwiXG4gICAgZmllbGRWYWx1ZTpcIlwiXG4gIH1cbiAge1xuICAgIGZpZWxkVGl0bGU6IFwiV2ViaG9vayBVUkxcIlxuICAgIGZpZWxkTmFtZTpcIndlYmhvb2tfdXJsXCJcbiAgICBmaWVsZFR5cGU6XCJpbnB1dHRleHRcIlxuICAgIGZpZWxkVmFsdWU6XCJcIlxuICB9XG4gIHtcbiAgICBmaWVsZFRpdGxlOiBcIkRlc2NyaXB0aW9uXCJcbiAgICBmaWVsZE5hbWU6XCJjb250ZW50XCJcbiAgICBmaWVsZFR5cGU6XCJ0ZXh0YXJlYVwiXG4gICAgZmllbGRWYWx1ZTpcIlwiXG4gIH1cbiAge1xuICAgIGZpZWxkVGl0bGU6XCJSZWdpb25cIlxuICAgIGZpZWxkTmFtZTpcInJlZ2lvblwiXG4gICAgZmllbGRUeXBlOlwic2VsZWN0XCJcbiAgICBvcHRpb25zOiBhcHBTdG9yZU9wdGlvbnNcbiAgICBmaWVsZFZhbHVlOlwiXCJcbiAgfVxuXVxuXG5zY2hlbWFzID1cbiAgaW9zYXBwOlxuICAgIHNjaGVtYTppT1NBcHBTY2hlbWFcbiAgICBtb2RlbE5hbWU6IFwiaW9zYXBwXCJcbiAgICBhcGlFbmRwb2ludDogXCIvYWRtaW4vYXBpL3YxL2lvc2FwcFwiXG4gICAgZm9ybVRpdGxlOlwiQXBwU3RvcmUgQXBwIHNldHRpbmdzXCJcbiAgICBmb3JtRGVzY3JpcHRpb246XCJXaGVuIGEgcmV2aWV3IGlzIHBvc3RlZCB0byBBcHBTdG9yZSwgbm90aWZpY2F0aW9uIGlzIHNlbmQgdG8geW91ciBzbGFjayBjaGFubmVsXCJcbiJdfQ==
