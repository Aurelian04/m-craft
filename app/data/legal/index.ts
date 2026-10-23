import type { LegalDoc } from '../types'
import termeni from './termeni'
import confidentialitate from './confidentialitate'
import cookie from './cookie'

export const legal = { termeni, confidentialitate, cookie } satisfies Record<string, LegalDoc>
