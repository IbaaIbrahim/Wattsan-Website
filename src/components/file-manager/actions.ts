import axios from "axios"
import { authorizedRequest } from "../../utils/request"
import { API_FILE_MANAGER_CREATE, API_FILE_MANAGER_DELETE, API_FILE_MANAGER_READ, API_FILE_MANAGER_UPDATE } from "@constants/api"

//***************** Get file by id *******************//
export const _getFileManagerItemData = (id, callback, callbackErr = () => {}, callbackFinally = () => {}) => {
    authorizedRequest
    axios.get(`${API_FILE_MANAGER_READ}?filter=id~eq~'${id}'`)
    // API.get(`/FileManager/Read`)
        .then(function ({data}) {
            
            callback(data?.data)
        })
        .catch(function (data) {
            // callbackErr(data?.data?.errors)
        })
        .finally(() => {
            callbackFinally()
        })
}
//***************** Get files *******************//
export const _getFileManagerData = (parentId, callback, callbackErr = () => {}, callbackFinally = () => {}) => {
    axios.get(`${API_FILE_MANAGER_READ}?filter=parentId~eq~'${parentId}'`)
    // API.get(`/FileManager/Read`)
        .then(function ({data}) {
            console.log(data);
            callback(data.data)
        })
        .catch(function (data) {
            // callbackErr(data?.data?.errors)
        })
        .finally(() => {
            callbackFinally()
        })
}
//***************** Create new *******************//
export const _storeFileManagerItem = (data, callback, callbackErr = () => {}, callbackFinally = () => {}) => {
    axios.post(API_FILE_MANAGER_CREATE, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then(function ({data}) {
            callback(data)
        })
        .catch(function (data) {
            // callbackErr(data?.data?.errors)
        })
        .finally(() => {
            callbackFinally()
        })
}
//***************** Update file name *******************//
export const _updateFileManagerItemTitle = (data, callback, callbackErr = () => {}, callbackFinally = () => {}) => {
    axios.put(API_FILE_MANAGER_UPDATE, data)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function (data) {
            // callbackErr(data?.data?.errors)
        })
        .finally(() => {
            callbackFinally()
        })
}
//***************** Delete file name *******************//
export const _deleteFileManagerItem = (id, callback, callbackErr = () => {}, callbackFinally = () => {}) => {
    axios.delete(`${API_FILE_MANAGER_DELETE}?id=${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function (data) {
            // callbackErr(data?.data?.errors)
        })
        .finally(() => {
            callbackFinally()
        })
}
