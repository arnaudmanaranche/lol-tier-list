import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const supabaseClient = createClient(req, res)

  const tierListId = req.query.id as string

  const { data: user } = await supabaseClient.auth.getUser()

  if (!user || !user.user) {
    res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'DELETE') {
    await supabaseClient
      .from('rankings')
      .delete()
      .eq('id', tierListId)
      .eq('user_id', user?.user?.id as string)
    res.status(204).json({ status: 'OK' })
  } else if (req.method === 'PATCH') {
    const {
      body: { tierList: tierListData }
    } = req

    const { data: updatedData } = await supabaseClient
      .from('rankings')
      .update({
        data: tierListData.data
      })
      .eq('id', tierListId)
      .eq('user_id', user?.user?.id as string)
      .single()
    res.status(204).json(updatedData)
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
