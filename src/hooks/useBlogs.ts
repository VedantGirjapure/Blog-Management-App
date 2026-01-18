import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blogApi } from '@/api/blog'
import type { CreateBlogInput } from '@/types/blog'

// Query keys
const blogKeys = {
    all: ['blogs'] as const,
    lists: () => [...blogKeys.all, 'list'] as const,
    list: (filters: string) => [...blogKeys.lists(), { filters }] as const,
    details: () => [...blogKeys.all, 'detail'] as const,
    detail: (id: string) => [...blogKeys.details(), id] as const,
}

// Get all blogs hook
export const useBlogs = () => {
    return useQuery({
        queryKey: blogKeys.lists(),
        queryFn: blogApi.getAllBlogs,
    })
}

// Get blog by ID hook
export const useBlog = (id: string | null) => {
    return useQuery({
        queryKey: blogKeys.detail(id || ''),
        queryFn: () => blogApi.getBlogById(id || ''),
        enabled: !!id,
    })
}

// Create blog mutation hook
export const useCreateBlog = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (blog: CreateBlogInput) => blogApi.createBlog(blog),
        onSuccess: () => {
            // Invalidate and refetch blogs list
            queryClient.invalidateQueries({ queryKey: blogKeys.lists() })
        },
    })
}

// Delete blog mutation hook
export const useDeleteBlog = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => blogApi.deleteBlog(id),
        onSuccess: () => {
            // Invalidate and refetch blogs list and details
            queryClient.invalidateQueries({ queryKey: blogKeys.lists() })
            queryClient.invalidateQueries({ queryKey: blogKeys.details() })
        },
    })
}
