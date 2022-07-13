import {HTTP_GET,CONTENT_TYPE_FORM_URLENCODED} from './constants.js';

const DEFAULTS = {
    method:HTTP_GET,
    //请求头携带的数据
    params:null,
    // params:{
    //     username:'ABC',
    //     age:18
    // }
    //请求体携带的数据
    data:null,
    // params:{
    //     username:'ABC',
    //     age:18
    // }
    //或者是FormData数据

    contentType:CONTENT_TYPE_FORM_URLENCODED,
    responseType:'text',
    timeoutTime:0,
    withCredentials:false,

    //方法
    success(){},
    httpCodeError(){},  //这个失败是onload事件中的失败
    error(){},
    abort(){},
    timeout(){},
}

export default DEFAULTS;