import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  ChevronDown,
  Keyboard,
  Mail,
  MessageCircle,
  Phone,
  Search,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'
import { cn } from '@/lib/cn'

const categories = [
  {
    title: 'Primeiros passos',
    articles: [
      {
        q: 'Como cadastrar um novo imóvel?',
        a: 'Acesse Imóveis no menu e clique em Cadastrar. Preencha endereço, bairro, preço e dados do corretor responsável. O imóvel entra no portfólio como ativo.',
      },
      {
        q: 'Como mover um lead no funil?',
        a: 'Na página Funil, arraste o card do lead entre as colunas (Novo contato → Visita → Proposta → Fechado). O valor do pipeline é atualizado automaticamente.',
      },
      {
        q: 'Como agendar uma visita?',
        a: 'Vá em Visitas, selecione o dia na agenda semanal e use o painel do lead para confirmar horário, imóvel e corretor.',
      },
    ],
  },
  {
    title: 'Pipeline e leads',
    articles: [
      {
        q: 'O que significa lead quente, morno ou frio?',
        a: 'É a temperatura de intenção de compra. Leads quentes têm alta probabilidade de fechamento; frios estão em fase de pesquisa. Use os filtros em Leads para priorizar.',
      },
      {
        q: 'Como filtrar leads sem contato?',
        a: 'Em Leads, use o filtro rápido "Sem contato 7d" para ver contatos que precisam de follow-up.',
      },
    ],
  },
  {
    title: 'Conta e preferências',
    articles: [
      {
        q: 'Como alternar tema claro/escuro?',
        a: 'Clique no ícone de sol/lua no topo ou vá em Configurações → Aparência.',
      },
      {
        q: 'Como trocar de filial?',
        a: 'No topo, ao lado da marca Horizonte, selecione a unidade desejada no seletor de filial.',
      },
    ],
  },
]

const shortcuts = [
  { keys: '⌘ K', action: 'Abrir busca rápida' },
  { keys: 'Esc', action: 'Fechar painéis e modais' },
]

export function HelpCenter() {
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>('0-0')
  const { toast } = useToast()

  const filtered = categories
    .map((cat) => ({
      ...cat,
      articles: cat.articles.filter(
        (a) =>
          !query ||
          a.q.toLowerCase().includes(query.toLowerCase()) ||
          a.a.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.articles.length > 0)

  return (
    <div className="space-y-10 max-w-3xl">
      <PageHeader
        overline="Suporte"
        title="Central de Ajuda"
        description="Encontre respostas, atalhos e canais de contato com a equipe Horizonte."
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-horizon-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar na central de ajuda..."
          className="w-full rounded-xl border border-horizon-700 bg-horizon-900 py-3 pl-10 pr-4 text-sm text-horizon-100 placeholder:text-horizon-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <ContactCard
          icon={MessageCircle}
          title="Chat ao vivo"
          description="Seg–Sex, 9h–18h"
          action="Iniciar chat"
          onClick={() => toast('Chat disponível em breve', 'info')}
        />
        <ContactCard
          icon={Mail}
          title="E-mail"
          description="suporte@horizonte.com.br"
          action="Enviar e-mail"
          onClick={() => window.open('mailto:suporte@horizonte.com.br')}
        />
        <ContactCard
          icon={Phone}
          title="Telefone"
          description="(11) 4000-0000"
          action="Ligar"
          onClick={() => toast('Ligação simulada no mockup', 'info')}
        />
      </div>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="size-4 text-accent" />
          <h2 className="font-display text-xl font-semibold text-horizon-50">Perguntas frequentes</h2>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-horizon-500 py-8">Nenhum resultado para &ldquo;{query}&rdquo;</p>
        ) : (
          <div className="space-y-8">
            {filtered.map((cat, ci) => (
              <div key={cat.title}>
                <h3 className="text-xs uppercase tracking-wider text-horizon-500 mb-3">{cat.title}</h3>
                <div className="border border-horizon-800 rounded-2xl overflow-hidden divide-y divide-horizon-800">
                  {cat.articles.map((article, ai) => {
                    const id = `${ci}-${ai}`
                    const isOpen = openId === id
                    return (
                      <div key={id}>
                        <button
                          onClick={() => setOpenId(isOpen ? null : id)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-horizon-900/50 transition-colors"
                        >
                          <span className="text-sm font-medium text-horizon-100">{article.q}</span>
                          <ChevronDown
                            className={cn(
                              'size-4 shrink-0 text-horizon-500 transition-transform',
                              isOpen && 'rotate-180',
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-4 text-sm text-horizon-400 leading-relaxed">
                                {article.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="border border-horizon-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Keyboard className="size-4 text-accent" />
          <h2 className="font-display text-lg font-semibold text-horizon-50">Atalhos de teclado</h2>
        </div>
        <ul className="space-y-3">
          {shortcuts.map((s) => (
            <li key={s.keys} className="flex items-center justify-between text-sm">
              <span className="text-horizon-400">{s.action}</span>
              <kbd className="rounded border border-horizon-700 bg-horizon-900 px-2 py-1 text-xs font-mono text-horizon-300">
                {s.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function ContactCard({
  icon: Icon,
  title,
  description,
  action,
  onClick,
}: {
  icon: typeof Mail
  title: string
  description: string
  action: string
  onClick: () => void
}) {
  return (
    <div className="border border-horizon-800 rounded-2xl p-4 flex flex-col">
      <Icon className="size-5 text-accent mb-3" />
      <p className="font-medium text-sm text-horizon-100">{title}</p>
      <p className="text-xs text-horizon-500 mt-1 flex-1">{description}</p>
      <Button variant="ghost" size="sm" className="mt-3 self-start px-0" onClick={onClick}>
        {action}
      </Button>
    </div>
  )
}
