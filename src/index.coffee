document.addEventListener "DOMContentLoaded", (event) ->
  console.log "DOM fully loaded and parsed"
  modelName = location.pathname.split("/")[2]
  switch modelName
    when "form" then BuildForm()
    when "iosapp" then IOSApp()
  return

BuildForm = ->
  modelName = location.hash.split("/")[1]
  schema = schemas[modelName]
  console.log schema
  formVue = new Vue(
    el: "#form-container"
    data:
      formTitle: schema.formTitle
      items: schema.schema
  )


IOSApp = ->
  request = window.superagent
  request.get "/admin/api/v1/iosapp", (res) ->
    items = res.body
    listVue = new Vue(
      el: "#content-list-table"
      data:
        items: items.items
    )

Vue.filter "dateFormat", (value) ->
  value = value.replace(/T/, " ")
  localTime = moment.utc(value.slice(0, 16)).toDate()
  localTime = moment(localTime).format("YYYY-MM-DD HH:mm (Z)")
  localTime

Vue.filter "dateFormatUTC", (value) ->
  value = value.replace(/T/, " ")
  value.slice 0, 16

appStores =
  Argentina: 143505
  Australia: 143460
  Belgium: 143446
  Brazil: 143503
  Canada: 143455
  Chile: 143483
  China: 143465
  Colombia: 143501
  "Costa Rica": 143495
  Croatia: 143494
  "Czech Republic": 143489
  Denmark: 143458
  Deutschland: 143443
  "El Salvador": 143506
  Espana: 143454
  Finland: 143447
  France: 143442
  Greece: 143448
  Guatemala: 143504
  "Hong Kong": 143463
  Hungary: 143482
  India: 143467
  Indonesia: 143476
  Ireland: 143449
  Israel: 143491
  Italia: 143450
  Korea: 143466
  Kuwait: 143493
  Lebanon: 143497
  Luxembourg: 143451
  Malaysia: 143473
  Mexico: 143468
  Nederland: 143452
  "New Zealand": 143461
  Norway: 143457
  Osterreich: 143445
  Pakistan: 143477
  Panama: 143485
  Peru: 143507
  Phillipines: 143474
  Poland: 143478
  Portugal: 143453
  Qatar: 143498
  Romania: 143487
  Russia: 143469
  "Saudi Arabia": 143479
  "Schweiz/Suisse": 143459
  Singapore: 143464
  Slovakia: 143496
  Slovenia: 143499
  "South Africa": 143472
  "Sri Lanka": 143486
  Sweden: 143456
  Taiwan: 143470
  Thailand: 143475
  Turkey: 143480
  "United Arab Emirates": 143481
  "United Kingdom": 143444
  "United States": 143441
  Venezuela: 143502
  Vietnam: 143471
  Japan: 143462
  "Dominican Republic": 143508
  Ecuador: 143509
  Egypt: 143516
  Estonia: 143518
  Honduras: 143510
  Jamaica: 143511
  Kazakhstan: 143517
  Latvia: 143519
  Lithuania: 143520
  Macau: 143515
  Malta: 143521
  Moldova: 143523
  Nicaragua: 143512
  Paraguay: 143513
  Uruguay: 143514

iOSAppSchema = [
  {
    fieldTitle: "Application ID"
    fieldName:"app_id"
    fieldType:"inputtext"
  }
  {
    fieldTitle: "Title"
    fieldName:"title"
    fieldType:"inputtext"
  }
  {
    fieldTitle: "Webhook URL"
    fieldName:"webhook_url"
    fieldType:"inputtext"
  }
  {
    fieldTitle: "Description"
    fieldName:"content"
    fieldType:"textarea"
  }
  {
    fieldTitle: "Region"
    fieldName:"region"
    fieldType:"select"
    options: appStores
  }
]


schemas =
  iosapp:
    schema:iOSAppSchema
    formTitle:"AppStore App settings"
    formDescription:"set the app id of your application"
