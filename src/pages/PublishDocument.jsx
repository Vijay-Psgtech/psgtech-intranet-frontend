import { useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  FileUp,
  Link2,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from 'lucide-react';

const categories = ['Administration', 'Academic', 'Autonomous', 'Regulations', 'COE', 'CBCS', 'Students Union'];
const allowedFileTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.html,.htm';

const initialForm = {
  category: '',
  subtitle: '',
  openingDate: '',
  closingDate: '',
  title: '',
  url: '',
};

function PublishDocument() {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSubmitted(false);
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.category) nextErrors.category = 'Choose a category.';
    if (!form.subtitle) nextErrors.subtitle = 'Choose a subtitle.';
    if (!form.openingDate) nextErrors.openingDate = 'Add an opening date.';
    if (!form.title.trim()) nextErrors.title = 'Add a title for the link.';
    if (!form.url.trim() && !file) nextErrors.resource = 'Add a URL or upload a file.';
    if (form.url.trim() && !/^https?:\/\//i.test(form.url.trim())) {
      nextErrors.url = 'Use a complete URL starting with http:// or https://.';
    }
    if (form.openingDate && form.closingDate && form.closingDate < form.openingDate) {
      nextErrors.closingDate = 'Closing date cannot be before opening date.';
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setFile(null);
    setErrors({});
    setSubmitted(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#f6f8f5] px-6 py-10 text-slate-900 max-sm:px-4 max-sm:py-6">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900">
          <ArrowLeft size={17} /> Back to document hub
        </a>

        <div className="grid overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(15,70,63,.45)] lg:grid-cols-[.7fr_1.3fr]">
          <section className="relative overflow-hidden bg-[#123f3a] p-10 text-white max-sm:p-7 lg:p-12">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[22px] border-[#e8b96a]/25" />
            <div className="relative flex h-full flex-col">
              <span className="mb-12 grid h-11 w-11 place-items-center rounded-xl bg-[#e8b96a] text-[#123f3a]"><Sparkles size={20} /></span>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#e8b96a]">Content manager</p>
              <h1 className="max-w-sm text-4xl font-bold leading-tight tracking-tight max-sm:text-3xl">Publish a campus resource.</h1>
              <p className="mt-5 max-w-sm text-sm leading-6 text-teal-50/75">Share circulars, links and important documents with the PSG community.</p>
              <div className="mt-auto border-t border-white/15 pt-8 max-lg:mt-12">
                <p className="text-xs font-semibold uppercase tracking-[.15em] text-white/50">Publishing checklist</p>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {['Use a clear, searchable title', 'Set when the resource is visible', 'Provide a link or attach the file'].map((item) => <li className="flex items-center gap-3" key={item}><span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-[#e8b96a]"><Check size={13} /></span>{item}</li>)}
                </ul>
              </div>
            </div>
          </section>

          <form className="p-8 max-sm:p-5 lg:p-12" onSubmit={handleSubmit} noValidate>
            <div className="mb-9 flex items-start justify-between gap-5">
              <div><p className="text-xs font-bold uppercase tracking-[.16em] text-orange-600">New resource</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Resource details</h2><p className="mt-1 text-sm text-slate-500">Fields marked with * are required.</p></div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Draft</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Belongs to" name="category" required error={errors.category}>
                <div className="relative"><select className="control appearance-none pr-10" name="category" value={form.category} onChange={updateField}><option value="">Select category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-400" size={17} /></div>
              </Field>
              <Field label="Subtitle" name="subtitle" required error={errors.subtitle}>
                <div className="relative"><select className="control appearance-none pr-10" name="subtitle" value={form.subtitle} onChange={updateField}><option value="">Choose the subtitle</option><option>Notice</option><option>Circular</option><option>Form</option><option>Guidelines</option><option>Event</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-400" size={17} /></div>
              </Field>
              <Field label="Opening date" name="openingDate" required error={errors.openingDate}><input className="control" type="date" name="openingDate" value={form.openingDate} onChange={updateField} /></Field>
              <Field label="Closing date" name="closingDate" error={errors.closingDate}><input className="control" type="date" name="closingDate" value={form.closingDate} min={form.openingDate} onChange={updateField} /></Field>
            </div>

            <div className="mt-5"><Field label="Title of the link" name="title" required error={errors.title}><input className="control" name="title" value={form.title} onChange={updateField} placeholder="e.g. Faculty appraisal form - 2026" maxLength={120} /><p className="mt-1 text-right text-[11px] text-slate-400">{form.title.length}/120</p></Field></div>

            <div className="mt-5"><Field label="Resource link" name="url" error={errors.url || errors.resource}><div className="relative"><Link2 className="absolute left-3 top-3.5 text-slate-400" size={17} /><input className="control pl-10" name="url" value={form.url} onChange={updateField} placeholder="https://example.com/resource" disabled={Boolean(file)} /></div><p className="mt-1 text-xs text-slate-500">Use a public URL, or attach a file below.</p></Field></div>

            <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-400"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div>

            <div className={`rounded-xl border border-dashed p-4 transition-colors ${file ? 'border-teal-400 bg-teal-50/50' : 'border-slate-300 bg-slate-50'}`}>
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-teal-700 shadow-sm"><FileUp size={19} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{file ? file.name : 'Attach a resource file'}</p><p className="text-xs text-slate-500">PDF, DOC, JPG or web page · max 10 MB</p></div>{file ? <button type="button" className="icon-button" aria-label="Remove attached file" onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}><X size={17} /></button> : <button type="button" className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-teal-700 shadow-sm ring-1 ring-slate-200 hover:bg-teal-50" onClick={() => fileInputRef.current?.click()}>Browse files</button>}</div>
              <input ref={fileInputRef} className="hidden" type="file" accept={allowedFileTypes} onChange={(event) => { const selected = event.target.files?.[0]; if (selected && selected.size <= 10 * 1024 * 1024) { setFile(selected); setForm((current) => ({ ...current, url: '' })); setErrors((current) => ({ ...current, resource: '', url: '' })); } }} />
            </div>
            {errors.resource && <p className="mt-2 text-xs font-medium text-red-600">{errors.resource}</p>}

            {submitted && <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800"><span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-600 text-white"><Check size={15} /></span>Resource validated and ready to publish.</div>}
            <div className="mt-8 flex flex-wrap items-center justify-end gap-3"><button type="button" className="button-secondary" onClick={resetForm}><RotateCcw size={16} /> Reset</button><button type="submit" className="button-primary"><Send size={16} /> Publish resource</button></div>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ label, name, required, error, children }) {
  return <label className="block" htmlFor={name}><span className="mb-2 block text-sm font-semibold text-slate-700">{label}{required && <span className="ml-1 text-orange-600">*</span>}</span>{children}{error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}</label>;
}

export default PublishDocument;