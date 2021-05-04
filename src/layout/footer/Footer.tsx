import Link from 'next/link'

const Footer: React.FC = () => (
  <footer className="flex flex-col items-center">
    <p className="mb-3">
      <Link href="https://lolpowerranking.statuspage.io/">
        <a target="_blank">Status</a>
      </Link>
    </p>
    <p>
      Stats provided by{' '}
      <Link href="https://pandascore.co/">
        <a className="text-primary" target="_blank">
          PandaScore
        </a>
      </Link>
    </p>
  </footer>
)

export default Footer
