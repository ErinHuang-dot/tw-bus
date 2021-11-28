// 輸入或選取城市功能
const cityData = [
  { name: '臺北市', value: 'Taipei' },
  { name: '新北市', value: 'NewTaipei' },
  { name: '桃園市', value: 'Taoyuan' },
  { name: '臺中市', value: 'Taichung' },
  { name: '臺南市', value: 'Tainan' },
  { name: '高雄市', value: 'Kaohsiung' },
  { name: '基隆市', value: 'Keelung' },
  { name: '新竹市', value: 'Hsinchu' },
  { name: '新竹縣', value: 'HsinchuCounty' },
  { name: '苗栗縣', value: 'MiaoliCounty' },
  { name: '彰化縣', value: 'ChanghuaCounty' },
  { name: '南投縣', value: 'NantouCounty' },
  { name: '雲林縣', value: 'YunlinCounty' },
  { name: '嘉義縣', value: 'ChiayiCounty' },
  { name: '嘉義市', value: 'Chiayi' },
  { name: '屏東縣', value: 'PingtungCounty' },
  { name: '宜蘭縣', value: 'YilanCounty' },
  { name: '花蓮縣', value: 'HualienCounty' },
  { name: '臺東縣', value: 'TaitungCounty' },
  { name: '金門縣', value: 'KinmenCounty' },
  { name: '澎湖縣', value: 'PenghuCounty' },
  { name: '連江縣', value: 'LienchiangCounty' },
]

const cityList = document.querySelector('#cityDataList');
function select() {
  let str = '';
  cityData.forEach((item) => {
    str +=`<option value="${item.value}">${item.name}</option>`
  })
  cityList.innerHTML = str;
}
select();

// 輸入或選取公車路線功能
const citySelect = document.querySelector('#citySelect');
const routeSearch = document.querySelector('#routeSearch');

let city = '';
let routeName = '';

citySelect.addEventListener('change', function(e) {
  city = e.target.value;
  console.log('city', city);
  getCityRoute(city); // 把city當作參數傳給 getCityRoute 執行
})

routeSearch.addEventListener('blur', function(e) {
  routeName = e.target.value;
  console.log('route', routeName);
})


// 接市區公車路線資料
const searchReultRoute = document.querySelector('.search-result-list');
let routeData = [];

function getCityRoute(city) {
    axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}?$format=JSON`,
        headers: GetAuthorizationHeader()        
    })
        .then((response) => {
            console.log('城市路線資料', response)
            const routeData = response.data;

            let str='';
            routeData.forEach((item) => {
              str += `
              <li>
                <div class="search-result-card card border-0">
                    <div class="card-body p-0">
                        <div class="card-body-top d-flex justify-content-between align-items-center">
                            <h2 class="card-title text-secondary p-0">${item.RouteName.Zh_tw}</h5>
                            <button type="button"><i class="far fa-heart fs-3 text-secondary-cool1"></i></button>
                        </div>
                        <div class="card-body-bottom d-flex justify-content-between align-items-center">
                            <p class="card-text"><small>${item.DepartureStopNameZh}<i class="fas fa-arrows-alt-h px-2"></i>${item.DestinationStopNameZh}</small></p>
                            <p class="card-text text-secondary-cool1"><small>${city}</small></p>
                        </div>
                    </div>
                </div>
              </li>`
            })
          
          searchReultRoute.innerHTML = str;

        })
        .catch((error) => console.log('error', error))
}
getCityRoute();



// TDX API 驗證
function GetAuthorizationHeader() {
  var AppID = 'f7c6d9e58f254fe5af3cd8ee9794906d';
  var AppKey = '6lFzrDFGOczHY42h-Erlj21ftOo';

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

  return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}