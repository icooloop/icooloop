import { zereOnePageTable, zereOnePageCreate, zereOnePageTotal } from '@/utils/zeroOnePage'
import { formatCurrency } from '@/utils/utils'

export const initRisk = (loginInfo, riskGrade) => {
  let isAssetstRisk = true
  let riskStr = ''
  if (loginInfo.isLogin) {
    if (riskGrade == 1) {
      isAssetstRisk = false
    }
    if (riskGrade == 2) {
      if (loginInfo.riskAss == '稳健型' || loginInfo.riskAss == '平衡型' || loginInfo.riskAss == '积极型') {
        isAssetstRisk = false
      }
    }
    if (riskGrade == 3) {
      if (loginInfo.riskAss == '平衡型' || loginInfo.riskAss == '积极型') {
        isAssetstRisk = false
      }
    }
    if (riskGrade == 4) {
      if (loginInfo.riskAss == '积极型') {
        isAssetstRisk = false
      }
    }
    if (loginInfo.riskAss == '保守型') {
      riskStr = 'WR1(保守型)'
    }
    if (loginInfo.riskAss == '稳健型') {
      riskStr = 'WR1(保守型)、WR2(稳健型)'
    }
    if (loginInfo.riskAss == '平衡型') {
      riskStr = 'WR1(保守型)、WR2(稳健型)、WR3(平衡型)'
    }
  }
  return { isAssetstRisk, riskStr }
}
export const loanMatchVoucher = (loan, oldRedList, oldTicketList, selectedRedTotal = [], selectedTicketTotal = []) => {
  // let loan={...oldLoan};
  loan.selectedRedList = []
  loan.selectedTicket = ''
  loan.maxRate = 0
  loan.totalLimitAmt = 0
  loan.totalRedAmt = 0
  loan.ticketAmt = 0

  let incomeObj = getIncomeAmt(loan, oldRedList, oldTicketList, selectedRedTotal, selectedTicketTotal) // 获取redAmtTotal,ticketAmt,redResult,ticketId,maxRate
  if (loan.isTransfer) loan.investAmt = loan.transferPrincipal
  let investAmt = loan.investAmt ? loan.investAmt : 0
  let currDays = (loan.loanPeriodUnit == 0) ? loan.loanPeriod : loan.loanPeriod * 30
  if (loan.isTransfer) currDays = loan.remainDays
  if (incomeObj.redAmtTotal > incomeObj.ticketAmt) {
    loan.totalRedAmt = incomeObj.redAmtTotal
  } else {
    loan.maxRate = incomeObj.maxRate
    loan.ticketAmt = incomeObj.ticketAmt
  }
  // 初始化红包
  let redList = []
  if (oldRedList && oldRedList.length > 0) {
    oldRedList.forEach(item => {
      let voucher = { ...item }
      voucher.hasuse = selectedRedTotal.includes(voucher.awardDtlId)
      voucher.selected = false
      incomeObj.redResult.forEach(oo => {
        if (incomeObj.redAmtTotal > incomeObj.ticketAmt && oo.id == voucher.awardDtlId) {
          voucher.selected = true
          loan.totalLimitAmt += voucher.limitAmount
          loan.selectedRedList.push(voucher.awardDtlId)
          selectedRedTotal.push(voucher.awardDtlId)
        }
      })
      voucher.disabled = (voucher.limitAmount > investAmt) || (voucher.limitPeriods > currDays)
      redList.push(voucher)
    })
  }

  let ticketList = []
  // 初始奖励券
  if (oldTicketList && oldTicketList.length > 0) {
    oldTicketList.forEach(item => {
      let voucher = { ...item }
      voucher.hasuse = selectedTicketTotal.includes(voucher.awardDtlId)
      voucher.selected = false
      if (incomeObj.redAmtTotal <= incomeObj.ticketAmt && incomeObj.ticketId == voucher.awardDtlId) {
        voucher.selected = true
        loan.selectedTicket = voucher.awardDtlId
        selectedTicketTotal.push(voucher.awardDtlId)
      }
      voucher.disabled = (voucher.limitAmount > investAmt) || (voucher.limitPeriods > currDays)
      ticketList.push(voucher)
    })
  }
  loan.redList = redList
  loan.ticketList = ticketList
  if (loan.totalLimitAmt > 0 || loan.totalRedAmt > 0) {
    loan.selectStr = '满' + loan.totalLimitAmt + '返' + loan.totalRedAmt
  } else if (loan.maxRate > 0) {
    loan.selectStr = '奖励' + loan.maxRate + '%'
  } else {
    loan.selectStr = '无符合条件的优惠券'
  }
  loan.baseInterest = calculateIncome({ ...loan, ...{ rate: loan.platRate } })// 基本利息
  loan.awardInterest = loan.awardRate ? calculateIncome({ ...loan, ...{ rate: loan.awardRate } }) : 0// 奖励利息
  loan.totalInterest = loan.baseInterest + loan.awardInterest + loan.totalRedAmt + loan.ticketAmt
  let baseDesc = loan.investAmt ? '项目收益 ' + formatCurrency(loan.baseInterest) : ''
  let awardDesc = loan.awardInterest ? ' + 出借奖励 ' + formatCurrency(loan.awardInterest) : ''
  let redDesc = ''
  if (loan.totalRedAmt) redDesc = ' + 红包收益 ' + formatCurrency(loan.totalRedAmt)
  if (loan.ticketAmt) redDesc = ' + 奖励券收益 ' + formatCurrency(loan.ticketAmt)
  loan.totalInterestText = baseDesc + awardDesc + redDesc
  return { loan, selectedRedTotal, selectedTicketTotal }
}

