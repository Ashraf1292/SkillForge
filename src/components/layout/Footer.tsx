import { GraduationCap, Mail, Github, Twitter, Linkedin, ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-black border-t border-slate-800 overflow-hidden">
      {/* Background*/}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMjQsIDU4LCAyMzcsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      
      {/* Gradient elements*/}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SkillForge
              </span>
            </a>
            
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Empowering learners worldwide with quality video-based courses. 
              Master new skills and transform your career with expert-led content.
            </p>

            {/* Links */}
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>


          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Platform</h3>
            <ul className="space-y-4">
              <li>
                <a href="/courses" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Browse Courses
                </a>
              </li>
              <li>
                <a href="/create-course" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Teach on SkillForge
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Pricing
                </a>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Blog
                </a>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Legal</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} SkillForge. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 hover:scale-105"
          >
            <span className="text-sm font-medium">Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};