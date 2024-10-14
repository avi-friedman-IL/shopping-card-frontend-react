const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { shopService as local } from './shop.service.local'
import { shopService as remote } from './shop.service.remote'

const service = VITE_LOCAL === 'true' ? local : remote
// const service = local 
// console.log(VITE_LOCAL)
export const shopService = { ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

// if (DEV) window.shopService = shopService
