

export default function HomeLayout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <div className="h-full"></div>
            {children}
        </section>
    );
}