const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-[4.5vw] py-4 max-sm:justify-center max-sm:px-4">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} PSG College of Technology. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer