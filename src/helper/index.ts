function msToS(milliseconds:number) {
  return Math.floor((milliseconds / 1000) % 60)
}

// generate random id
function generateUID(length:number){
    return window.btoa(String.fromCharCode(...window.crypto.getRandomValues(new Uint8Array(length * 2)))).replace(/[+/]/g, "").substring(0, length);
}

export {msToS, generateUID}