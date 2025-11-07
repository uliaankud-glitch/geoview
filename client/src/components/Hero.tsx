import heroImage from "@assets/generated_images/River_delta_from_orbit_dc4f1993.png";

export function Hero() {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Exploring Earth Through Data
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-200 sm:text-xl md:text-2xl">
          Discover fascinating stories about geocomputation, remote sensing, and their connections to history, economics, and society
        </p>
      </div>
    </div>
  );
}
