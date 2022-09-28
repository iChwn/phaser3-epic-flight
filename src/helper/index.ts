function msToS(milliseconds:number) {
  return Math.floor((milliseconds / 1000) % 60)
}

export {msToS}