import test from 'node:test'
import assert from 'node:assert/strict'
import {
  filterServices,
  buildWhatsAppUrl,
  toggleChecklistItem,
  calculatePrepProgress,
  clampParallax,
} from './booking'

const SAMPLE_SERVICES = [
  { id: 'terapeutica', category: 'terapeutica', name: 'Massagem Terapêutica' },
  { id: 'relaxante', category: 'relaxamento', name: 'Massagem Relaxante' },
  { id: 'desportiva', category: 'desportiva', name: 'Massagem Desportiva' },
]

test('filterServices returns all services for "todas" and filters specific categories', () => {
  assert.equal(filterServices(SAMPLE_SERVICES, 'todas').length, 3)
  assert.equal(filterServices(SAMPLE_SERVICES, 'desportiva').length, 1)
  assert.equal(filterServices(SAMPLE_SERVICES, 'desportiva')[0].id, 'desportiva')
  assert.deepEqual(filterServices(SAMPLE_SERVICES, 'inexistente'), [])
})

test('buildWhatsAppUrl encodes service name, preferred period, and prep status cleanly', () => {
  const url = buildWhatsAppUrl({
    serviceName: 'Ventosaterapia',
    period: 'Tarde',
    completedPrepCount: 6,
    totalPrepCount: 6,
  })
  assert.ok(url.startsWith('https://wa.me/5573999917430?text='))
  const decoded = decodeURIComponent(url.split('?text=')[1])
  assert.ok(decoded.includes('Ventosaterapia'))
  assert.ok(decoded.includes('tarde'))
  assert.ok(decoded.includes('Guia de Pré-Atendimento'))
})

test('toggleChecklistItem adds and removes items immutably', () => {
  const step1 = toggleChecklistItem([], 'banho')
  assert.deepEqual(step1, ['banho'])
  const step2 = toggleChecklistItem(step1, 'hidratacao')
  assert.deepEqual(step2, ['banho', 'hidratacao'])
  const step3 = toggleChecklistItem(step2, 'banho')
  assert.deepEqual(step3, ['hidratacao'])
})

test('calculatePrepProgress clamps counts and computes completion state', () => {
  assert.deepEqual(calculatePrepProgress(0, 6), {
    count: 0,
    total: 6,
    percent: 0,
    isComplete: false,
  })
  assert.deepEqual(calculatePrepProgress(3, 6), {
    count: 3,
    total: 6,
    percent: 50,
    isComplete: false,
  })
  assert.deepEqual(calculatePrepProgress(8, 6), {
    count: 6,
    total: 6,
    percent: 100,
    isComplete: true,
  })
})

test('clampParallax maps normalized scroll progress symmetrically across range', () => {
  assert.equal(clampParallax(0, 40), -40)
  assert.equal(clampParallax(0.5, 40), 0)
  assert.equal(clampParallax(1, 40), 40)
  assert.equal(clampParallax(1.5, 40), 40)
  assert.equal(clampParallax(-0.4, 40), -40)
})
