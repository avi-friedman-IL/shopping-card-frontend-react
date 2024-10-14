import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
   googleLogin,
   login,
   logout,
   signup,
   getUsers,
   getById,
   remove,
   update,
   getLoggedinUser,
   saveLoggedinUser,
}

function getUsers() {
   return httpService.get(`user`)
}

async function getById(userId) {
   const user = await httpService.get(`user/${userId}`)
   return user
}

function remove(userId) {
   return httpService.delete(`user/${userId}`)
}

async function update(currUser) {
   const user = await httpService.put(`user/${currUser._id}`, currUser)

   // When admin updates other user's details, do not update loggedinUser
   const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
   if (loggedinUser._id === user._id) saveLoggedinUser(user)

   return user
}

async function googleLogin(credential) {
   const user = await httpService.post('auth/google', { token: credential })
   if (user) return saveLoggedinUser(user)
}

async function login(userCred) {
   const user = await httpService.post('auth/login', userCred)
   if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
   console.log('userCred:', userCred)
   userCred.isAdmin = true

   const user = await httpService.post('auth/signup', userCred)
   return saveLoggedinUser(user)
}

async function logout() {
   sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
   return await httpService.post('auth/logout')
}

function getLoggedinUser() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
   return user
}
