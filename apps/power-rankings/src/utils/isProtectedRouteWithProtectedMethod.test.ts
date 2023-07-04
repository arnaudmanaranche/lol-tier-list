import { isProtectedRouteWithProtectedMethod } from './isProtectedRouteWithProtectedMethod'

describe('isProtectedRouteWithProtectedMethod', () => {
  it.each([
    [true, '/api/users', 'GET'],
    [true, '/api/users', 'DELETE'],
    [false, '/api/users', 'POST'],
    [true, '/api/rankings', 'POST'],
    [true, '/api/rankings', 'DELETE'],
    [true, '/api/rankings', 'PATCH'],
    [false, '/api/rankings', 'GET']
  ])('should return %s for %s and %s', (expected, pathname, method) => {
    expect(isProtectedRouteWithProtectedMethod(pathname, method)).toEqual(expected)
  })
})
