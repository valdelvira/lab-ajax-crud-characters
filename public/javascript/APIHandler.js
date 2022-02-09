class APIHandler {
  // constructor(baseUrl) {
  //   this.BASE_URL = axios.create({ baseUrl })
  // }
  constructor() {
    this.axiosApp = axios.create({
      baseURL: 'https://minions-api.herokuapp.com/characters',
    })
  }

  getFullList() {
    return this.axiosApp.get('/')
  }

  getOneRegister(idMinion) {
    return this.axiosApp.get(`/${idMinion}`)
  }

  createOneRegister(dataMinion) {
    return this.axiosApp.post(`/`, dataMinion)
  }

  updateOneRegister(idMinion, minionData) {
    return this.axiosApp.put(`/${idMinion}`, minionData)
  }

  deleteOneRegister(idMinion) {
    return this.axiosApp.delete(`/${idMinion}`)
  }
}
