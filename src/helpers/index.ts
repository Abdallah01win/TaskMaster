export const capitalize = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

export const formatDate = (date: string) => {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const timeOptions = { hour: 'numeric', minute: 'numeric' }

  const formattedDate = new Date(date).toLocaleDateString(undefined, dateOptions)
  const formattedTime = new Date(date).toLocaleTimeString(undefined, timeOptions)

  return { date: formattedDate, time: formattedTime }
}
