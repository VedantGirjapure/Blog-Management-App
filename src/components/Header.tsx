import { Button } from './ui/button'
import { PlusCircle, BookOpen } from 'lucide-react'

interface HeaderProps {
    onCreateClick: () => void
}

export function Header({ onCreateClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
            <div className="container flex h-20 items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg blur opacity-75"></div>
                        <div className="relative bg-gradient-to-br from-primary to-accent p-2.5 rounded-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold gradient-text">CA Monk</h1>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                            Blog Platform
                        </p>
                    </div>
                </div>

                <nav className="flex items-center gap-4">
                    <Button
                        onClick={onCreateClick}
                        className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-primary"
                        size="lg"
                    >
                        <PlusCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Create Article</span>
                        <span className="sm:hidden">New</span>
                    </Button>
                </nav>
            </div>
        </header>
    )
}
