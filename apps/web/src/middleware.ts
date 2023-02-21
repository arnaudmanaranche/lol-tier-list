// import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'

// import { isProtectedRouteWithProtectedMethod } from 'Utils/isProtectedRouteWithProtectedMethod'

// export async function middleware(req: NextRequest, res: NextResponse) {
//   const supabaseClient = createMiddlewareSupabaseClient({ req, res })

//   const {
//     data: { session }
//   } = await supabaseClient.auth.getSession()

//   if (!session && isProtectedRouteWithProtectedMethod(req.nextUrl.pathname, req.method)) {
//     return new NextResponse(JSON.stringify({ success: false, message: 'Unauthorized' }), {
//       status: 401,
//       headers: { 'content-type': 'application/json' }
//     })
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/api/users/:path*', '/api/rankings/:path*']
// }

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function middleware() {}
