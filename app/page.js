export default function ComingSoon() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-flame-dark selection:bg-flame-gold selection:text-flame-dark">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,137,47,0.05),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-flame-dark/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop"
          alt="Dark Japanese food background"
          className="w-full h-full object-cover opacity-20"
        />
        {/* Subtle top/bottom fading */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-flame-dark to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-flame-dark to-transparent z-10"></div>
      </div>

      {/* Header with Logo */}
      <header className="relative z-20 w-full py-8 px-6 md:px-12 flex justify-center md:justify-start">
        <div className="flex flex-col items-center md:items-start group cursor-default">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-flame-green text-2xl md:text-3xl lg:text-4xl pb-1 md:pb-2 tracking-tighter">
              🔥
            </span>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest text-flame-light uppercase transition-all duration-300">
              Flame
            </h1>
          </div>
          <p className="text-flame-gold font-sans text-[0.6rem] md:text-xs tracking-[0.25em] md:tracking-[0.3em] font-bold uppercase mt-1 pl-1 md:pl-2">
            Japanese Hibachi
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 sm:px-6 flex-1 -mt-10 md:mt-0">
        <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center space-y-2 md:space-y-4">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-flame-light tracking-widest uppercase mb-1 md:mb-2 drop-shadow-lg">
            Coming
          </h2>

          <div className="relative">
            {/* The outline layer */}
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-flame-gold tracking-widest uppercase italic transform -skew-x-6 drop-shadow-[0_0_15px_rgba(210,162,44,0.3)]">
              Soon
            </h2>
            <h2 className="absolute top-0 left-0 font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-stroke-gold tracking-widest uppercase italic transform -skew-x-6 translate-x-1 translate-y-1 opacity-50 blur-[1px]">
              Soon
            </h2>
          </div>

          <div className="w-16 sm:w-24 md:w-32 h-0.5 md:h-1 bg-flame-green mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-8 md:mb-10 shadow-[0_0_8px_rgba(59,137,47,0.8)]"></div>

          <p className="font-sans text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide max-w-lg md:max-w-2xl mx-auto leading-relaxed md:leading-loose">
            Experience the ultimate taste of Japanese hibachi right where you
            are.
            <span className="block mt-2 text-white font-medium italic">
              Flavor by design.
            </span>
          </p>

          <div className="mt-10 sm:mt-12 md:mt-16 w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:shadow-2xl">
              <input
                type="email"
                placeholder="Enter your email to join the waitlist..."
                className="w-full bg-[#1A1F1A]/90 border border-gray-800 sm:border-r-0 text-white px-5 sm:px-6 py-4 rounded sm:rounded-r-none focus:outline-none focus:border-flame-gold focus:ring-1 focus:ring-flame-gold transition-all font-sans text-sm md:text-base placeholder-gray-500 backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                className="bg-flame-green hover:bg-[#347A29] text-white font-bold px-6 sm:px-8 py-4 rounded sm:rounded-l-none uppercase tracking-widest text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(59,137,47,0.2)] hover:shadow-[0_0_25px_rgba(59,137,47,0.4)] whitespace-nowrap active:scale-[0.98]"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 w-full py-8 text-center bg-flame-dark/50 backdrop-blur-sm border-t border-white/5 mt-auto">
        <p className="text-gray-500 text-[10px] sm:text-xs font-sans tracking-[0.2em] font-medium uppercase">
          © {new Date().getFullYear()} Flame Japanese Hibachi. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
