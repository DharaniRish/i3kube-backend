export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)
}

export function calculateSip({ monthlyInvestment, annualRate, years }) {
  const monthlyRate = annualRate / 12 / 100
  const months = years * 12
  const futureValue =
    monthlyInvestment *
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))

  const investedAmount = monthlyInvestment * months

  const growthData = Array.from({ length: years }, (_, index) => {
    const monthsElapsed = (index + 1) * 12
    const amount =
      monthlyInvestment *
      (((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate) *
        (1 + monthlyRate))

    return {
      year: `Year ${index + 1}`,
      value: Math.round(amount),
    }
  })

  return {
    maturityAmount: Math.round(futureValue),
    investedAmount,
    wealthGain: Math.round(futureValue - investedAmount),
    growthData,
  }
}

export function calculateEmi({ principal, annualRate, years }) {
  const months = years * 12
  const monthlyRate = annualRate / 12 / 100
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  const totalAmount = emi * months
  const totalInterest = totalAmount - principal

  const breakdown = [
    { name: 'Principal', value: Math.round(principal) },
    { name: 'Interest', value: Math.round(totalInterest) },
  ]

  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    breakdown,
  }
}

export function calculateRetirement({
  currentAge,
  retirementAge,
  monthlyExpense,
  inflation,
  returnRate,
}) {
  const yearsToRetirement = retirementAge - currentAge
  const inflationAdjustedExpense =
    monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetirement)
  const annualExpenseAtRetirement = inflationAdjustedExpense * 12
  const corpusNeeded = annualExpenseAtRetirement / (returnRate / 100)

  const projection = Array.from({ length: yearsToRetirement }, (_, index) => ({
    age: currentAge + index + 1,
    corpus: Math.round(
      annualExpenseAtRetirement *
        ((index + 1) / yearsToRetirement) *
        (1 + returnRate / 100),
    ),
  }))

  return {
    monthlyExpenseAtRetirement: Math.round(inflationAdjustedExpense),
    corpusNeeded: Math.round(corpusNeeded),
    projection,
  }
}

export function calculateChildEducation({
  childAge,
  educationAge,
  currentCost,
  inflation,
  returnRate,
}) {
  const yearsLeft = educationAge - childAge
  const futureCost = currentCost * Math.pow(1 + inflation / 100, yearsLeft)
  const monthlyRate = returnRate / 12 / 100
  const months = yearsLeft * 12
  const monthlySip =
    futureCost /
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))

  const projection = Array.from({ length: yearsLeft }, (_, index) => ({
    year: `Y${index + 1}`,
    cost: Math.round(currentCost * Math.pow(1 + inflation / 100, index + 1)),
  }))

  return {
    futureCost: Math.round(futureCost),
    monthlySip: Math.round(monthlySip),
    projection,
  }
}
