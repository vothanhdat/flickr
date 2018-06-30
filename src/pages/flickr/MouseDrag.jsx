import { bind } from 'lodash-decorators';
import { EventEmitter } from 'events';
export class MouseDrag extends EventEmitter {
  x = 0;
  y = 0;
  hold = false;
  /**@param {MouseEvent} e */
  @bind()
  onMounseDown(e) {
    this.hold = true;
    this.x = e.clientX;
    this.y = e.clientY;
  }
  @bind()
  /**@param {MouseEvent} e */
  onMounseMove(e) {
    var deltaX = e.clientX - this.x;
    var deltaY = e.clientY - this.y;
    this.x = e.clientX;
    this.y = e.clientY;
    this.hold && this.emit('onholdanddrag', { deltaX, deltaY });
  }
  @bind()
  /**@param {MouseEvent} e */
  onMounseUp(e) {
    this.hold = false;
    this.x = e.clientX;
    this.y = e.clientY;
  }
  get props() {
    return {
      onMounseDown: this.onMounseDown,
      onMounseMove: this.onMounseMove,
      onMounseUp: this.onMounseUp,
    };
  }
}