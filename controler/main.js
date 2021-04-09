getEle = (id) => document.querySelector(id);

// gán biến key api
const keyAPI = "e3d5dd08877eff4298fb31086fb72b95";
// gán biến dấu -- nếu ko có data sẽ có dấu --
const DEFAULT_VALUE = "--";

// dom lấy giá trị 
const search = getEle("#searchInput");
const tenTP = getEle(".tenTP");
const thongTin = getEle(".thongTin");
const iconThoiTiet = getEle(".iconThoiTiet");
const nhietDo = getEle(".nhietDo");
const timeSunrie = getEle(".timeSunrie");
const paramet = getEle(".paramet");
const timeSunnet = getEle(".timeSunnet");
const speed = getEle(".speed");


// tạo hàm sự kiện change tại input
search.addEventListener("change", (e) => {
    // gọi api openweather chuyển về tiếng việt độ f = độ c
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${keyAPI}&lang=vi&units=metric`)
        // tạo promise
        .then(async result => {
            // lấy data từ openweather
            const data = await result.json();
            // nhập input lấy data thành công
            console.log(search, data)
            // gọi các giá trị trong data xuất ra ui
            // tên tp
            tenTP.innerHTML = data.name || DEFAULT_VALUE;
            // thông tin thời tiết
            thongTin.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            // icon status
            iconThoiTiet.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            // nhiệt độ dùng hàm làm tròn round khi có số thập phân
            nhietDo.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE
            // time sunerise sunset convert từ unix timestamp sang ngày giờ ui
            timeSunrie.innerHTML = moment.unix(data.sys.sunrise).format("h:mm") || DEFAULT_VALUE;
            timeSunnet.innerHTML = moment.unix(data.sys.sunset).format("h:mm") || DEFAULT_VALUE;
            // độ ẩm
            paramet.innerHTML = data.main.humidity + " % "|| DEFAULT_VALUE;
            // tốc độ gió mặc định m/s*3.6 conver km/h tofixed = chỉ giữ 2 số thập phân
            speed.innerHTML = (data.wind.speed * 3.6).toFixed(2) + " km/h " || DEFAULT_VALUE;
        })
})