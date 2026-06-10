import type { AppSettings } from '@/types'

export const defaultSettings: AppSettings = {
  notifications: {
    newLeads: true,
    visitReminders: true,
    dealUpdates: true,
  },
  pipeline: {
    autoAssign: false,
    showValue: true,
  },
}
