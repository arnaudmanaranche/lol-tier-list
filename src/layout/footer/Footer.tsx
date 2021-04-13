import Link from 'next/link'

const Footer: React.FC = () => (
  <footer className="flex items-center justify-center h-20">
    <p>
      Stats provided by{' '}
      <Link href="https://pandascore.co/">
        <a className="text-primary">PandaScore</a>
      </Link>
    </p>
  </footer>
)

export default Footer
