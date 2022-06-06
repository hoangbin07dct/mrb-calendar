import CalendarUI from "./CalendarUI";

export default class MrbCal {
  private el: HTMLElement[];
  constructor(el: string | HTMLElement[]) {
    console.log(el);
    
    if(typeof el === 'string') {
      this.el = Array.prototype.slice.call(document.querySelectorAll(el))
    }
    else {
      this.el = el
    }
    console.log(this.el);
    new CalendarUI()
  }
}

