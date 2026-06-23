import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  FaArrowRight,
  FaCalendarDays,
  FaChartLine,
  FaGraduationCap,
  FaIndianRupeeSign,
  FaLightbulb,
  FaMoneyBillTrendUp,
  FaShieldHalved,
  FaTableCells,
} from 'react-icons/fa6'
import {
  FaCalculator,
  FaChartArea,
  FaHandHoldingUsd,
} from 'react-icons/fa'
import {
  calculateChildEducation,
  calculateEmi,
  calculateRetirement,
  calculateSip,
  formatCurrency,
} from '../../utils/calculators'

const tabs = [
  { key: 'sip', label: 'SIP Calculator', icon: FaChartLine },
  { key: 'emi', label: 'EMI Calculator', icon: FaCalculator },
  { key: 'retirement', label: 'Retirement Calculator', icon: FaHandHoldingUsd },
  { key: 'education', label: 'Child Education Calculator', icon: FaGraduationCap },
]

const pieColors = ['#061936', '#D4AF37']

function formatCompactCurrency(value) {
  const amount = Number.isFinite(value) ? value : 0

  if (amount >= 10000000) {
    return `₹${Math.round(amount / 10000000)}Cr`
  }

  if (amount >= 100000) {
    return `₹${Math.round(amount / 100000)}L`
  }

  if (amount >= 1000) {
    return `₹${Math.round(amount / 1000)}K`
  }

  return `₹${amount}`
}

