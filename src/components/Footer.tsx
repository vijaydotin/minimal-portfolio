import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/50 py-8">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-[12px] text-neutral-500">
              © {new Date().getFullYear()} {personalInfo.fullName}
            </span>
            <span className="hidden md:inline text-neutral-700">·</span>
            <span className="text-[12px] text-neutral-600 font-light">
              Designed & built with care.
            </span>
          </div>

          <div className="flex items-center gap-5">
            {[
              { href: personalInfo.github, label: "GitHub" },
              { href: personalInfo.linkedin, label: "LinkedIn" },
              { href: `mailto:${personalInfo.email}`, label: "Email" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                className="text-[11px] text-neutral-600 hover:text-neutral-300 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
