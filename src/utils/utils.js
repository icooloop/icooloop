import moment from 'moment'
export const dateformat = (dataStr, pattern = 'YYYY-MM-DD') => {
  return moment(dataStr).format(pattern)
}
// 格式化金额
export const formatCurrency = (val, floatType = 2) => {
  val = (val + '').replace(/\$|\,/g, '')
  if (isNaN(val)) {
    val = '0'
  }
  let sign = (val == (val = Math.abs(val)))
  val = Math.floor(val * 100 + 0.50000000001)
  let cents = val % 100
  val = Math.floor(val / 100).toString()
  if (cents < 10) {
    cents = '0' + cents
  }
  for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
    val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3))
  }
  if (floatType == 2) val += '.' + cents
  return (((sign) ? '' : '-') + val)
}

// 截取url参数
export const GetRequestParams = () => {
  let url = location.search // 获取url中"?"符后的字串
  let theRequest = new Object()
  if (url.indexOf('?') != -1) {
    let str = url.substr(1)
    let strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return theRequest
}
// 万元转换
export const formatAmountUnit = (num) => {
  let money = Number(num)
  if (money > 9999) {
    return money / 10000 + '万'
  }
  return money
}
// 转换json字符串
export const toJson = (obj) => {
  return typeof (obj) === 'string' ? eval('(' + obj + ')') : obj
}

export const packageMaxValue = (weights, values, W) => {
  var n = weights.length
  var f = new Array(n)
  f[-1] = new Array(W + 1).fill(0)
  var selected = []
  for (var i = 0; i < n; i++) { // 注意边界，没有等号
    f[i] = [] // 创建当前的二维数组
    for (var j = 0; j <= W; j++) { // 注意边界，有等号
      if (j < weights[i]) { // 注意边界， 没有等号
        f[i][j] = f[i - 1][j]// case 1
      } else {
        f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i])// case 2
      }
    }
  }
  var j = W; var w = 0
  for (var i = n - 1; i >= 0; i--) {
    if (f[i][j] > f[i - 1][j]) {
      selected[i] = 1
      // console.log("物品",i,"其重量为", weights[i],"其价格为", values[i])
      j = j - weights[i]
      w += weights[i]
    } else {
      selected[i] = 0
    }
  }
  // console.log("背包最大承重为",W," 现在重量为", w, " 总价值为", f[n-1][W])
  console.log(selected)
  return selected
}

// 根据出借金额和利率计算收益
export const calculateIncome = (currentLoan) => {
  let amount = currentLoan.investAmt
  let currentLoanPeriodUnit = currentLoan.loanPeriodUnit
  let currentLoanPeriod = currentLoan.loanPeriod
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
      let yslxh = 0; let totalYhbj = 0; let dsbj = 0; let yhbj = 0; let interestCur = 0; let  zhdhbj = amount
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
