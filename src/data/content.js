import {
  UtensilsCrossed,
  Clock,
  PersonStanding,
  ShowerHead,
  CalendarDays,
  GlassWater,
} from 'lucide-react'

import ventosaterapiaImg from '../assets/images/service_ventosaterapia_1795298865472.jpg'
import shiatsuImg from '../assets/images/service_shiatsu_1795298866079.jpg'
import miofascialImg from '../assets/images/service_miofascial_1795298863464.jpg'
import botanicalSanctuaryBg from '../assets/images/botanical_sanctuary_bg_1795298865218.jpg'

export const WHATS_URL = 'https://wa.me/5573999917430'
export const BOTANICAL_BG = botanicalSanctuaryBg

export const NAV_LINKS = [
  { label: 'Sobre', href: '/#about' },
  { label: 'Espaço', href: '/#espaco' },
  { label: 'Serviços', href: '/#services' },
  { label: 'Avaliações', href: '/avaliacoes-porto-seguro' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/#contact' },
]

export const SERVICE_CATEGORIES = [
  { id: 'todas', label: 'Todas as terapias' },
  { id: 'terapeutica', label: 'Terapêuticas' },
  { id: 'relaxamento', label: 'Relaxamento' },
  { id: 'desportiva', label: 'Desportiva' },
]

export const SERVICES = [
  {
    id: 'terapeutica',
    slug: '/massagem-terapeutica-porto-seguro',
    number: '01',
    name: 'Massagem Terapêutica',
    category: 'terapeutica',
    categoryLabel: 'Terapêutica',
    duration: '60 min',
    price: 'R$ 169,90',
    image: '/bem-estar-2.jpg',
    imageAlt: 'Massagem terapêutica em Porto Seguro focada em ombros e coluna',
    summary:
      'Manobras profundas e direcionadas para investigar a origem da dor muscular, desatar nódulos persistentes e restaurar a mobilidade articular em Porto Seguro.',
    benefits: [
      'Alívio efetivo de dores lombares, cervicais e escapulares',
      'Redução de contraturas crônicas e sobrecarga postural',
      'Melhora imediata da amplitude de movimento',
    ],
    indication: 'Indicada para quem convive com tensões acumuladas, dores nas costas ou rigidez muscular.',
  },
  {
    id: 'relaxante',
    slug: '/massagem-relaxante-porto-seguro',
    number: '02',
    name: 'Massagem Relaxante',
    category: 'relaxamento',
    categoryLabel: 'Relaxamento',
    duration: '60 min',
    price: 'R$ 169,90',
    image: '/bem-estar-1.jpg',
    imageAlt: 'Massagem relaxante em Porto Seguro à luz de velas no estúdio de Eliandro Rodrigues',
    summary:
      'Ritmo fluido, toque contínuo e pressão equilibrada que desaceleram o sistema nervoso, dissolvem o estresse mental e devolvem leveza ao corpo.',
    benefits: [
      'Diminuição do cortisol e da fadiga mental',
      'Qualidade de sono mais profunda e restauradora',
      'Sensação imediata de serenidade e renovação',
    ],
    indication: 'Ideal para desacelerar da rotina intensa e restaurar o equilíbrio emocional e físico.',
  },
  {
    id: 'ventosaterapia',
    slug: '/ventosaterapia-porto-seguro',
    number: '03',
    name: 'Ventosaterapia',
    category: 'terapeutica',
    categoryLabel: 'Terapêutica',
    duration: '50 min',
    price: 'R$ 169,90',
    image: ventosaterapiaImg,
    imageAlt: 'Ventosaterapia em Porto Seguro com aplicação profissional de ventosas nas costas',
    summary:
      'Terapia por sucção controlada que descomprime os tecidos profundos, estimula a oxigenação sanguínea e acelera a eliminação de toxinas musculares.',
    benefits: [
      'Ativação intensa da microcirculação local',
      'Descompressão miofascial em pontos de dor aguda',
      'Recuperação acelerada após esforço físico',
    ],
    indication: 'Recomendada para estagnação muscular, dores persistentes e recuperação pós-treino.',
  },
  {
    id: 'desportiva',
    slug: '/massagem-desportiva-porto-seguro',
    number: '04',
    name: 'Massagem Desportiva',
    category: 'desportiva',
    categoryLabel: 'Desportiva',
    duration: '60 min',
    price: 'R$ 169,90',
    image: '/massagem-na-praia.jpg',
    imageAlt: 'Massagem desportiva em Porto Seguro realizada pelo massoterapeuta Eliandro Rodrigues',
    summary:
      'Protocolo técnico desenvolvido com vivência em Jiu-Jitsu, Boxe e MMA para preparar a musculatura, prevenir lesões e otimizar a recuperação atlética.',
    benefits: [
      'Prevenção de estiramentos e sobrecargas articulares',
      'Drenagem rápida do ácido lático pós-treino',
      'Aumento da flexibilidade e prontidão física',
    ],
    indication: 'Essencial para praticantes de artes marciais, corrida, musculação e esportes de alto rendimento.',
  },
  {
    id: 'shiatsu',
    slug: '/shiatsu-porto-seguro',
    number: '05',
    name: 'Shiatsu',
    category: 'relaxamento',
    categoryLabel: 'Equilíbrio',
    duration: '60 min',
    price: 'R$ 169,90',
    image: shiatsuImg,
    imageAlt: 'Shiatsu em Porto Seguro aplicado com pressão precisa dos polegares nos meridianos',
    summary:
      'Técnica oriental de pressão rítmica com os dedos e palmas sobre os meridianos energéticos, harmonizando corpo, respiração e postura.',
    benefits: [
      'Reequilíbrio energético e alívio de tensões ocultas',
      'Estímulo natural à capacidade regenerativa do corpo',
      'Redução de enxaquecas tensionais e cansaço crônico',
    ],
    indication: 'Perfeita para quem busca alinhamento corporal profundo aliado à serenidade mental.',
  },
  {
    id: 'miofascial',
    slug: '/liberacao-miofascial-porto-seguro',
    number: '06',
    name: 'Liberação Miofascial',
    category: 'desportiva',
    categoryLabel: 'Clínica',
    duration: '60 min',
    price: 'R$ 169,90',
    image: miofascialImg,
    imageAlt: 'Liberação miofascial em Porto Seguro aplicada nos ombros e região dorsal',
    summary:
      'Manipulação lenta e precisa da fáscia muscular para dissolver aderências profundas, liberar pontos-gatilho e devolver fluidez aos movimentos.',
    benefits: [
      'Desbloqueio de pontos-gatilho e dores irradiadas',
      'Melhora da postura e da eficiência biomecânica',
      'Sensação duradoura de soltura muscular',
    ],
    indication: 'Voltada para travamentos musculares, atletas e dores crônicas resistentes.',
  },
  {
    id: 'drenagem',
    slug: '/drenagem-linfatica-porto-seguro',
    number: '07',
    name: 'Drenagem Linfática',
    category: 'relaxamento',
    categoryLabel: 'Bem-Estar',
    duration: '60 min',
    price: 'R$ 169,90',
    image: '/bem-estar-1.jpg',
    imageAlt: 'Drenagem linfática em Porto Seguro para redução de inchaço e retenção de líquidos',
    summary:
      'Manobras suaves e rítmicas direcionadas ao sistema linfático para reduzir inchaço, aliviar pernas cansadas e melhorar a circulação.',
    benefits: [
      'Redução visível da retenção de líquidos e inchaço',
      'Alívio imediato da sensação de peso nas pernas',
      'Estímulo natural da circulação linfática e bem-estar',
    ],
    indication: 'Indicada para retenção hídrica, pós-viagem, cansaço nas pernas e autocuidado em Porto Seguro.',
  },
]

export const STUDIO_MEDIA = {
  videoSrc: '/espaco-tour.mp4',
  videoPoster: '/espaco-ambiente.jpg',
  photos: [
    {
      id: 'ambiente',
      src: '/espaco-ambiente.jpg',
      alt: 'Estúdio climatizado de massagem em Porto Seguro com iluminação quente e projeção relaxante',
      kicker: '01 · Clima & Luz',
      title: 'Iluminação sensorial',
      caption: 'Sala climatizada com luz quente suave e projeção relaxante para desacelerar logo na chegada.',
    },
    {
      id: 'maca',
      src: '/espaco-maca.jpg',
      alt: 'Maca ergonômica acolchoada no novo espaço climatizado de massoterapia em Porto Seguro',
      kicker: '02 · Conforto',
      title: 'Maca preparada a cada sessão',
      caption: 'Enxoval macio, apoio facial ergonômico e higienização rigorosa entre todos os atendimentos.',
    },
    {
      id: 'instrumentos',
      src: '/espaco-instrumentos.jpg',
      alt: 'Toalhas limpas, ventosas, pedras quentes e acessórios de liberação miofascial no estúdio em Porto Seguro',
      kicker: '03 · Arsenal Terapêutico',
      title: 'Instrumentos completos',
      caption: 'Ventosas, pedras quentes, bambus, raspadores miofasciais, óleos selecionados e toalhas macias.',
    },
  ],
}

export const WELLNESS_PILLARS = [
  {
    id: 'shiatsu',
    index: '01',
    title: 'Shiatsu',
    subtitle: 'Precisão nos meridianos',
    detail:
      'Pressões firmes e conscientes ao longo das linhas musculares que liberam bloqueios profundos e restabelecem a harmonia entre respiração e tônus.',
  },
  {
    id: 'ventosaterapia',
    index: '02',
    title: 'Ventosaterapia',
    subtitle: 'Descompressão & circulação',
    detail:
      'Sucção terapêutica controlada que eleva a oxigenação tecidual, suaviza aderências e traz alívio notável logo nas primeiras sessões.',
  },
  {
    id: 'miofascial',
    index: '03',
    title: 'Liberação Miofascial',
    subtitle: 'Foco na origem da dor',
    detail:
      'Trabalho minucioso sobre a fáscia e pontos-gatilho para devolver amplitude articular, leveza postural e liberdade real de movimento.',
  },
]

export const GUIA_TIPS = [
  {
    id: 'fome',
    step: '01',
    icon: UtensilsCrossed,
    title: 'Não vá com fome',
    text: 'Faça uma refeição leve antes do horário agendado; evitar o estômago vazio ajuda o corpo a relaxar plenamente.',
  },
  {
    id: 'mente',
    step: '02',
    icon: PersonStanding,
    title: 'Avalie corpo e mente',
    text: 'Reserve alguns minutos para perceber onde há tensão acumulada e compartilhar com o terapeuta antes de começar.',
  },
  {
    id: 'banho',
    step: '03',
    icon: ShowerHead,
    title: 'Tome um banho antes da sessão',
    text: 'Um banho morno relaxa a musculatura superficial, abre os poros e prepara o organismo para receber as manobras.',
  },
  {
    id: 'cedo',
    step: '04',
    icon: Clock,
    title: 'Chegue com tranquilidade',
    text: 'Chegar alguns minutos antes permite desacelerar a respiração e entrar no clima acolhedor da sessão sem pressa.',
  },
  {
    id: 'planeje',
    step: '05',
    icon: CalendarDays,
    title: 'Planeje o pós-sessão',
    text: 'Procure reservar um período calmo depois da massagem para prolongar os efeitos restauradores no corpo.',
  },
  {
    id: 'hidratacao',
    step: '06',
    icon: GlassWater,
    title: 'Mantenha a hidratação',
    text: 'Beba água antes e após o atendimento — a hidratação adequada potencializa a recuperação muscular e circulatória.',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Josenai Ferreira Reis',
    quote:
      'Acredito que todas as pessoas deveriam conhecer alguém como Eliandro nessa jornada, chamada ‘vida’. Ele é um ser humano incrível, um profissional que trabalha com muita excelência, eu tinha dores que persistiam por muito tempo, e fui curada, graças à Deus e ao seu trabalho.',
  },
  {
    name: 'Luciana Ferreira',
    role: 'Local Guide',
    quote:
      'Muito bom atendimento! Respeito e acolhimento, e a aplicação da técnica realmente efetiva, estava com dores há muito tempo e ele me ajudou muito, foi um prazer conhecer o Eliandro, recomendo.',
  },
  {
    name: 'Raul',
    quote: 'Massagista nota 10, ajudou muito na minha lesão da lombar.',
  },
  {
    name: 'Arthur Moraes',
    quote:
      'Ambiente confortável, profissional super qualificado, deixa qualquer um zerado.',
  },
  {
    name: 'Luan Santos',
    quote:
      'Trabalho de excelência! Senti um relaxamento mental e uma sensação de alívio.',
  },
  {
    name: 'Anna Colibri',
    quote:
      'Eu amo as massagens modeladoras e as relaxantes. Vejo resultados. Bom demaaais!',
  },
  {
    name: 'Jennifer Vinhas',
    quote:
      'Qualidade e responsabilidade, um grande profissional e respeitador.',
  },
  {
    name: 'Leonardo Matias',
    quote: 'Top, o melhor de Porto Seguro e região!',
  },
]

export const CONTACT_INFO = {
  addressLine1: 'R. Adelar Maria de Andrade, 135',
  addressLine2: 'Porto Seguro, BA — 45810-000',
  fullAddress: 'R. Adelar Maria de Andrade, 135, Porto Seguro, BA — 45810-000',
  instagramHandle: '@massagem_portoseguroba',
  instagramUrl: 'https://www.instagram.com/massagem_portoseguroba/',
  tiktokHandle: '@eliandrorodrigues2022',
  tiktokUrl: 'https://www.tiktok.com/@eliandrorodrigues2022',
  whatsappDisplay: '+55 73 99991-7430',
  whatsappUrl: WHATS_URL,
  mapEmbedUrl:
    'https://maps.google.com/maps?q=R.%20Adelar%20Maria%20de%20Andrade%2C%20135%20-%20Porto%20Seguro%2C%20BA%2C%2045810-000&t=&z=16&ie=UTF8&iwloc=&output=embed',
}
