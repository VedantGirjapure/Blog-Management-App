import type { Blog } from '@/types/blog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogCardProps {
    blog: Blog
    isSelected: boolean
    onClick: () => void
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date)
    }

    const categoryColors: Record<string, string> = {
        FINANCE: 'bg-blue-100 text-blue-700 border-blue-200',
        TECH: 'bg-purple-100 text-purple-700 border-purple-200',
        CAREER: 'bg-green-100 text-green-700 border-green-200',
        EDUCATION: 'bg-orange-100 text-orange-700 border-orange-200',
        REGULATIONS: 'bg-red-100 text-red-700 border-red-200',
        LIFESTYLE: 'bg-pink-100 text-pink-700 border-pink-200',
    }

    return (
        <Card
            className={cn(
                "group cursor-pointer transition-all duration-300 hover-lift border-2",
                isSelected
                    ? "ring-2 ring-primary shadow-primary border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5"
                    : "hover:border-primary/30 hover:shadow-lg"
            )}
            onClick={onClick}
        >
            <CardHeader className="space-y-3 pb-3">
                <div className="flex flex-wrap gap-2">
                    {blog.category.map((cat) => (
                        <Badge
                            key={cat}
                            className={cn(
                                "text-xs font-medium border",
                                categoryColors[cat] || "bg-gray-100 text-gray-700 border-gray-200"
                            )}
                        >
                            {cat}
                        </Badge>
                    ))}
                </div>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">
                    {blog.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1.5 h-3.5 w-3.5" />
                        {formatDate(blog.date)}
                    </div>
                    <ArrowRight className={cn(
                        "h-4 w-4 transition-all",
                        isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary group-hover:translate-x-1"
                    )} />
                </div>
            </CardContent>
        </Card>
    )
}
