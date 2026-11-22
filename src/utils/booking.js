export const DEFAULT_WHATSAPP_PHONE = '5573999917430'

export function filterServices(services, category) {
  if (!Array.isArray(services)) return []
  if (!category || category === 'todas') return services
  return services.filter((service) => service.category === category)
}

export function buildWhatsAppUrl({
  phone = DEFAULT_WHATSAPP_PHONE,
  serviceName = '',
  period = '',
  completedPrepCount = 0,
  totalPrepCount = 0,
} = {}) {
  const cleanPhone = String(phone).replace(/\D/g, '') || DEFAULT_WHATSAPP_PHONE
  const parts = ['Olá Eliandro! Gostaria de agendar uma sessão']

  if (serviceName) {
    parts[0] += ` de ${serviceName}`
  }
  parts[0] += '.'

  if (period) {
    parts.push(`Tenho preferência pelo período da ${period.toLowerCase()}.`)
  }

  if (totalPrepCount > 0 && completedPrepCount === totalPrepCount) {
    parts.push('Já conferi todo o Guia de Pré-Atendimento.')
  }

  const text = encodeURIComponent(parts.join(' '))
  return `https://wa.me/${cleanPhone}?text=${text}`
}

export function toggleChecklistItem(selectedIds, id) {
  const current = Array.isArray(selectedIds) ? selectedIds : []
  if (current.includes(id)) {
    return current.filter((item) => item !== id)
  }
  return [...current, id]
}

export function calculatePrepProgress(selectedCount, totalCount) {
  const safeTotal = Math.max(0, Number(totalCount) || 0)
  const safeSelected = Math.min(safeTotal, Math.max(0, Number(selectedCount) || 0))
  const percent = safeTotal === 0 ? 0 : Math.round((safeSelected / safeTotal) * 100)

  return {
    count: safeSelected,
    total: safeTotal,
    percent,
    isComplete: safeTotal > 0 && safeSelected === safeTotal,
  }
}

export function clampParallax(progress, range) {
  const clamped = Math.min(1, Math.max(0, Number(progress) || 0))
  const numericRange = Number(range) || 0
  return Number(((clamped - 0.5) * 2 * numericRange).toFixed(2))
}
