type Props = {
  className?: string
  children?: React.ReactNode
}

const Error: React.FC<Props> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

export default Error
