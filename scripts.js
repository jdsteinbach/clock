const clock = document.getElementById('clock')

const setDate = () => {
  now = new Date()
  updateHour(now)
  updateMinutes(now)
  updateModifier(now)
}

const updateHour = now => {
  h = now.getHours()

  // 24h to am/pm
  h = h > 12 ? h - 12 : h

  // Midnight => 12
  h = h === 0 ? 12 : h

  clock.dataset.activeHour = ( now.getMinutes() <=35 ) ? h : h + 1
}

const updateMinutes = now => {
  m = now.getMinutes()

  switch (true) {
    case m > 25 && m <= 35:
      clock.dataset.activeMinutes = 'half'
      break
    case m > 17 && m <= 43:
      clock.dataset.activeMinutes = 'twenty'
      break
    case m > 12 && m <= 48:
      clock.dataset.activeMinutes = 'quarter'
      break
    case m > 7 && m <= 53:
      clock.dataset.activeMinutes = 'ten'
      break
    case m > 2 && m <= 58:
      clock.dataset.activeMinutes = 'five'
      break
    default:
      clock.dataset.activeMinutes = false
  }
}

const updateModifier = now => {
  m = now.getMinutes()

  let activeModifier = [(m <= 35) ? 'past' : 'to']

  if ( clock.dataset.activeMinutes && clock.dataset.activeMinutes !== 'half' && clock.dataset.activeMinutes !== 'quarter' ) {
    activeModifier.push('minutes')
  }

  if ( ! clock.dataset.activeMinutes ) {
    activeModifier = ['oclock']
  }

  clock.dataset.activeModifier = activeModifier.join(' ')
}

const init = () => {
  setDate()

  setInterval(() => {
    setDate()
  }, 60000)
}

window.onload = init
