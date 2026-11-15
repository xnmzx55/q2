import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: "Home" },
    { href: "/units", label: "Units" },
    { href: "/about", label: "About" },
  ];
  return (
    <header className="topbar">
      <div className="container nav-inner">
        <Link href="/" className="brand" data-testid="link-brand">
          <span className="brand-mark"><GraduationCap size={25} strokeWidth={2.2} /></span>
          <span className="brand-name">English Vocabulary<small>Learn a little every day</small></span>
        </Link>
        <button className="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-links${open ? " open" : ""}`} aria-label="Main navigation">
          {links.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`nav-link${location === item.href || (item.href === "/units" && location.startsWith("/units/")) ? " active" : ""}`} data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </Link>
          ))}
          <Link href="/units" onClick={() => setOpen(false)} className="nav-grade" data-testid="link-grade-nine">Grade 9</Link>
        </nav>
      </div>
    </header>
  );
}
