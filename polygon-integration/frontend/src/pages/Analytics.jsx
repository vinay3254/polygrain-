import { motion } from 'framer-motion';
import TopBar from '../components/layout/TopBar';
import meetingAnalytics from '../data/analytics';
import AnimatedPage from '../components/layout/AnimatedPage';
import { fadeUp, staggerContainer, staggerChild } from '../utils/animationVariants';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function Analytics() {
  const timelineData = meetingAnalytics.sentimentData.timeline.map((point) => ({
    minute: `${point.minute}m`,
    score: Math.round(point.score * 100),
  }));

  const equityData = meetingAnalytics.speakingTime.map((entry) => ({
    name: entry.participant.split(' ')[0],
    speaking: entry.percentage,
    engagement: Math.max(40, 100 - entry.percentage),
  }));

  return (
    <AnimatedPage>
    <div className="min-h-[100dvh] bg-app-background text-app-text" style={{ position: 'relative' }}>
      <div className="aurora-bg aurora-subtle" aria-hidden="true" />
      <TopBar />

      <main className="mx-auto max-w-[1450px] px-4 pb-12 pt-6 md:px-6">
        <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(19,19,43,0.9),rgba(13,13,26,0.72))] p-6 shadow-[0_30px_90px_rgba(4,8,24,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <p className="text-xs uppercase tracking-[0.28em] text-white/35">Meeting analytics</p>
          <h1 className="mt-2 font-syne text-4xl font-bold tracking-[-0.04em] text-white">Read what the room was actually doing</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
            Participation equity, speaking shifts, room energy, and action density reveal how balanced the collaboration really felt.
          </p>
        </div>

        <motion.div
          className="mt-6 grid gap-6 xl:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <motion.div variants={staggerChild}>
            <ChartCard title="Speaking time distribution" subtitle="Live balance across the room">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={meetingAnalytics.speakingTime}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="participant" tick={{ fill: '#9ca3af', fontSize: 11 }} hide />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(13,13,26,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 20,
                    }}
                  />
                  <Bar dataKey="percentage" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>

          <motion.div variants={staggerChild}>
            <ChartCard title="Room energy over time" subtitle="Sentiment meter across the timeline">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={timelineData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="minute" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(13,13,26,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 20,
                    }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>

          <motion.div variants={staggerChild}>
            <ChartCard title="Participation equity score" subtitle="Who dominated and who needs a nudge">
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={equityData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <Radar name="Speaking" dataKey="speaking" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
                  <Radar name="Engagement" dataKey="engagement" stroke="#10B981" fill="#10B981" fillOpacity={0.22} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>

          <motion.div variants={staggerChild}>
            <ChartCard title="Word cloud terms" subtitle="Themes repeated most in the meeting">
              <div className="flex flex-wrap gap-3">
                {meetingAnalytics.wordCloud.map((term) => (
                  <span
                    key={term.word}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70"
                    style={{ fontSize: `${12 + term.count / 4}px` }}
                  >
                    {term.word}
                  </span>
                ))}
              </div>
            </ChartCard>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <section className="rounded-[34px] border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <p className="text-xs uppercase tracking-[0.28em] text-white/35">Swimlane timeline</p>
            <div className="mt-5 space-y-4">
              {meetingAnalytics.speakingTime.map((entry, index) => (
                <div key={entry.participant} className="grid items-center gap-3 md:grid-cols-[180px_1fr_auto]">
                  <p className="text-sm font-medium text-white">{entry.participant}</p>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#4F46E5,#06B6D4)]"
                      style={{ width: `${entry.percentage * 2.2}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/45">{entry.duration} min</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[34px] border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <p className="text-xs uppercase tracking-[0.28em] text-white/35">Quality indicators</p>
            <div className="mt-5 space-y-3">
              <MetricRow label="Engagement score" value={`${meetingAnalytics.engagementScore}/100`} />
              <MetricRow label="Interruptions" value={`${meetingAnalytics.interruptionCount}`} />
              <MetricRow label="Questions raised" value={`${meetingAnalytics.participationMetrics.questionsAsked}`} />
              <MetricRow label="Action items created" value={`${meetingAnalytics.participationMetrics.actionItemsCreated}`} />
              <MetricRow label="Participation equity" value={meetingAnalytics.healthIndicators.inclusive ? 'Balanced' : 'Needs attention'} />
            </div>
          </section>
        </motion.div>
      </main>
    </div>
    </AnimatedPage>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <section className="rounded-[34px] border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <p className="text-xs uppercase tracking-[0.28em] text-white/35">{subtitle}</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function MetricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-black/10 px-4 py-4">
      <span className="text-sm text-white/55">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}
