import type { Blog, CreateBlogInput } from '@/types/blog'

const API_BASE_URL = 'http://localhost:3001'

export const blogApi = {
    // Get all blogs
    getAllBlogs: async (): Promise<Blog[]> => {
        const response = await fetch(`${API_BASE_URL}/blogs`)
        if (!response.ok) {
            throw new Error('Failed to fetch blogs')
        }
        return response.json()
    },

    // Get blog by ID
    getBlogById: async (id: string): Promise<Blog> => {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch blog with id ${id}`)
        }
        return response.json()
    },

    // Create a new blog
    createBlog: async (blog: CreateBlogInput): Promise<Blog> => {
        const response = await fetch(`${API_BASE_URL}/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...blog,
                id: Date.now().toString(),
                date: new Date().toISOString(),
            }),
        })
        if (!response.ok) {
            throw new Error('Failed to create blog')
        }
        return response.json()
    },

    // Delete a blog
    deleteBlog: async (id: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
            method: 'DELETE',
        })
        if (!response.ok) {
            throw new Error('Failed to delete blog')
        }
    },
}
