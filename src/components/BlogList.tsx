import { useBlogs } from '@/hooks/useBlogs'
import type { Blog } from '@/types/blog'
import { BlogCard } from './BlogCard'
import { Skeleton } from './ui/skeleton'
import { AlertCircle } from 'lucide-react'

interface BlogListProps {
    selectedBlogId: string | null
    onSelectBlog: (blog: Blog) => void
}

export function BlogList({ selectedBlogId, onSelectBlog }: BlogListProps) {
    const { data: blogs, isLoading, error } = useBlogs()

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-semibold mb-2">Failed to load blogs</h3>
                <p className="text-sm text-muted-foreground">
                    {error instanceof Error ? error.message : 'An error occurred'}
                </p>
            </div>
        )
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-muted-foreground">No blogs found</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    isSelected={selectedBlogId === blog.id}
                    onClick={() => onSelectBlog(blog)}
                />
            ))}
        </div>
    )
}
