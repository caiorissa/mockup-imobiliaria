import { useState } from 'react'
import { useData } from '@/context/DataContext'
import { useToast } from '@/context/ToastContext'
import { neighborhoods } from '@/data/mock/neighborhoods'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import type { PropertyStatus, PropertyType } from '@/types'

interface PropertyFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function PropertyForm({ onSuccess, onCancel }: PropertyFormProps) {
  const { addProperty, brokers } = useData()
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [neighborhood, setNeighborhood] = useState<string>(neighborhoods[0])
  const [type, setType] = useState<PropertyType>('apartamento')
  const [price, setPrice] = useState('')
  const [area, setArea] = useState('')
  const [bedrooms, setBedrooms] = useState('2')
  const [brokerId, setBrokerId] = useState(brokers[0]?.id ?? '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addProperty({
      title,
      address,
      neighborhood,
      city: 'São Paulo',
      type,
      status: 'ativo' as PropertyStatus,
      price: Number(price),
      area: Number(area),
      bedrooms: Number(bedrooms),
      bathrooms: Math.max(1, Math.floor(Number(bedrooms) / 2)),
      parking: 1,
      brokerId,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      featured: false,
    })
    toast('Imóvel cadastrado com sucesso')
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <Input label="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input label="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <Select
        label="Bairro"
        value={neighborhood}
        onValueChange={setNeighborhood}
        options={neighborhoods.map((n) => ({ value: n, label: n }))}
      />
      <Select
        label="Tipo"
        value={type}
        onValueChange={(v) => setType(v as PropertyType)}
        options={[
          { value: 'apartamento', label: 'Apartamento' },
          { value: 'casa', label: 'Casa' },
          { value: 'cobertura', label: 'Cobertura' },
          { value: 'studio', label: 'Studio' },
          { value: 'comercial', label: 'Comercial' },
        ]}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Preço (R$)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <Input label="Área (m²)" type="number" value={area} onChange={(e) => setArea(e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Quartos" type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
        <Select
          label="Corretor"
          value={brokerId}
          onValueChange={setBrokerId}
          options={brokers.map((b) => ({ value: b.id, label: b.name }))}
        />
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" className="flex-1">Cadastrar</Button>
      </div>
    </form>
  )
}
