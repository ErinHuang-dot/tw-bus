"use strict";

// 輸入或選取城市功能
var cityData = [{
  name: '臺北市',
  value: 'Taipei'
}, {
  name: '新北市',
  value: 'NewTaipei'
}, {
  name: '桃園市',
  value: 'Taoyuan'
}, {
  name: '臺中市',
  value: 'Taichung'
}, {
  name: '臺南市',
  value: 'Tainan'
}, {
  name: '高雄市',
  value: 'Kaohsiung'
}, {
  name: '基隆市',
  value: 'Keelung'
}, {
  name: '新竹市',
  value: 'Hsinchu'
}, {
  name: '新竹縣',
  value: 'HsinchuCounty'
}, {
  name: '苗栗縣',
  value: 'MiaoliCounty'
}, {
  name: '彰化縣',
  value: 'ChanghuaCounty'
}, {
  name: '南投縣',
  value: 'NantouCounty'
}, {
  name: '雲林縣',
  value: 'YunlinCounty'
}, {
  name: '嘉義縣',
  value: 'ChiayiCounty'
}, {
  name: '嘉義市',
  value: 'Chiayi'
}, {
  name: '屏東縣',
  value: 'PingtungCounty'
}, {
  name: '宜蘭縣',
  value: 'YilanCounty'
}, {
  name: '花蓮縣',
  value: 'HualienCounty'
}, {
  name: '臺東縣',
  value: 'TaitungCounty'
}, {
  name: '金門縣',
  value: 'KinmenCounty'
}, {
  name: '澎湖縣',
  value: 'PenghuCounty'
}, {
  name: '連江縣',
  value: 'LienchiangCounty'
}];
var cityList = document.querySelector('#cityDataList');

function select() {
  var str = '';
  cityData.forEach(function (item) {
    str += "<option value=\"".concat(item.value, "\">").concat(item.name, "</option>");
  });
  cityList.innerHTML = str;
}

select(); // 輸入或選取公車路線功能

var citySelect = document.querySelector('#citySelect');
var routeSearch = document.querySelector('#routeSearch');
var city = '';
var routeName = '';
citySelect.addEventListener('change', function (e) {
  city = e.target.value;
  console.log('city', city);
  getCityRoute(city); // 把city當作參數傳給 getCityRoute 執行
});
routeSearch.addEventListener('blur', function (e) {
  routeName = e.target.value;
  console.log('route', routeName);
}); // 接市區公車路線資料

var searchReultRoute = document.querySelector('.search-result-list');
var routeData = [];

function getCityRoute(city) {
  axios({
    method: 'get',
    url: "https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/".concat(city, "?$format=JSON"),
    headers: GetAuthorizationHeader()
  }).then(function (response) {
    console.log('城市路線資料', response);
    var routeData = response.data;
    var str = '';
    routeData.forEach(function (item) {
      str += "\n              <li>\n                <div class=\"search-result-card card border-0\">\n                    <div class=\"card-body p-0\">\n                        <div class=\"card-body-top d-flex justify-content-between align-items-center\">\n                            <h2 class=\"card-title text-secondary p-0\">".concat(item.RouteName.Zh_tw, "</h5>\n                            <button type=\"button\"><i class=\"far fa-heart fs-3 text-secondary-cool1\"></i></button>\n                        </div>\n                        <div class=\"card-body-bottom d-flex justify-content-between align-items-center\">\n                            <p class=\"card-text\"><small>").concat(item.DepartureStopNameZh, "<i class=\"fas fa-arrows-alt-h px-2\"></i>").concat(item.DestinationStopNameZh, "</small></p>\n                            <p class=\"card-text text-secondary-cool1\"><small>").concat(city, "</small></p>\n                        </div>\n                    </div>\n                </div>\n              </li>");
    });
    searchReultRoute.innerHTML = str;
  })["catch"](function (error) {
    return console.log('error', error);
  });
}

getCityRoute(); // TDX API 驗證

function GetAuthorizationHeader() {
  var AppID = 'f7c6d9e58f254fe5af3cd8ee9794906d';
  var AppKey = '6lFzrDFGOczHY42h-Erlj21ftOo';
  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return {
    'Authorization': Authorization,
    'X-Date': GMTString
    /*,'Accept-Encoding': 'gzip'*/

  }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}
//# sourceMappingURL=all.js.map
