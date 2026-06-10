const links = [
  { label: '@caaiio.dev', href: 'https://instagram.com/caaiio.dev' },
  { label: 'github.com/caiorissa', href: 'https://github.com/caiorissa' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/caio-rissa-silveira-b4706527a/' },
]

export function Footer() {
  return (
    <footer className="border-t border-horizon-800 bg-horizon-950 px-4 md:px-8 py-6 pb-28 md:pb-6">
      <div className="mx-auto max-w-[1280px] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-horizon-500 text-center sm:text-left">
          Desenvolvido por{' '}
          <span className="font-medium text-horizon-300">Caio Rissa Silveira</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-horizon-500 hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
