export function setAdmin (admin) {
  sessionStorage.setItem('admin', JSON.stringify(admin))
}

export function removeAdmin () {
  sessionStorage.removeItem('admin')
}

export function isAuth () {
  return !!sessionStorage.getItem('admin')
}
