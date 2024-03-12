import type { List } from '@/types'

export const defaultLists: List[] = [
  {
    id: 1,
    name: 'My Day',
    icon: 'sun',
  },
  {
    id: 2,
    name: 'Important',
    icon: 'warning-circle',
  },
  {
    id: 3,
    name: 'Favorites',
    icon: 'star',
  },
  {
    id: 4,
    name: 'Completed',
    icon: 'check-circle',
  },
  {
    id: 5,
    name: 'All Tasks',
    icon: 'list-checks',
  },
]

export const staticIconClasses = [
  { class: 'w-3 h-3', value: 3 },
  { class: 'w-4 h-4', value: 4 },
  { class: 'w-5 h-5', value: 5 },
]
