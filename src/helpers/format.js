export const formatDateTime = (val) => {
  const full = new Date(val)
  const date = [
    full.getDate().toString().padStart(2, '0'),
    (full.getMonth() + 1).toString().padStart(2, '0'),
    full.getFullYear().toString().padStart(2, '0')
  ].join('.')

  const time = [
    full.getHours().toString().padStart(2, '0'),
    full.getMinutes().toString().padStart(2, '0')
  ].join(':')

  return date + ' ' + time
}
