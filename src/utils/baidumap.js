let ak = 'zIfZxycmGOuhNvehuQ0qVlPIoOgbegG4'
/**
 * 异步加载百度地图
 * @returns {Promise}
 * @constructor
 */
function loadBaiDuMap() {
    return new Promise(function (resolve, reject) {
        try {
            console.log("BMap is defined:", BMapGL === undefined || BMapGL);
            resolve(BMapGL);
        } catch (err) {
            window.init = function () {
                resolve(BMapGL);
            };
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init`;
            script.onerror = reject;
            document.body.appendChild(script);
        }
    });
}
export { loadBaiDuMap };
//通过地址转换为经纬度，注意这里必须传入city，也就是市
function getPoint(city, address) {
    let result = loadBaiDuMap().then((BMapGL) => {
        return new Promise(function (resolve, reject) {
            //创建地址解析器实例
            let res = "没有查询到经纬度";

            if (!city) {
                res = "商户记录属于哪个城市未知";
                reject(res);
            }
            var myGeo = new BMapGL.Geocoder();
            // 将地址解析结果显示在地图上，并调整地图视野
            myGeo.getPoint(
                address,
                function (point) {
                    if (point) {
                        console.log(point, "point");
                        resolve(point);
                    } else {
                        reject(res);
                    }
                },
                city
            );
        });
    });
    return result;
}

export { getPoint };
//定位，获取当前的地理位置
function getLocationInfo() {
    let result = loadBaiDuMap().then((BMapGL) => {
        return new Promise(function (resolve, reject) {
            // 创建地图实例
            let geolocation = new BMapGL.Geolocation(); // 创建百度地理位置实例，代替 navigator.geolocation
            geolocation.getCurrentPosition(function (e) {
                console.log(e, "e");

                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    // 百度 geolocation 的经纬度属性不同，此处是 point.lat 而不是 coords.latitude
                    let point = new BMapGL.Point(e.point.lng, e.point.lat);
                    // console.log(point, "point");
                    let gc = new BMapGL.Geocoder();
                    gc.getLocation(point, function (rs) {
                        console.log(rs)
                        console.log('dddereerr')
                        resolve(rs);
                    });
                } else {
                    console.log(this.getStatus());
                    reject(this.getStatus());
                }
            });
        });
    });
    return result;
}
export { getLocationInfo };