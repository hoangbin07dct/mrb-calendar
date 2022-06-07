import CalendarUI from "./CalendarUI";
interface MrbCalOption {
  startMonth?: string;
  endMonth?: string ;
  onlyMonth?: boolean,
  viewMonths?: number;
}
export default class MrbCal {
  private ui: CalendarUI;
  private el: HTMLElement[];
  private option: MrbCalOption
  constructor(el: string | HTMLElement[], option?: MrbCalOption) {
    this.ui = new CalendarUI()
    if(!option) {
      this.option = {
        startMonth: this.getStart(),
        endMonth:'infinity ',
        onlyMonth: false,
        viewMonths: 1
      }
    }
    else {
      this.option = {
        startMonth: option.startMonth || this.getStart(),
        endMonth: option.endMonth || 'infinity ',
        onlyMonth: option.onlyMonth || false,
        viewMonths: option.viewMonths || 1
      }
    }
    
    // this.option = 
    // console.log(this.option);
    
    if(typeof el === 'string') {
      this.el = Array.prototype.slice.call(document.querySelectorAll(el))
    }
    else {
      this.el = el
    }  
    this.ui.init(this.option)
    
  }
  private getStart = () => {
    const date = new Date();
    const fullYear= date.getFullYear();
    const month = date.getMonth() + 1;
    return `${fullYear}-${month}`
  }
}

