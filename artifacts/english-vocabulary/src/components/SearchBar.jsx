import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { Link } from "wouter";
import { vocabularyEntries } from "../data/vocabulary";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return [];
    return vocabularyEntries.filter((entry) =>
      [entry.english, entry.arabic, entry.topic, entry.topicArabic, entry.unitName, `unit ${entry.unitNumber}`, `unit ${entry.unitId}`]
        .some((text) => text.toLocaleLowerCase().includes(needle)),
    );
  }, [query]);

  return (
    <section className="search-section" aria-label="Vocabulary search">
      <div className="container search-wrap">
        <h2 className="search-heading">Find a word, find your way</h2>
        <p className="search-hint">Search in English or Arabic — even a small part is enough.</p>
        <div className="searchbox">
          <Search className="searchbox-icon" size={20} />
          <input
            className="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “confident” or “واثق بنفسه”"
            aria-label="Search vocabulary in English or Arabic"
            data-testid="input-vocabulary-search"
          />
          {query && <button className="search-clear" type="button" onClick={() => setQuery("")} aria-label="Clear search" data-testid="button-clear-search"><X size={19} /></button>}
        </div>
        {query && (
          results.length ? (
            <div className="search-results" aria-live="polite" data-testid="search-results">
              {results.map((entry, index) => (
                <Link key={`${entry.unitId}-${entry.english}-${index}`} href={`/units/${entry.unitId}`} className="search-result" data-testid={`search-result-${entry.unitId}-${index}`}>
                  <span>
                    <span className="result-word">{entry.english}</span>
                    <span className="result-meaning" lang="ar" dir="rtl">{entry.arabic}</span>
                  </span>
                  <span className="result-unit">UNIT {entry.unitNumber} · {entry.unitName} <ArrowRight size={13} /></span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-search" aria-live="polite" data-testid="search-empty">No matching words yet. Try another English or Arabic word.</div>
          )
        )}
      </div>
    </section>
  );
}
