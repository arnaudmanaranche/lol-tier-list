export const isProtectedRouteWithProtectedMethod = (pathname: string, method: string) => {
  switch (true) {
    case pathname.startsWith('/api/users') && method === 'GET':
    case pathname.startsWith('/api/users') && method === 'DELETE':
    case pathname.startsWith('/api/rankings') && method === 'POST':
    case pathname.startsWith('/api/rankings') && method === 'DELETE':
    case pathname.startsWith('/api/rankings') && method === 'PATCH':
      return true
    default:
      return false
  }
}
