import Link from 'next/link'

const Footer: React.FC = () => (
  <footer className="flex flex-col items-center py-5 header-shadow">
    <div className="flex">
      <p className="mb-3 mr-3">
        <Link href="https://lolpowerranking.statuspage.io/">
          <a target="_blank">Status</a>
        </Link>
      </p>
      <p className="mb-3">
        <Link href="/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
      </p>
    </div>
    <p>
      Stats provided by{' '}
      <Link href="https://pandascore.co/">
        <a className="text-primary" target="_blank" rel="noreferrer noopener">
          PandaScore
        </a>
      </Link>
    </p>
  </footer>
)

export default Footer