export const getIncomeAmt = (loan, oldRedList, oldTicketList, selectedRedTotal, selectedTicketTotal) => { // 获取红包和奖励券收益
  let investAmt = loan.investAmt
  let maxRate = 0
  let ticketAmt = 0// 奖励券收益
  let currDays = (loan.loanPeriodUnit == 0) ? loan.loanPeriod : loan.loanPeriod * 30
  if (loan.isTransfer) currDays = loan.remainDays
  let ticketId = null
  let olist = []
  let redResult = []
  let redAmtTotal = 0
  if (oldRedList && oldRedList.length > 0) {
    oldRedList.forEach((voucher) => {
      // zereOnePageCreate(红包限定金额,红包金额,数据库id)
      if (voucher.limitPeriods <= currDays && voucher.limitAmount <= investAmt && !selectedRedTotal.includes(voucher.awardDtlId)) {
        olist.push(zereOnePageCreate(voucher.limitAmount, voucher.awardAmount, voucher.awardDtlId))
      }
    })
    redResult = zereOnePageTable(investAmt, olist)
    redAmtTotal = zereOnePageTotal(redResult)// 红包收益
  }
  if (oldTicketList && oldTicketList.length > 0) {
    oldTicketList.forEach((voucher) => {
      if (voucher.limitPeriods <= currDays && voucher.limitAmount <= investAmt && maxRate < voucher.awardAmount && !selectedTicketTotal.includes(voucher.awardDtlId)) {
        maxRate = voucher.awardAmount
        ticketId = voucher.awardDtlId
        let currentLoan = { ...loan, ...{ rate: voucher.awardAmount } }
        ticketAmt = calculateIncome(currentLoan) // 奖励券收益
        if(ticketAmt<0.01){
          ticketAmt=0.01
        }
        if (currentLoan.isTransfer) ticketAmt = ticketAmt * loan.remainDays / loan.remainPeriodDays
      }
    })
  }
  return { redAmtTotal, ticketAmt, redResult, ticketId, maxRate }
}

export const calculateIncome = (currentLoan) => {
  let amount = currentLoan.investAmt
  let currentLoanPeriodUnit = currentLoan.loanPeriodUnit
  let currentLoanPeriod = currentLoan.isTransfer ? currentLoan.remainPeriod : currentLoan.loanPeriod
  let repayMode = currentLoan.repayMode
  let rate = currentLoan.rate
  let income = 0
  if (currentLoanPeriodUnit == 0) {
    income = rate / 100 / 360 * amount * currentLoanPeriod
  } else if (currentLoanPeriodUnit == 1) {
    // 月利率
    let yln = rate / 100 / 12
    if (repayMode == 0) {
      // 等额本息计算方式：应收利息、已还本金之和、代收本金、应还本金、应还利息、待收本金
      let yslxh = 0; let totalYhbj = 0; let dsbj = 0; let yhbj = 0; let interestCur = 0; let zhdhbj = amount
      // 月还本息
      let yhbx = ((Math.pow(1 + yln, currentLoanPeriod) * yln * parseInt(amount)) / (Math.pow(1 + yln, currentLoanPeriod) - 1))
      for (let i = 1; i <= currentLoanPeriod; i++) {
        interestCur = (amount - totalYhbj) * yln
        yhbj = yhbx - interestCur
        totalYhbj = totalYhbj + yhbj
        dsbj = amount - totalYhbj
        if (i == (currentLoanPeriod - 1)) {
          zhdhbj = dsbj
        }
        if (i == currentLoanPeriod) {
          yhbj = zhdhbj
          interestCur = yhbx - yhbj
          totalYhbj = totalYhbj + yhbj
          dsbj = 0
        }
        income = income + interestCur
      }
    } else if (repayMode == 1) {
      // 等额本金计算方式：月利率、应收本息、应收本金、应收利息、已收本金、应收本金总额
      let newYsbx = 0; let newYsbj = 0; let newYslx = 0; let newSybj = 0; let ysbjTotle = 0
      newYsbj = amount / currentLoanPeriod
      for (let i = 1; i <= currentLoanPeriod; i++) {
        newYslx = (amount - ysbjTotle) * yln
        ysbjTotle = ysbjTotle + newYsbj
        newYsbx = newYslx + newYsbj
        newSybj = amount - newYsbj * i
        income = income + newYslx
      }
    } else {
      income = yln * amount * currentLoanPeriod
    }
  } else if (currentLoanPeriodUnit == 2) {
    income = rate / 100 * amount * currentLoanPeriod
  }
  income = Math.floor(income * 100) / 100
  return income
}
