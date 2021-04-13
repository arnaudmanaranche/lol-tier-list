import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  className?: string
  open: boolean
  closeModal: (open: boolean) => unknown
}

const Modal: React.FC<Props> = ({ children, className, open, closeModal }) => {
  return (
    <div className={clsx('hidden bg-light border-primary', className, open && 'inline')}>
      <span
        onClick={() => {
          closeModal(!open)
        }}
        className="font-bold"
      >
        &#x2715;
      </span>
      {children}
    </div>
  )
}

export default Modal
