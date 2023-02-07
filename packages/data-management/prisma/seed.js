import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const defaultTournament = await prisma.tournament.upsert({
    where: {
      id: '478a7119-2281-4ed5-87a5-2144312284fa'
    },
    update: {},
    create: {
      id: '478a7119-2281-4ed5-87a5-2144312284fa',
      name: 'LEC - summer (2021)',
      pandascoreId: 6475,
      teams: [
        {
          id: 115,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/vit.png',
          name: 'Team Vitality',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAAOUlEQVQImQ3GsQkAIRBFwV+lvV4qCNeAiUUsGngsrvK8iUYRM2CBu+sA46WXDfqAmmhpgSRhGXv+XXa+JsBHKc1SAAAAAElFTkSuQmCC',
          acronym: 'VIT',
          players: [
            { id: 20300, name: 'Szygenda', role: 'top' },
            { id: 14985, name: 'Selfmade', role: 'jun' },
            { id: 20831, name: 'LIDER', role: 'mid' },
            { id: 1286, name: 'Crownshot', role: 'adc' },
            { id: 14980, name: 'Labrov', role: 'sup' }
          ]
        },
        {
          id: 394,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/fnc.png',
          name: 'Fnatic',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAAOElEQVQImWP4vzTu/5Sg/zNC/y+NY/g/O+z/pAAQZ3YYA0hmfiSIsyiG4f+Jiv9V9u4MDP+PlAEALi8d3KVV9dUAAAAASUVORK5CYII=',
          acronym: 'FNC',
          players: [
            { id: 32021, name: 'Adam', role: 'top' },
            { id: 1343, name: 'Bwipo', role: 'jun' },
            { id: 1284, name: 'Nisqy', role: 'mid' },
            { id: 1168, name: 'Upset', role: 'adc' },
            { id: 74, name: 'Hylissang', role: 'sup' }
          ]
        },
        {
          id: 3983,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/rge.png',
          name: 'Rogue',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAAP0lEQVQImQE0AMv/AAAAAGCAtnKV0wAAAAB6nuCSyue/9f+w5P8AqeL/eq3Kk8XcquL/AAAAAIOv6p/P/9H//5+6HYTZQ620AAAAAElFTkSuQmCC',
          acronym: 'RGE',
          players: [
            { id: 2159, name: 'Odoamne', role: 'top' },
            { id: 18036, name: 'Inspired', role: 'jun' },
            { id: 1429, name: 'Larssen', role: 'mid' },
            { id: 871, name: 'Hans sama', role: 'adc' },
            { id: 22950, name: 'Trymbi', role: 'sup' }
          ]
        },
        {
          id: 37,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/msf.png',
          name: 'Misfits Gaming',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAAP0lEQVQImQE0AMv/AJ+fn5qjo7O4uObm5gDP0tLw5uezqap5rawAXGBk/93g/eDjGT8/AAAAAPr//+76+gAAAGBTHqhG/tuUAAAAAElFTkSuQmCC',
          acronym: 'MSF',
          players: [
            { id: 21576, name: 'HiRit', role: 'top' },
            { id: 3503, name: 'Razork', role: 'jun' },
            { id: 25741, name: 'Vétheo', role: 'mid' },
            { id: 304, name: 'Kobbe', role: 'adc' },
            { id: 2161, name: 'Vander', role: 'sup' }
          ]
        },
        {
          id: 88,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/g2.png',
          name: 'G2 Esports',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAANUlEQVQImR3BsQkAMAgEwB/BvSzdvxYsJCAJwgcS8A6qymFm6O5TtdxJYo+MyEwAIHnfE5EP14Eklb30T8QAAAAASUVORK5CYII=',
          acronym: 'G2',
          players: [
            { id: 1172, name: 'Wunder', role: 'top' },
            { id: 2147, name: 'Jankos', role: 'jun' },
            { id: 1132, name: 'Caps', role: 'mid' },
            { id: 2146, name: 'Rekkles', role: 'adc' },
            { id: 605, name: 'Mikyx', role: 'sup' }
          ]
        },
        {
          id: 126536,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/mad.png',
          name: 'MAD Lions',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAAMElEQVQImR3JQQoAMAgDwfy3iuK/PUlzTbEwh4UFADHEwNaY6GsMYv7jYkJdumd1PQ6tIVMMcqZOAAAAAElFTkSuQmCC',
          acronym: 'MAD',
          players: [
            { id: 3546, name: 'Armut', role: 'top' },
            { id: 24428, name: 'Elyoya', role: 'jun' },
            { id: 17222, name: 'Humanoid', role: 'mid' },
            { id: 14972, name: 'Carzzy', role: 'adc' },
            { id: 18037, name: 'Kaiser', role: 'sup' }
          ]
        }
      ],
      status: true,
      logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/logo.png',
      base64:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAACxLAAAsSwGlPZapAAAAH0lEQVQImWP4l+L2f0XF/80N/zc3MEAoPJx1NQwMDAB2VSBJq3zHBQAAAABJRU5ErkJggg==',
      year: 2021
    }
  })

  const inactiveTournament = await prisma.tournament.upsert({
    where: {
      id: '478a7119-2281-4ed5-87a5-2144312284fb'
    },
    update: {},
    create: {
      id: '478a7119-2281-4ed5-87a5-2144312284fb',
      name: 'LEC - summer (2021)',
      pandascoreId: 6475,
      teams: [
        {
          id: 115,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/vit.png',
          name: 'Team Vitality',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAAOUlEQVQImQ3GsQkAIRBFwV+lvV4qCNeAiUUsGngsrvK8iUYRM2CBu+sA46WXDfqAmmhpgSRhGXv+XXa+JsBHKc1SAAAAAElFTkSuQmCC',
          acronym: 'VIT',
          players: [
            { id: 20300, name: 'Szygenda', role: 'top' },
            { id: 14985, name: 'Selfmade', role: 'jun' },
            { id: 20831, name: 'LIDER', role: 'mid' },
            { id: 1286, name: 'Crownshot', role: 'adc' },
            { id: 14980, name: 'Labrov', role: 'sup' }
          ]
        },
        {
          id: 394,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/fnc.png',
          name: 'Fnatic',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAAOElEQVQImWP4vzTu/5Sg/zNC/y+NY/g/O+z/pAAQZ3YYA0hmfiSIsyiG4f+Jiv9V9u4MDP+PlAEALi8d3KVV9dUAAAAASUVORK5CYII=',
          acronym: 'FNC',
          players: [
            { id: 32021, name: 'Adam', role: 'top' },
            { id: 1343, name: 'Bwipo', role: 'jun' },
            { id: 1284, name: 'Nisqy', role: 'mid' },
            { id: 1168, name: 'Upset', role: 'adc' },
            { id: 74, name: 'Hylissang', role: 'sup' }
          ]
        },
        {
          id: 3983,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/rge.png',
          name: 'Rogue',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAAP0lEQVQImQE0AMv/AAAAAGCAtnKV0wAAAAB6nuCSyue/9f+w5P8AqeL/eq3Kk8XcquL/AAAAAIOv6p/P/9H//5+6HYTZQ620AAAAAElFTkSuQmCC',
          acronym: 'RGE',
          players: [
            { id: 2159, name: 'Odoamne', role: 'top' },
            { id: 18036, name: 'Inspired', role: 'jun' },
            { id: 1429, name: 'Larssen', role: 'mid' },
            { id: 871, name: 'Hans sama', role: 'adc' },
            { id: 22950, name: 'Trymbi', role: 'sup' }
          ]
        },
        {
          id: 37,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/msf.png',
          name: 'Misfits Gaming',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAAP0lEQVQImQE0AMv/AJ+fn5qjo7O4uObm5gDP0tLw5uezqap5rawAXGBk/93g/eDjGT8/AAAAAPr//+76+gAAAGBTHqhG/tuUAAAAAElFTkSuQmCC',
          acronym: 'MSF',
          players: [
            { id: 21576, name: 'HiRit', role: 'top' },
            { id: 3503, name: 'Razork', role: 'jun' },
            { id: 25741, name: 'Vétheo', role: 'mid' },
            { id: 304, name: 'Kobbe', role: 'adc' },
            { id: 2161, name: 'Vander', role: 'sup' }
          ]
        },
        {
          id: 88,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/g2.png',
          name: 'G2 Esports',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAANUlEQVQImR3BsQkAMAgEwB/BvSzdvxYsJCAJwgcS8A6qymFm6O5TtdxJYo+MyEwAIHnfE5EP14Eklb30T8QAAAAASUVORK5CYII=',
          acronym: 'G2',
          players: [
            { id: 1172, name: 'Wunder', role: 'top' },
            { id: 2147, name: 'Jankos', role: 'jun' },
            { id: 1132, name: 'Caps', role: 'mid' },
            { id: 2146, name: 'Rekkles', role: 'adc' },
            { id: 605, name: 'Mikyx', role: 'sup' }
          ]
        },
        {
          id: 126536,
          logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/mad.png',
          name: 'MAD Lions',
          base64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAEJwAABCcAFu8l9tAAAAMElEQVQImR3JQQoAMAgDwfy3iuK/PUlzTbEwh4UFADHEwNaY6GsMYv7jYkJdumd1PQ6tIVMMcqZOAAAAAElFTkSuQmCC',
          acronym: 'MAD',
          players: [
            { id: 3546, name: 'Armut', role: 'top' },
            { id: 24428, name: 'Elyoya', role: 'jun' },
            { id: 17222, name: 'Humanoid', role: 'mid' },
            { id: 14972, name: 'Carzzy', role: 'adc' },
            { id: 18037, name: 'Kaiser', role: 'sup' }
          ]
        }
      ],
      status: false,
      logo: 'https://cshcnecridevmmzopztb.supabase.in/storage/v1/object/public/lec/logo.png',
      base64:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAACxLAAAsSwGlPZapAAAAH0lEQVQImWP4l+L2f0XF/80N/zc3MEAoPJx1NQwMDAB2VSBJq3zHBQAAAABJRU5ErkJggg==',
      year: 2021
    }
  })

  console.log({ defaultTournament, inactiveTournament })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
