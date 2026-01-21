import React from 'react'

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative w-7 h-7">
        <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-black animate-spin"></div>
      </div>
      {/* <p className="text-black text-lg font-medium">Loading...</p> */}
    </div>
  )
}

export default Loader