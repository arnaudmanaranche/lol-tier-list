import { ROUTES } from 'Utils/constants'
import supabase from 'Utils/supabase'

const protectedRoute = async (context, getProps) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req)

  if (!user) {
    return {
      redirect: {
        destination: ROUTES.HOME,
        permanent: false
      }
    }
  }

  if (getProps) {
    return {
      props: await getProps()
    }
  }

  return {
    props: {}
  }
}

export default protectedRoute
