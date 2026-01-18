import { BookOpen } from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t bg-slate-950/95 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* CA MONK Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="font-bold text-xl text-white">CA MONK</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Empowering the next generation of chartered accountants with knowledge, insights, and career growth opportunities.
                        </p>
                    </div>

                    {/* RESOURCES Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200">Resources</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors inline-flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">Blog</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors inline-flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">Guides</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors inline-flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">FAQ</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* POLICIES Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200">Policies</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors inline-flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors inline-flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">Terms</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors inline-flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">Disclaimer</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* COMPANY Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-200">Company</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors inline-flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">About</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors inline-flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">Career</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors inline-flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                    <p>© {currentYear} CA Monk. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <span className="text-slate-600">•</span>
                        <a href="#" className="hover:text-white transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
