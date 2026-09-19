import { MapPin } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Reveal from './Reveal'

export default function VenueSection() {
  const { t } = useApp()

  return (
    <section id="venue" className="px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="mb-3 text-sm font-medium text-gold-600 dark:text-gold-400">{t.venue.title}</p>
            <h2 className="font-display text-3xl text-ink-900 dark:text-paper sm:text-4xl">
              {t.meta.university}
            </h2>
            <p className="mt-5 flex items-start gap-2.5 text-base text-ink-900 dark:text-paper">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-500" />
              {t.venue.address}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-ink dark:text-ink-200">{t.venue.text}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-lg border border-ink-900/10 dark:border-paper/10">
              <iframe
                title="conference-venue-map"
                src="https://www.google.com/maps?q=Warith+Al-Anbiyaa+University,+Karbala,+Iraq&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
