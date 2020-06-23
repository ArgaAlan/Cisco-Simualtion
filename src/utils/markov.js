
function statusToIndex(status) {
  switch (status) {
    case 'ticket_ok':
      return 0
    case 'ticket_fail_time':
      return 1
    case 'ticket_fail_quantity':
      return 2
    case 'ticket_quality':
      return 3
    default:
      return 0
  }
}

function indexToStatus(index) {
  switch (index) {
    case 0:
      return 'ticket_ok'
    case 1:
      return 'ticket_fail_time'
    case 2:
      return 'ticket_fail_quantity'
    case 3:
      return 'ticket_quality'
    default:
      return ''
  }
}

function nearest(row, prob, matrix) {
  let nearest = 1.0
  let ans = -1
  for (let j = 0; j < matrix[row]; j++) {
    currentValue = matrix[row][j]
    if (currentValue == 0) {
      continue
    } 
    diff = Math.abs(currentValue - prob)
    if (diff < nearest) {
      nearest = diff
      ans = j
    }
  }
  return ans
}

export default function markovSimulate(status, matrix, weeksNum) {
  let output = []
  let currentStatus = status
  let nextStatusIndex = this.statusToIndex(currentStatus)
  let i = 0
  while (true) {
    output.push(this.indexToStatus(nextStatusIndex))
    let prob = Math.random().toFixed(1)
    nextStatusIndex = nearest(nextStatusIndex, prob, matrix)
    i++
    if (i > weeksNum) {
      break
    }
  }
  return output
} 