function InputField({ label, prefix, suffix, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#061936]">{label}</span>
      <span className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-[#061936] shadow-[0_16px_42px_-34px_rgba(6,25,54,0.75)] transition focus-within:border-[#D4AF37] focus-within:ring-4 focus-within:ring-[#D4AF37]/12 sm:h-12">
        {prefix ? <span className="mr-2 text-slate-500">{prefix}</span> : null}
        <input
          {...props}
          className="min-w-0 flex-1 bg-transparent outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix ? <span className="ml-2 text-slate-500">{suffix}</span> : null}
      </span>
    </label>
  )
}

function MetricPanel({ label, value, icon: Icon, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-[#005AA7]',
    green: 'bg-emerald-50 text-emerald-700',
    gold: 'bg-[#D4AF37]/12 text-[#B88900]',
  }

  return (
    <div className="flex min-h-[5rem] items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_20px_56px_-42px_rgba(6,25,54,0.8)] sm:min-h-[5.4rem] sm:p-3.5">
      <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-lg ${tones[tone]}`}>
        <Icon aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
        <p className="text-display mt-1 break-words text-[clamp(1.05rem,4.5vw,1.55rem)] font-bold leading-tight text-[#061936]">
          {value}
        </p>
      </div>
    </div>
  )
}

function DataTable({ rows, labelKey = 'label', valueKey = 'value' }) {
  return (
    <div className="h-56 overflow-auto rounded-xl border border-slate-200 bg-white finance-scrollbar sm:h-64 xl:h-72">
      <div className="divide-y divide-slate-100 sm:hidden">
        {rows.map((row) => (
          <div
            key={`${row[labelKey]}-${row[valueKey]}`}
            className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
          >
            <span className="font-semibold text-[#061936]">{row[labelKey]}</span>
            <span className="text-right font-semibold text-slate-600">
              {formatCurrency(row[valueKey])}
            </span>
          </div>
        ))}
      </div>
      <table className="hidden w-full min-w-[28rem] text-left text-sm sm:table">
        <thead className="sticky top-0 bg-slate-50 text-[0.68rem] uppercase tracking-[0.16em] text-slate-500">
          <tr>
            <th className="px-4 py-3 font-bold">Period</th>
            <th className="px-4 py-3 font-bold">Projected Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={`${row[labelKey]}-${row[valueKey]}`}>
              <td className="px-4 py-3 font-semibold text-[#061936]">{row[labelKey]}</td>
              <td className="px-4 py-3 text-slate-600">{formatCurrency(row[valueKey])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CalculatorHub() {
  const [activeTab, setActiveTab] = useState('sip')
  const [viewMode, setViewMode] = useState('chart')
  const [sipValues, setSipValues] = useState({
    monthlyInvestment: 10000,
    annualRate: 12,
    years: 15,
  })
  const [emiValues, setEmiValues] = useState({
    principal: 3500000,
    annualRate: 8.25,
    years: 20,
  })
  const [retirementValues, setRetirementValues] = useState({
    currentAge: 32,
    retirementAge: 60,
    monthlyExpense: 80000,
    inflation: 6,
    returnRate: 8,
  })
  const [educationValues, setEducationValues] = useState({
    childAge: 5,
    educationAge: 18,
    currentCost: 1500000,
    inflation: 8,
    returnRate: 12,
  })

  const sipResult = useMemo(() => calculateSip(sipValues), [sipValues])
  const emiResult = useMemo(() => calculateEmi(emiValues), [emiValues])
  const retirementResult = useMemo(
    () => calculateRetirement(retirementValues),
    [retirementValues],
  )
  const educationResult = useMemo(
    () => calculateChildEducation(educationValues),
    [educationValues],
  )

  const resetView = (key) => {
    setActiveTab(key)
    setViewMode('chart')
  }

  const chartTick = { fill: '#334155', fontSize: 11 }
  const chartGrid = { stroke: '#e2e8f0', strokeWidth: 1 }

  return (
    <section id="financial-calculators" className="mx-auto w-full max-w-[1500px] scroll-mt-24 px-3 py-5 sm:px-6 lg:px-[5vw] lg:py-7">
      <div className="rounded-[1.35rem] border border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_54%,#ffffff_100%)] p-3 shadow-[0_34px_100px_-72px_rgba(6,25,54,0.55)] sm:rounded-[1.65rem] sm:p-5 lg:p-6">
        <div className="grid gap-5 xl:grid-cols-[0.34fr_0.66fr] xl:items-center 2xl:grid-cols-[0.38fr_0.62fr]">
          <div className="px-1 py-1 sm:px-3 xl:py-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#061936] shadow-sm">
              <span className="size-2 rounded-full bg-[#D4AF37]" />
              Financial Calculators
            </span>
            <h2 className="text-display mt-4 max-w-2xl text-[clamp(1.45rem,5.6vw,2.25rem)] font-bold leading-[1.14] text-[#061936]">
              Live planning tools that turn goals into{' '}
              <span className="text-[#D4AF37]">actionable numbers.</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Use these calculators to model investing, borrowing, retirement readiness,
              and education funding with immediate visual feedback.
            </p>

            <div className="mt-4 rounded-[1.15rem] bg-[#061936] p-3.5 text-white shadow-[0_30px_82px_-54px_rgba(6,25,54,0.85)]">
              <p className="px-1 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white/80">
                Planning Studio
              </p>
              <div className="mt-3 grid gap-1.5 sm:grid-cols-2 xl:grid-cols-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => resetView(tab.key)}
                      className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2 text-left text-sm font-semibold transition ${
                        activeTab === tab.key
                          ? 'bg-white text-[#061936] shadow-[0_18px_44px_-34px_rgba(255,255,255,0.7)]'
                          : 'bg-white/7 text-white/88 hover:bg-white/12'
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                            activeTab === tab.key
                              ? 'bg-[#D4AF37]/14 text-[#D4AF37]'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          <Icon aria-hidden="true" />
                        </span>
                        <span className="min-w-0 break-words">{tab.label}</span>
                      </span>
                      <FaArrowRight
                        className={activeTab === tab.key ? 'text-[#D4AF37]' : 'text-white/75'}
                        aria-hidden="true"
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-[1rem] border border-slate-100 bg-white/82 p-3.5 shadow-[var(--shadow-card)]">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#061936]">
                <FaShieldHalved aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-[#061936]">Private & Secure</p>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  Your data is safe and never shared.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_34px_100px_-72px_rgba(6,25,54,0.6)] sm:rounded-[1.55rem]">
            <div className="p-4 sm:p-5">
              {activeTab === 'sip' ? (
                <div>
                  <div className="max-w-2xl">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                      SIP Calculator
                    </p>
                    <h3 className="text-display mt-3 text-[clamp(1.25rem,1.9vw,1.75rem)] font-bold leading-snug text-[#061936]">
                      See how consistency compounds into long-term wealth.
                    </h3>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <InputField
                      label="Monthly Investment"
                      prefix={<FaIndianRupeeSign aria-hidden="true" />}
                      type="number"
                      value={sipValues.monthlyInvestment}
                      onChange={(event) =>
                        setSipValues((current) => ({
                          ...current,
                          monthlyInvestment: Number(event.target.value),
                        }))
                      }
                    />
                    <InputField
                      label="Expected Return"
                      suffix="% p.a."
                      type="number"
                      value={sipValues.annualRate}
                      onChange={(event) =>
                        setSipValues((current) => ({
                          ...current,
                          annualRate: Number(event.target.value),
                        }))
                      }
                    />
                    <InputField
                      label="Investment Tenure"
                      suffix="Years"
                      type="number"
                      value={sipValues.years}
                      onChange={(event) =>
                        setSipValues((current) => ({
                          ...current,
                          years: Number(event.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <MetricPanel
                      icon={FaChartLine}
                      label="Maturity Amount"
                      value={formatCurrency(sipResult.maturityAmount)}
                      tone="blue"
                    />
                    <MetricPanel
                      icon={FaMoneyBillTrendUp}
                      label="Invested Amount"
                      value={formatCurrency(sipResult.investedAmount)}
                      tone="green"
                    />
                    <MetricPanel
                      icon={FaCalendarDays}
                      label="Estimated Gain"
                      value={formatCurrency(sipResult.wealthGain)}
                      tone="gold"
                    />
                  </div>
                  <div className="mt-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Projected Maturity Amount
                      </p>
                      <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                    </div>
                    {viewMode === 'chart' ? (
                      <div className="h-56 sm:h-64 xl:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={sipResult.growthData} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
                            <defs>
                              <linearGradient id="sipArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.42} />
                                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.04} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="year" tick={chartTick} interval="preserveStartEnd" />
                            <YAxis width={52} tick={chartTick} tickFormatter={(value) => formatCompactCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#D4AF37"
                              strokeWidth={3}
                              fill="url(#sipArea)"
                              dot={{ r: 3, fill: '#D4AF37', strokeWidth: 0 }}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <DataTable rows={sipResult.growthData} labelKey="year" valueKey="value" />
                    )}
                  </div>
                </div>
              ) : null}

              {activeTab === 'emi' ? (
                <div>
                  <div className="max-w-2xl">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                      EMI Calculator
                    </p>
                    <h3 className="text-display mt-3 text-[clamp(1.45rem,2.4vw,2.15rem)] font-bold leading-tight text-[#061936]">
                      Model borrowing with clarity before you commit to the loan.
                    </h3>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <InputField
                      label="Loan Amount"
                      prefix={<FaIndianRupeeSign aria-hidden="true" />}
                      type="number"
                      value={emiValues.principal}
                      onChange={(event) =>
                        setEmiValues((current) => ({
                          ...current,
                          principal: Number(event.target.value),
                        }))
                      }
                    />
                    <InputField
                      label="Interest Rate"
                      suffix="% p.a."
                      type="number"
                      step="0.1"
                      value={emiValues.annualRate}
                      onChange={(event) =>
                        setEmiValues((current) => ({
                          ...current,
                          annualRate: Number(event.target.value),
                        }))
                      }
                    />
                    <InputField
                      label="Loan Tenure"
                      suffix="Years"
                      type="number"
                      value={emiValues.years}
                      onChange={(event) =>
                        setEmiValues((current) => ({
                          ...current,
                          years: Number(event.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <MetricPanel icon={FaCalculator} label="Monthly EMI" value={formatCurrency(emiResult.emi)} tone="blue" />
                    <MetricPanel icon={FaMoneyBillTrendUp} label="Total Interest" value={formatCurrency(emiResult.totalInterest)} tone="gold" />
                    <MetricPanel icon={FaIndianRupeeSign} label="Total Payment" value={formatCurrency(emiResult.totalAmount)} tone="green" />
                  </div>
                  <div className="mt-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Loan Cost Breakdown
                      </p>
                      <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                    </div>
                    {viewMode === 'chart' ? (
                      <div className="h-56 sm:h-64 xl:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={emiResult.breakdown}
                              dataKey="value"
                              nameKey="name"
                              innerRadius="50%"
                              outerRadius="74%"
                              paddingAngle={5}
                            >
                              {emiResult.breakdown.map((entry, index) => (
                                <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <DataTable rows={emiResult.breakdown.map((row) => ({ label: row.name, value: row.value }))} />
                    )}
                  </div>
                </div>
              ) : null}

              {activeTab === 'retirement' ? (
                <div>
                  <div className="max-w-2xl">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                      Retirement Calculator
                    </p>
                    <h3 className="text-display mt-3 text-[clamp(1.45rem,2.4vw,2.15rem)] font-bold leading-tight text-[#061936]">
                      Project future lifestyle needs with a grounded retirement view.
                    </h3>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <InputField label="Current Age" suffix="Years" type="number" value={retirementValues.currentAge} onChange={(event) => setRetirementValues((current) => ({ ...current, currentAge: Number(event.target.value) }))} />
                    <InputField label="Retirement Age" suffix="Years" type="number" value={retirementValues.retirementAge} onChange={(event) => setRetirementValues((current) => ({ ...current, retirementAge: Number(event.target.value) }))} />
                    <InputField label="Monthly Expense" prefix={<FaIndianRupeeSign aria-hidden="true" />} type="number" value={retirementValues.monthlyExpense} onChange={(event) => setRetirementValues((current) => ({ ...current, monthlyExpense: Number(event.target.value) }))} />
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <InputField label="Inflation Rate" suffix="%" type="number" value={retirementValues.inflation} onChange={(event) => setRetirementValues((current) => ({ ...current, inflation: Number(event.target.value) }))} />
                    <InputField label="Retirement Return" suffix="%" type="number" value={retirementValues.returnRate} onChange={(event) => setRetirementValues((current) => ({ ...current, returnRate: Number(event.target.value) }))} />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <MetricPanel icon={FaCalendarDays} label="Monthly Expense At Retirement" value={formatCurrency(retirementResult.monthlyExpenseAtRetirement)} tone="blue" />
                    <MetricPanel icon={FaHandHoldingUsd} label="Corpus Needed" value={formatCurrency(retirementResult.corpusNeeded)} tone="gold" />
                  </div>
                  <div className="mt-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Corpus Projection
                      </p>
                      <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                    </div>
                    {viewMode === 'chart' ? (
                      <div className="h-56 sm:h-64 xl:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={retirementResult.projection} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
                            <XAxis dataKey="age" tick={chartTick} />
                            <YAxis width={52} tick={chartTick} tickFormatter={(value) => formatCompactCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                            <Bar dataKey="corpus" fill="#005AA7" radius={[10, 10, 0, 0]} background={chartGrid} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <DataTable rows={retirementResult.projection.map((row) => ({ label: `Age ${row.age}`, value: row.corpus }))} />
                    )}
                  </div>
                </div>
              ) : null}

              {activeTab === 'education' ? (
                <div>
                  <div className="max-w-2xl">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                      Child Education Calculator
                    </p>
                    <h3 className="text-display mt-3 text-[clamp(1.45rem,2.4vw,2.15rem)] font-bold leading-tight text-[#061936]">
                      Estimate future education costs early and plan with less pressure later.
                    </h3>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <InputField label="Child Age" suffix="Years" type="number" value={educationValues.childAge} onChange={(event) => setEducationValues((current) => ({ ...current, childAge: Number(event.target.value) }))} />
                    <InputField label="College Age" suffix="Years" type="number" value={educationValues.educationAge} onChange={(event) => setEducationValues((current) => ({ ...current, educationAge: Number(event.target.value) }))} />
                    <InputField label="Current Cost" prefix={<FaIndianRupeeSign aria-hidden="true" />} type="number" value={educationValues.currentCost} onChange={(event) => setEducationValues((current) => ({ ...current, currentCost: Number(event.target.value) }))} />
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <InputField label="Inflation Rate" suffix="%" type="number" value={educationValues.inflation} onChange={(event) => setEducationValues((current) => ({ ...current, inflation: Number(event.target.value) }))} />
                    <InputField label="Expected Return" suffix="%" type="number" value={educationValues.returnRate} onChange={(event) => setEducationValues((current) => ({ ...current, returnRate: Number(event.target.value) }))} />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <MetricPanel icon={FaGraduationCap} label="Future Education Cost" value={formatCurrency(educationResult.futureCost)} tone="gold" />
                    <MetricPanel icon={FaChartLine} label="Monthly SIP Needed" value={formatCurrency(educationResult.monthlySip)} tone="blue" />
                  </div>
                  <div className="mt-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Education Cost Projection
                      </p>
                      <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                    </div>
                    {viewMode === 'chart' ? (
                      <div className="h-56 sm:h-64 xl:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={educationResult.projection} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
                            <defs>
                              <linearGradient id="eduArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.42} />
                                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.04} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="year" tick={chartTick} />
                            <YAxis width={52} tick={chartTick} tickFormatter={(value) => formatCompactCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                            <Area type="monotone" dataKey="cost" stroke="#D4AF37" strokeWidth={3} fill="url(#eduArea)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <DataTable rows={educationResult.projection} labelKey="year" valueKey="cost" />
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-slate-100 bg-[linear-gradient(135deg,#f8fafc,#ffffff)] p-4 sm:p-5">
              <div className="flex flex-col gap-3 rounded-xl bg-white/80 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3 sm:items-center">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#005AA7]">
                    <FaLightbulb aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-display text-base font-bold text-[#061936]">
                      Stay invested. Stay consistent.
                    </p>
                    <p className="mt-1 text-sm leading-5 text-slate-600">
                      Small steps today, create a big impact tomorrow.
                    </p>
                  </div>
                </div>
                <a
                  href="/#contact"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-xl bg-[#061936] px-4 py-2.5 text-sm font-bold text-white shadow-[0_22px_52px_-34px_rgba(6,25,54,0.95)] transition hover:bg-[#0B2A57] sm:w-auto"
                  style={{ color: '#ffffff' }}
                >
                  <FaCalendarDays className="text-white" aria-hidden="true" />
                  <span className="text-white">Get Expert Advice</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="grid w-full grid-cols-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:inline-grid sm:w-auto">
      <button
        type="button"
        onClick={() => setViewMode('chart')}
        className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-bold transition ${
          viewMode === 'chart' ? 'bg-[#061936] text-white' : 'text-[#061936] hover:bg-slate-50'
        }`}
      >
        <FaChartArea aria-hidden="true" />
        Chart
      </button>
      <button
        type="button"
        onClick={() => setViewMode('table')}
        className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-bold transition ${
          viewMode === 'table' ? 'bg-[#061936] text-white' : 'text-[#061936] hover:bg-slate-50'
        }`}
      >
        <FaTableCells aria-hidden="true" />
        Table
      </button>
    </div>
  )
}

export default CalculatorHub
