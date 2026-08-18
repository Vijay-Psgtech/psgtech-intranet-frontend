import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-gradient-to-r from-[#0d5ad6] via-[#0f66e8] to-[#0b4ab0] shadow-[0_-12px_30px_rgba(13,89,214,0.25)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1800px] items-center justify-center gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:px-10">
        <p className="text-sm text-white/90">
          &copy; {new Date().getFullYear()} PSG College of Technology. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer