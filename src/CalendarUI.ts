export default class CalendarUI {
  private dayOfWeek: string[];
  private onlyMonth: boolean;
  private monthShow: string
  constructor() {
    console.log('Render Calendar UI 1');
    this.monthShow = this.getCurrentMonth();
    this.onlyMonth = false;
    this.dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    
  }
  public init = (option: any) => {
    console.log('This is init function', option);
    this.renderCalendar()
  }

  private renderCalendar = () => {
    const calendarE: HTMLElement | null = document.getElementById('calendar-show');
    const mainCal = document.createElement('div');
    const itemCal = document.createElement('div');
    const titleCal = document.createElement('p');
    const tableCal = document.createElement('table');
    const headTable = document.createElement('thead');
    const bodyTable = this.renderDays();
    let headItem: string = '';

    mainCal.classList.add('calendar-container');
    itemCal.classList.add('calendar-item');
    titleCal.classList.add('calendar-month');
    tableCal.classList.add('calendar-tbl');
    titleCal.innerHTML = this.monthShow;
    this.dayOfWeek.forEach((element: string) => {
      headItem += `<th class="days_th">${element}</th>`;
    });
    headTable.innerHTML = `<tr>${headItem}</tr>`;
    tableCal.appendChild(headTable);
    tableCal.appendChild(bodyTable);
    itemCal.appendChild(titleCal);
    itemCal.appendChild(tableCal);
    mainCal.appendChild(itemCal);
    if (calendarE) {
      calendarE.appendChild(mainCal);
    }
  };
  private renderDays = () => {
    const bodyTable = document.createElement('tbody');
    let bodyInner = '';
    const arr = this.getDaysOffMonth();
    arr.forEach((item, idx) => {
      const col = idx + 1;
      const className = item === 0 ? 'days_td empty' : 'days_td';
      const colEl = `<td class="${className}">${item === 0 ? '' : ` <div class="days_inner">${item}</div>`}</td>`;
      if (col === 1 || col % 7 === 1) {
        bodyInner += `<tr>${colEl}`;
      } else if (col % 7 === 0) {
        bodyInner += `${colEl}</tr>`;
      } else {
        bodyInner += `${colEl}`;
      }
    });
    bodyTable.innerHTML = bodyInner;
    return bodyTable;
  };
  private getCurrentMonth = () => {
    const d = new Date();
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth() + 1;
    return `${currentYear}/${currentMonth}/1`;
  };

  private getDaysInMonth = (year: number, month: number) => {
    const dateOfMonth: number = new Date(year, month, 0).getDate();
    return dateOfMonth;
  };

  createArrayNumber = (start: number, end: number) => {
    return Array.from(Array.from(Array(Math.ceil(end - start + 1)).keys()), (x) => start + x);
  };
  private getDayOfWeek = (date: string) => {
    const d = new Date(date);
    return d.getDay();
  };

  private getDaysOffMonth = () => {
    const d = new Date(this.monthShow);
    const year: number = d.getFullYear();
    const month: number = d.getMonth() + 1;
    const firstDay: string = `${year}/${month}/1`;
    const firstDayOfWeek: number = this.getDayOfWeek(firstDay);
    const prevYear: number = month === 12 ? year - 1 : year;
    const prevMonth = month === 1 ? 12 : month - 1;
    const totalDays: number = this.getDaysInMonth(year, month);
    const currentDays: number[] = this.createArrayNumber(1, totalDays);
    const preDays: number[] = this.getDaysOffPrevMonth(firstDayOfWeek, prevYear, prevMonth);
    const countDays: number = 42 - currentDays.length - preDays.length;
    const nextDays: number[] = this.getDaysOffNextMonth(countDays);

    return [...preDays, ...currentDays, ...nextDays];
  };

  private getDaysOffPrevMonth = (currentFirst: number, year: number, month: number) => {
    const arrZero = Array(currentFirst).fill(0);
    if (this.onlyMonth || currentFirst === 0) return arrZero;
    const totalDays: number = this.getDaysInMonth(year, month);
    const start: number = totalDays - currentFirst + 1;
    const arrDays: number[] = this.createArrayNumber(start, totalDays);
    return arrDays;
  };

  private getDaysOffNextMonth = (countDays: number) => {
    const arrZero = Array(countDays).fill(0);
    if (this.onlyMonth || countDays === 0) return arrZero;
    const arrDays: number[] = this.createArrayNumber(1, countDays);

    return arrDays;
  };
}