import {debounce} from 'lodash-decorators'
import Device from './device'

class OnePageScroll {

  /**
   * @param {HTMLElement[]} mountpoints
   */
  mount(mountpoints){
    if(typeof window != 'undefined'){
      this.list = mountpoints
      window.addEventListener('wheel', this._wheel = e => this.onScrollRequest(e.deltaY,e) ,false)
    }
  }

  unmount(){
    if(typeof window != 'undefined'){
      window.removeEventListener('wheel',this._wheel)
    }
  }

  /**
   * @param {Number} delta
   * @param {HTMLElement} e
   */
  onScrollRequest(delta,e){
    if(window.innerWidth <= 1280 || window.innerHeight <= 690)
      return;
    var nextElement = this.list.find((e,i,ar) => {
      const {top,bottom} = e.getBoundingClientRect()
      
      if(delta > 0){
        return top < window.innerHeight * 1.1,bottom > window.innerHeight * 1.1
      }else{
        const value = i >= ar.length - 1 ? 0 : -0.1
        return bottom > (window.innerHeight * value) && top < (window.innerHeight * value)
      }
    })

    if(nextElement){
      // console.log(':',nextElement.id)
      if(this.nextElement != nextElement){
        console.log('Animation Start',nextElement.id)
        this.scrollTo(nextElement);
        this.nextElement = nextElement

      }else{
        if(Device.isFireFox)
          this.scrollTo(nextElement);
        // console.log('dup')
      }

    }else{
      this.nextElement = nextElement;
    }
    // console.log('prevent')
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * @param {HTMLElement} element
   */
  scrollTo(element){
    // console.log('Fired',element.id)
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
    })
  }

}

export default OnePageScroll
