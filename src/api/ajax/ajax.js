//默认参数
import DEFAULTS from './defaults.js';
//工具函数
import {serialize,serializeJSON,addURLData} from './utils.js';
//常量
import {HTTP_GET,CONTENT_TYPE_FORM_URLENCODED,CONTENT_TYPE_JSON} from './constants.js';

class Ajax {
    constructor(url, options) {
        this.url = url;
        this.options = Object.assign({}, DEFAULTS, options);
        //初始化
        this.init();
    }
    //初始化
    init() {
        const xhr = new XMLHttpRequest();

        this.xhr = xhr;
        //放load，error等等
        this.bindEvents();

        xhr.open(this.options.method,this.url+this.addParam(),true);
        //responseType
        this.setResponseType();
        //跨域是否携带cookie,withCredentials
        this.setCookie();
        //设置超时
        this.setTimeout();
        
        this.sendData();
        //xhr.send();
    }
    bindEvents() {
        const xhr = this.xhr;
        const { success, httpCodeError, error, abort, timeout } = this.options;

        //load
        xhr.addEventListener('load', () => {
            if (this.ok()) {
                success(xhr.response, xhr);
            } else {
                httpCodeError(xhr.status, xhr);
            }
        }, false);
        //error
        xhr.addEventListener('error',()=>{
            error(xhr);
        },false);
        //abort
        xhr.addEventListener('abort',()=>{
            abort(xhr);
        },false);
        //timeout
        xhr.addEventListener('timeout',()=>{
            timeout(xhr);
        },false);
    }
    ok() {
        const xhr=this.xhr;
        return (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304;
    }
    addParam(){
        const {params} = this.options;
        if(!params) return '';
        return addURLData(this.url,serialize(params));
    }
    setResponseType(){
        this.xhr.responseType = this.options.responseType;
    }
    setCookie(){
        if(this.options.withCredetials){
            this.xhr.withCredentials = true;
        }
    }
    setTimeout(){
        const {timeoutTime} = this.options;
        if(timeoutTime>0){
            this.xhr.timeout = timeoutTime;
        }
    }
    sendData(){
        const xhr = this.xhr;
        if(!this.isSendData()) {
            return xhr.send(null);
        }
        let resultData = null;
        const {data} = this.options;
        if(this.isFormData()) {
            resultData = data;
        } 
        else if (this.isFormURLEncodedData()) {
            //application/x-www-form-urlencoded这种格式
            this.setContentType(CONTENT_TYPE_FORM_URLENCODED);
            resultData = serialize(data);
        }
        else if (this.isJsonData()) {
            //application/x-www-form-urlencoded这种格式
            this.setContentType(CONTENT_TYPE_JSON);
            resultData = serializeJSON(data);
        } 
        else {
            //其他格式
            this.setContentType();
            resultData = data;
        }
        xhr.send(resultData);
    }
    //是否需要用send发送数据
    isSendData(){
        const{data,method}=this.options;
        if(!data) return false;
        if(method.toLowerCase() === HTTP_GET.toLowerCase()) return false;

        return true;
    }
    //是否发送FormData格式的数据
    isFormData(){
        return this.options.data instanceof FormData;
    }
    //是否发送application/x-www-form-urlencoded格式的数据
    isFormURLEncodedData(){
        return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_FORM_URLENCODED);
    }
    //是否发送application/json格式的数据
    isJsonData(){
        return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_JSON);
    }
    //设置contentType
    setContentType(contentType = this.options.contentType){
        if(!contentType) return;
        this.xhr.setRequestHeader('Content-Type',contentType);
    }
    //获取xhr对象
    getXHR(){
        return this.xhr;
    }
}

export default Ajax;