export const capitalize = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

export const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedTime = new Date(date).toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" })

  return { date: formattedDate, time: formattedTime }
}
