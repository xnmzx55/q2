import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { SearchBar } from "@/components/SearchBar";
import { UnitCard } from "@/components/UnitCard";
import { WordCard } from "@/components/WordCard";
import { units } from "@/data/vocabulary";
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

const USE_HASH_ROUTER = import.meta.env.VITE_HASH_ROUTER === "1";

const queryClient = new QueryClient();

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>English Vocabulary · Grade 9</span>
        <span>Learn a little. Remember a lot.</span>
      </div>
    </footer>
  );
}

function UnitCollection({ compact = false }) {
  return (
    <section className={`container ${compact ? "collection-section" : "section"}`} id="units">
      <div className="section-top">
        <div>
          <p className="section-kicker">Your learning path</p>
          <h2 className="section-title">Three units, lots to discover</h2>
          <p className="section-desc">Choose a unit and explore its words by topic, with Arabic meanings beside every English word.</p>
        </div>
        {compact && <span className="text-link">Grade 9 collection <ArrowRight size={16} /></span>}
      </div>
      <div className="unit-grid">
        {units.map((unit) => <UnitCard key={unit.id} unit={unit} />)}
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <section className="container logo-banner">
        <img src={`${import.meta.env.BASE_URL}images/logo.jpg`} alt="English Words – Learn, Explore, Remember" data-testid="img-logo" />
      </section>
      <Hero />
      <SearchBar />
      <UnitCollection />
    </>
  );
}

function UnitsPage() {
  return (
    <main>
      <section className="container page-heading">
        <div className="breadcrumbs"><span>Home</span><ArrowRight size={13} /><span>Units</span></div>
        <p className="section-kicker">Grade 9 vocabulary</p>
        <h1 className="page-title">Choose your next chapter.</h1>
        <p className="page-lead">Every unit is arranged into simple topic groups, so you can find the right words and practise at your own pace.</p>
      </section>
      <SearchBar />
      <UnitCollection compact />
    </main>
  );
}

function UnitDetailPage() {
  const { unitId } = useParams();
  const unit = units.find((item) => item.id === unitId);
  if (!unit) {
    return (
      <main className="container not-found">
        <h1>That unit isn’t here.</h1>
        <p>Choose one of the Grade 9 units to keep learning.</p>
        <Link className="button-primary" href="/units">Back to units <ArrowRight size={16} /></Link>
      </main>
    );
  }
  const total = unit.topics.reduce((sum, topic) => sum + topic.words.length, 0);
  return (
    <main>
      <section className="container detail-top">
        <Link href="/units" className="back-button" data-testid="button-back-to-units"><ArrowLeft size={17} /> Back to units</Link>
        <div className="detail-banner" data-unit={unit.id}>
          <span className="detail-icon"><BookOpen size={30} /></span>
          <div>
            <p className="detail-overline">Unit {unit.number}</p>
            <h1 className="detail-title">{unit.name}</h1>
          </div>
          <span className="detail-count">{total} words · {unit.topics.length} topics</span>
        </div>
      </section>
      <SearchBar />
      <section className="container" aria-label={`${unit.name} vocabulary`}>
        {unit.topics.map((topic, topicIndex) => (
          <section className="topic-section" key={topic.name}>
            <div className="topic-heading">
              <span className="topic-marker" />
              <h2 className="topic-name">{topic.name}</h2>
              <span className="topic-arabic" lang="ar" dir="rtl">— {topic.arabic}</span>
            </div>
            <div className="word-grid">
              {topic.words.map(([english, arabic], wordIndex) => (
                <WordCard key={`${unit.id}-${topicIndex}-${wordIndex}`} id={`${unit.id}-${topicIndex}-${wordIndex}`} english={english} arabic={arabic} />
              ))}
            </div>
          </section>
        ))}
      </section>
      <div className="container" style={{ padding: "30px 0 65px" }}>
        <Link href="/units" className="text-link" data-testid="link-all-units">Browse all units <ArrowRight size={16} /></Link>
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main>
      <section className="container page-heading">
        <div className="breadcrumbs"><span>Home</span><ArrowRight size={13} /><span>About</span></div>
        <p className="section-kicker">Made for curious learners</p>
        <h1 className="page-title">Words open new worlds.</h1>
        <p className="page-lead">English Vocabulary – Grade 9 is a learning platform that helps Grade 9 students learn and remember English vocabulary by organising words and their meanings by units and topics.</p>
      </section>
      <section className="container about-section">
        <div className="about-note">
          <strong>English Vocabulary – Grade 9</strong>
          <span lang="ar" dir="rtl">منصة تعليمية تساعد طلاب الصف التاسع على تعلم مفردات اللغة الإنجليزية وحفظها من خلال تنظيم الكلمات ومعانيها حسب الوحدات والموضوعات.</span>
        </div>
      </section>
      <SearchBar />
      <UnitCollection compact />
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="container not-found">
      <Sparkles size={35} color="#d9876b" />
      <h1>Let’s find another word.</h1>
      <p>This page isn’t part of the learning path.</p>
      <Link className="button-primary" href="/">Go to the home page <ArrowRight size={16} /></Link>
    </main>
  );
}

function Router() {
  return (
    <div className="site-shell">
      <Navigation />
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/units" component={UnitsPage} />
          <Route path="/units/:unitId" component={UnitDetailPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </RoutedErrorBoundary>
      <Footer />
    </div>
  );
}

function RoutedErrorBoundary({ children }) {
  const [location] = useLocation();
  useEffect(() => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  }, [location]);
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter {...(USE_HASH_ROUTER ? { hook: useHashLocation } : { base: import.meta.env.BASE_URL.replace(/\/$/, "") })}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
