import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProfileSection } from "./components/ProfileSection";
import { AboutSection } from "./components/AboutSection";
import { CareerSection } from "./components/CareerSection";
import { ArticlesSection } from "./components/ArticlesSection";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 text-lg">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20">
        <ProfileSection />
        <AboutSection />
        <CareerSection />
        <ArticlesSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
