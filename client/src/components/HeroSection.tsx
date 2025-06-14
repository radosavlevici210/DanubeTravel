import SearchForm from "./SearchForm";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Discover the Pearl of the Danube
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 opacity-90">
          AI-powered tourism platform for unforgettable Danube River experiences
        </p>
        
        <SearchForm />
      </div>
    </section>
  );
}
