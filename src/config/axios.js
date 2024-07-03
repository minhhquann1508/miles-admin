import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_DOMAIN,
});

instance.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
    return config;
}, function (error) {
    // Làm gì đó với lỗi request
    return error.response;
});

// Thêm một bộ đón chặn response
instance.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
}, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return error.response;
});

export default instance;