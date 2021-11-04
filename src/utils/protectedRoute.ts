import type { User } from '@supabase/gotrue-js'
import type { GetServerSidePropsContext } from 'next'

import { ROUTES } from 'Utils/constants'
import supabase from 'Utils/supabase'

import { TOURNAMENT } from './types'

const protectedRoute = async (
  context: GetServerSidePropsContext,
  getProps?: (user?: User) => any
): Promise<any> => {
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
      props: {
        user,
        ...((await getProps(user)) as TOURNAMENT[])
      }
    }
  }

  return {
    props: {
      user
    }
  }
}

export default protectedRoute
