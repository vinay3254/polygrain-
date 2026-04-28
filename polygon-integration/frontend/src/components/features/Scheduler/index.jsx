import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Download, Repeat, Users, X } from 'lucide-react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useMeeting } from '../../../context/MeetingContext';

const recurringOptions = ['none', 'daily', 'weekly'];

export default function Scheduler({ isOpen, onClose }) {
  const { scheduleMeeting } = useMeeting();
  const [form, setForm] = useState({
    title: 'EtherXMeet Strategy Sync',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().slice(0, 10),
    time: '18:30',
    duration: '45',
    recurring: 'weekly',
    participants: 'nyla@etherxmeet.app, rian@etherxmeet.app, mika@etherxmeet.app',
  });

  const calendarPreview = useMemo(() => {
    const start = new Date(`${form.date}T${form.time}`);
    const end = new Date(start.getTime() + Number(form.duration) * 60000);
    return { start, end };
  }, [form]);

  if (!isOpen) {
    return null;
  }

  const downloadIcs = () => {
    const start = toIcsDate(calendarPreview.start);
    const end = toIcsDate(calendarPreview.end);
    const body = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EtherXMeet//EN
BEGIN:VEVENT
UID:${Date.now()}@etherxmeet.app
DTSTAMP:${toIcsDate(new Date())}
DTSTART:${start}
DTEND:${end}
SUMMARY:${form.title}
DESCRIPTION:EtherXMeet scheduled session
LOCATION:${window.location.origin}/room/${form.title.toLowerCase().replace(/\s+/g, '-')}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([body], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${form.title.toLowerCase().replace(/\s+/g, '-')}.ics`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission().catch(() => {});
    }

    scheduleMeeting({
      title: form.title,
      date: calendarPreview.start.toISOString(),
      duration: Number(form.duration),
      participants: form.participants
        .split(',')
        .map((participant) => participant.trim())
        .filter(Boolean),
      recurring: form.recurring,
    });

    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        className="w-full max-w-5xl rounded-[34px] border border-white/10 bg-[rgba(13,13,26,0.92)] p-6 shadow-[0_30px_90px_rgba(4,8,24,0.55)] backdrop-blur-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/35">Integrated scheduler</p>
            <h2 className="mt-2 font-syne text-3xl font-bold text-white">Book a future room</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Create a scheduled EtherXMeet session, preview the calendar slot, download an ICS
              event, and prime reminder notifications in one step.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4">
            <Input
              label="Meeting title"
              value={form.title}
              onChange={(event) => setForm((previous) => ({ ...previous, title: event.target.value }))}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Date"
                type="date"
                value={form.date}
                onChange={(event) => setForm((previous) => ({ ...previous, date: event.target.value }))}
              />
              <Input
                label="Time"
                type="time"
                value={form.time}
                onChange={(event) => setForm((previous) => ({ ...previous, time: event.target.value }))}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Duration (minutes)"
                type="number"
                value={form.duration}
                onChange={(event) => setForm((previous) => ({ ...previous, duration: event.target.value }))}
              />
              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/80">Recurring</label>
                <div className="flex gap-2">
                  {recurringOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setForm((previous) => ({ ...previous, recurring: option }))}
                      className={`flex-1 rounded-2xl border px-3 py-3 text-sm capitalize ${
                        form.recurring === option
                          ? 'border-cyan-400/20 bg-cyan-400/12 text-cyan-100'
                          : 'border-white/10 bg-white/5 text-white/60'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Input
              label="Participants"
              value={form.participants}
              onChange={(event) => setForm((previous) => ({ ...previous, participants: event.target.value }))}
              placeholder="email1, email2, email3"
            />

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={handleSubmit}>
                <CalendarClock className="h-4 w-4" />
                Save schedule
              </Button>
              <Button variant="outline" onClick={downloadIcs}>
                <Download className="h-4 w-4" />
                Download ICS
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">Preview</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{form.title}</h3>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-black/10 p-4">
              <div className="flex items-center gap-3 text-white/75">
                <CalendarClock className="h-5 w-5 text-cyan-200" />
                <span>
                  {calendarPreview.start.toLocaleDateString()} at{' '}
                  {calendarPreview.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-white/60">
                <Repeat className="h-5 w-5 text-white/40" />
                <span className="capitalize">{form.recurring}</span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-white/60">
                <Users className="h-5 w-5 text-white/40" />
                <span>{form.participants.split(',').filter(Boolean).length} invited</span>
              </div>
            </div>

            <div className="rounded-[24px] border border-indigo-400/20 bg-indigo-500/10 p-4 text-sm leading-6 text-white/65">
              Lobby opens 5 minutes before start. Browser notifications will nudge attendees 15
              minutes before kickoff when permissions are enabled.
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function toIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
