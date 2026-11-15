import { ArrowRight, BookOpen, Cpu, UsersRound } from "lucide-react";
import { Link } from "wouter";

const icons = { identity: BookOpen, connections: UsersRound, future: Cpu };

export function UnitCard({ unit }) {
  const Icon = icons[unit.icon] || BookOpen;
  const count = unit.topics.reduce((sum, topic) => sum + topic.words.length, 0);
  return (
    <Link href={`/units/${unit.id}`} className="unit-card" data-testid={`card-unit-${unit.id}`}>
      <div className="unit-card-head">
        <span className="unit-symbol"><Icon size={24} strokeWidth={1.9} /></span>
        <span className="unit-number">UNIT {unit.number}</span>
      </div>
      <h3 className="unit-title">{unit.name}</h3>
      <p className="unit-description">{unit.description}</p>
      <div className="unit-foot">
        <span>Explore {count} words</span>
        <span className="unit-arrow"><ArrowRight size={17} /></span>
      </div>
    </Link>
  );
}
