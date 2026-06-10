import { Sun, Moon, Monitor, Bell, Kanban } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useData } from '@/context/DataContext'
import { useToast } from '@/context/ToastContext'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/cn'
import type { Theme } from '@/types'

export function Settings() {
  const { theme, setTheme } = useApp()
  const { settings, updateSettings, brokers } = useData()
  const { toast } = useToast()

  const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: 'dark', label: 'Escuro', icon: Moon },
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'system', label: 'Sistema', icon: Monitor },
  ]

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    })
    toast('Preferência atualizada')
  }

  const togglePipeline = (key: keyof typeof settings.pipeline) => {
    updateSettings({
      pipeline: {
        ...settings.pipeline,
        [key]: !settings.pipeline[key],
      },
    })
    toast('Preferência atualizada')
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-horizon-50">Configurações</h1>
        <p className="mt-1 text-horizon-400">Personalize sua experiência no Horizonte</p>
      </div>

      <section className="rounded-xl border border-horizon-700 bg-surface p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold text-horizon-100">Perfil</h2>
        <div className="mt-4 flex items-center gap-4">
          <Avatar name="Ana Costa" size="lg" />
          <div>
            <p className="font-medium text-horizon-100">Ana Costa</p>
            <p className="text-sm text-horizon-400">ana@horizonte.com.br</p>
            <p className="text-xs text-horizon-500 mt-0.5">Corretora · Horizonte Pinheiros</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-horizon-700 bg-surface p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Sun className="size-4 text-horizon-400" />
          <h2 className="font-display text-lg font-semibold text-horizon-100">Aparência</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map((opt) => {
            const Icon = opt.icon
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all',
                  theme === opt.value
                    ? 'border-accent bg-accent-muted text-accent'
                    : 'border-horizon-700 text-horizon-400 hover:border-horizon-600',
                )}
              >
                <Icon className="size-5" />
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="rounded-xl border border-horizon-700 bg-surface p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="size-4 text-horizon-400" />
          <h2 className="font-display text-lg font-semibold text-horizon-100">Notificações</h2>
        </div>
        <div className="space-y-3">
          <ToggleRow
            label="Novos leads"
            description="Receber alerta quando um novo lead entrar"
            checked={settings.notifications.newLeads}
            onChange={() => toggleNotification('newLeads')}
          />
          <ToggleRow
            label="Lembretes de visita"
            description="Notificação 1h antes de cada visita"
            checked={settings.notifications.visitReminders}
            onChange={() => toggleNotification('visitReminders')}
          />
          <ToggleRow
            label="Atualizações de negócio"
            description="Propostas e mudanças de estágio"
            checked={settings.notifications.dealUpdates}
            onChange={() => toggleNotification('dealUpdates')}
          />
        </div>
      </section>

      <section className="rounded-xl border border-horizon-700 bg-surface p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Kanban className="size-4 text-horizon-400" />
          <h2 className="font-display text-lg font-semibold text-horizon-100">Funil</h2>
        </div>
        <div className="space-y-3">
          <ToggleRow
            label="Atribuição automática"
            description="Distribuir novos leads entre corretores"
            checked={settings.pipeline.autoAssign}
            onChange={() => togglePipeline('autoAssign')}
          />
          <ToggleRow
            label="Exibir valores no funil"
            description="Mostrar R$ total por coluna"
            checked={settings.pipeline.showValue}
            onChange={() => togglePipeline('showValue')}
          />
        </div>
      </section>

      <section className="rounded-xl border border-horizon-700 bg-surface p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold text-horizon-100">Equipe</h2>
        <ul className="mt-4 space-y-3">
          {brokers.map((broker) => (
            <li key={broker.id} className="flex items-center gap-3 rounded-lg bg-horizon-800/50 p-3">
              <Avatar name={broker.name} />
              <div>
                <p className="text-sm font-medium text-horizon-100">{broker.name}</p>
                <p className="text-xs text-horizon-400">{broker.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-horizon-800/30 p-4">
      <div>
        <p className="text-sm font-medium text-horizon-100">{label}</p>
        <p className="text-xs text-horizon-400">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors shrink-0',
          checked ? 'bg-accent' : 'bg-horizon-600',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform',
            checked && 'translate-x-5',
          )}
        />
      </button>
    </div>
  )
}
