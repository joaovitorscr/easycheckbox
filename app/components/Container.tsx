interface Container {
    children: React.ReactNode
}

export default function Container({ children }: Container) {
    return (
        <div className="m-auto max-w-[1440px]">
            {children}
        </div>
    )
}