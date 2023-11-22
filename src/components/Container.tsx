interface ContainerProps {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className="m-auto max-w-[1440px]">{children}</div>
}
