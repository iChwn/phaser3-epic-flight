function msToS(milliseconds:number) {
  return Math.floor((milliseconds / 1000) % 60)
}

// generate random id
function generateUID(length:number){
    return window.btoa(String.fromCharCode(...window.crypto.getRandomValues(new Uint8Array(length * 2)))).replace(/[+/]/g, "").substring(0, length);
}

const chainAnim = (animation: any, gameObject: any, start:number = 0) => {
  let i = start
  if(i < animation.length) {
    const animate = animation[i].animate ? animation[i].animate : animation[i] 

    if(animation[i].triggerEvent) {
      animation[i].triggerEvent(gameObject)
    }
    
    gameObject.play(animate)
    .on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY+animate, () => {
      chainAnim(animation, gameObject, i + 1)
    });
  }
}

export {msToS, generateUID, chainAnim}