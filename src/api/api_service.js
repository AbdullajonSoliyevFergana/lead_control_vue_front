import apiConfigs from './api_configs'

export default class ApiService {
  axiosIns = null
  apiConfig = { ...apiConfigs }

  constructor(axiosIns) {
    this.axiosIns = axiosIns

    this.axiosIns.interceptors.request.use(
      (config) => {
        //use token
        return config
      },
      (error) => {
        console.log(error)
        return Promise.reject(error)
      }
    )

    this.axiosIns.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // console.log(error.response)

        return error.response
      }
    )
  }

  //Storage methods

  getToken() {
    return localStorage.getItem(this.apiConfig.tokenStorageKey)
  }

  getUser() {
    return JSON.parse(localStorage.getItem('adminData'))
  }

  setToken(value) {
    localStorage.setItem(this.apiConfig.tokenStorageKey, value)
  }

  getBaseUrlAdmin() {
    return 'http://leadback.abdullajonsoliyev.uz/'
  }

  getBaseUrlAdmin2() {
    return 'http://leadback.abdullajonsoliyev.uz'
  }

  //Api methods

  imageUrl(image) {
    const url = this.getBaseUrlAdmin2()
    image = url + image
    return image
  }

  urlFile(file) {
    const url = this.axiosIns.defaults.baseURL
    file = url + file
    return file
  }

  adminLogin(...args) {
    return this.axiosIns.post(this.apiConfig.adminLoginEndpoint, ...args)
  }

  adminGet(...args) {
    return this.axiosIns.get(this.apiConfig.adminGetEndpoint, ...args)
  }

  // operators
  operatorAdd(operatorData) {

    return this.axiosIns.post(
      this.apiConfig.operatorAddEndpoint,
      operatorData
    )
  }

  getOperator(id) {
    return this.axiosIns.get(this.apiConfig.operatorGetEndpoint + id)
  }


  searchOperators(words, page) {
    const body = {
      word: words,
      page: page
    }
    return this.axiosIns.post(
      this.apiConfig.operatorSearchEndpoint,
      body
    )
  }

  operatorUpdate(operatorData) {

    return this.axiosIns.post(
      this.apiConfig.operatorUpdateEndpoint + operatorData.id,
      operatorData
    )
  }

  deleteOperator(id) {
    return this.axiosIns.get(this.apiConfig.operatorDeleteEndpoint + id)
  }

  // leads
  
  getLeads() {
    return this.axiosIns.post(
      this.apiConfig.leadListEndpoint
    )
  }

  
  getLead(id) {
    return this.axiosIns.get(this.apiConfig.leadGetEndpoint + id)
  }


  changeLead(data) {
    return this.axiosIns.post(
      this.apiConfig.leadChangeEndpoint, data
    )
  }

}
