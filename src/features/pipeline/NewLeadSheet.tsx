import { useState } from 'react'
import { useData } from '@/context/DataContext'
import { useToast } from '@/context/ToastContext'
import { Sheet } from '@/components/ui/Sheet'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import type { LeadSource, LeadTemperature } from '@/types'

interface NewLeadSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewLeadSheet({ open, onOpenChange }: NewLeadSheetProps) {
  const { addLead, properties, brokers } = useData()
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [source, setSource] = useState<LeadSource>('site')
  const [temperature, setTemperature] = useState<LeadTemperature>('morno')
  const [propertyId, setPropertyId] = useState('')
  const [brokerId, setBrokerId] = useState(brokers[0]?.id ?? '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return

    const property = properties.find((p) => p.id === propertyId)
    addLead({
      name,
      email,
      phone,
      stage: 'contato',
      temperature,
      source,
      propertyId: propertyId || undefined,
      brokerId,
      value: property?.price ?? 0,
      notes: '',
    })
    toast('Lead cadastrado com sucesso')
    onOpenChange(false)
    setName('')
    setEmail('')
    setPhone('')
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title="Novo lead"
      description="Cadastre um novo contato no funil"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <Select
          label="Origem"
          value={source}
          onValueChange={(v) => setSource(v as LeadSource)}
          options={[
            { value: 'site', label: 'Site' },
            { value: 'portal', label: 'Portal' },
            { value: 'indicacao', label: 'Indicação' },
            { value: 'instagram', label: 'Instagram' },
            { value: 'whatsapp', label: 'WhatsApp' },
          ]}
        />
        <Select
          label="Temperatura"
          value={temperature}
          onValueChange={(v) => setTemperature(v as LeadTemperature)}
          options={[
            { value: 'quente', label: 'Quente' },
            { value: 'morno', label: 'Morno' },
            { value: 'frio', label: 'Frio' },
          ]}
        />
        <Select
          label="Imóvel de interesse"
          value={propertyId}
          onValueChange={setPropertyId}
          placeholder="Opcional"
          options={properties.map((p) => ({
            value: p.id,
            label: `${p.neighborhood} — ${p.title}`,
          }))}
        />
        <Select
          label="Corretor"
          value={brokerId}
          onValueChange={setBrokerId}
          options={brokers.map((b) => ({ value: b.id, label: b.name }))}
        />
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" className="flex-1">Cadastrar</Button>
        </div>
      </form>
    </Sheet>
  )
}
