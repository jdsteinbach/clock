class WordClock {
  constructor(node) {
    this.el = node

    this.setDate()

    setInterval(() => {
      this.setDate()
    }, 60000)
  }

  setDate = () => {
    const now = new Date()
    this.updateHour(now)
    this.updateMinutes(now)
    this.updateModifier(now)
  }

  updateHour = now => {
    let h = now.getHours()

    // 24h to am/pm
    h = h > 12 ? h - 12 : h

    // Midnight => 12
    h = h === 0 ? 12 : h

    this.el.dataset.activeHour = ( now.getMinutes() <=35 ) ? h : h + 1
  }

  updateMinutes = now => {
    const m = now.getMinutes()

    switch (true) {
      case m > 25 && m <= 35:
        this.el.dataset.activeMinutes = 'half'
        break
      case m > 17 && m <= 43:
        this.el.dataset.activeMinutes = 'twenty'
        break
      case m > 12 && m <= 48:
        this.el.dataset.activeMinutes = 'quarter'
        break
      case m > 7 && m <= 53:
        this.el.dataset.activeMinutes = 'ten'
        break
      case m > 2 && m <= 58:
        this.el.dataset.activeMinutes = 'five'
        break
      default:
        this.el.dataset.activeMinutes = false
    }
  }

  updateModifier = now => {
    const m = now.getMinutes()

    let activeModifier = [(m <= 35) ? 'past' : 'to']

    if ( this.el.dataset.activeMinutes && this.el.dataset.activeMinutes !== 'half' && this.el.dataset.activeMinutes !== 'quarter' ) {
      activeModifier.push('minutes')
    }

    if ( ! this.el.dataset.activeMinutes ) {
      activeModifier = ['oclock']
    }

    this.el.dataset.activeModifier = activeModifier.join(' ')
  }
}

const clock = new WordClock(document.getElementById('clock'))
