import Image from "next/image";

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "Visionary leader with 10+ years in digital transformation.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Sarah Chen",
    role: "Head of Design",
    bio: "Award-winning designer obsessed with pixel-perfect interfaces.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Marcus Johnson",
    role: "Lead Engineer",
    bio: "Full-stack expert specializing in scalable architectures.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Emily Taylor",
    role: "Product Manager",
    bio: "Data-driven strategist ensuring we build the right things.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400"
  }
];

export function AboutUsGrid() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center mb-16">
          <h2 className="text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl">Meet our team</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {team.map((person) => (
            <li key={person.name} className="flex flex-col items-center text-center">
              <div className="relative h-48 w-48 rounded-full overflow-hidden mb-6 border-4 border-card shadow-lg">
                {/* Fallback color while loading */}
                <div className="absolute inset-0 bg-muted animate-pulse" />
                <img
                  className="relative h-full w-full object-cover"
                  src={person.imageUrl}
                  alt={person.name}
                />
              </div>
              <h3 className="text-lg font-semibold leading-7 tracking-tight text-foreground">{person.name}</h3>
              <p className="text-sm font-semibold leading-6 text-accent mb-2">{person.role}</p>
              <p className="text-sm leading-6 text-muted-foreground">{person.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
