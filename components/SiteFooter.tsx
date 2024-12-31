
export function SiteFooter() {
    return (
        <footer className="py-2 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{" "}
                    <a
                        href={"google.com"}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Kiel Mitchell
                    </a>
                    . The source code is available on{" "}
                    <a
                        href={"google.com"}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}