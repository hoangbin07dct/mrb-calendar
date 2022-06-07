/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CalendarUI.ts":
/*!***************************!*\
  !*** ./src/CalendarUI.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var CalendarUI = /** @class */ (function () {
    function CalendarUI() {
        var _this = this;
        this.init = function (option) {
            console.log('This is init function', option);
            _this.renderCalendar();
        };
        this.renderCalendar = function () {
            var calendarE = document.getElementById('calendar-show');
            var mainCal = document.createElement('div');
            var itemCal = document.createElement('div');
            var titleCal = document.createElement('p');
            var tableCal = document.createElement('table');
            var headTable = document.createElement('thead');
            var bodyTable = _this.renderDays();
            var headItem = '';
            mainCal.classList.add('calendar-container');
            itemCal.classList.add('calendar-item');
            titleCal.classList.add('calendar-month');
            tableCal.classList.add('calendar-tbl');
            titleCal.innerHTML = _this.monthShow;
            _this.dayOfWeek.forEach(function (element) {
                headItem += "<th class=\"days_th\">".concat(element, "</th>");
            });
            headTable.innerHTML = "<tr>".concat(headItem, "</tr>");
            tableCal.appendChild(headTable);
            tableCal.appendChild(bodyTable);
            itemCal.appendChild(titleCal);
            itemCal.appendChild(tableCal);
            mainCal.appendChild(itemCal);
            if (calendarE) {
                calendarE.appendChild(mainCal);
            }
        };
        this.renderDays = function () {
            var bodyTable = document.createElement('tbody');
            var bodyInner = '';
            var arr = _this.getDaysOffMonth();
            arr.forEach(function (item, idx) {
                var col = idx + 1;
                var className = item === 0 ? 'days_td empty' : 'days_td';
                var colEl = "<td class=\"".concat(className, "\">").concat(item === 0 ? '' : " <div class=\"days_inner\">".concat(item, "</div>"), "</td>");
                if (col === 1 || col % 7 === 1) {
                    bodyInner += "<tr>".concat(colEl);
                }
                else if (col % 7 === 0) {
                    bodyInner += "".concat(colEl, "</tr>");
                }
                else {
                    bodyInner += "".concat(colEl);
                }
            });
            bodyTable.innerHTML = bodyInner;
            return bodyTable;
        };
        this.getCurrentMonth = function () {
            var d = new Date();
            var currentYear = d.getFullYear();
            var currentMonth = d.getMonth() + 1;
            return "".concat(currentYear, "/").concat(currentMonth, "/1");
        };
        this.getDaysInMonth = function (year, month) {
            var dateOfMonth = new Date(year, month, 0).getDate();
            return dateOfMonth;
        };
        this.createArrayNumber = function (start, end) {
            return Array.from(Array.from(Array(Math.ceil(end - start + 1)).keys()), function (x) { return start + x; });
        };
        this.getDayOfWeek = function (date) {
            var d = new Date(date);
            return d.getDay();
        };
        this.getDaysOffMonth = function () {
            var d = new Date(_this.monthShow);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var firstDay = "".concat(year, "/").concat(month, "/1");
            var firstDayOfWeek = _this.getDayOfWeek(firstDay);
            var prevYear = month === 12 ? year - 1 : year;
            var prevMonth = month === 1 ? 12 : month - 1;
            var totalDays = _this.getDaysInMonth(year, month);
            var currentDays = _this.createArrayNumber(1, totalDays);
            var preDays = _this.getDaysOffPrevMonth(firstDayOfWeek, prevYear, prevMonth);
            var countDays = 42 - currentDays.length - preDays.length;
            var nextDays = _this.getDaysOffNextMonth(countDays);
            return __spreadArray(__spreadArray(__spreadArray([], preDays, true), currentDays, true), nextDays, true);
        };
        this.getDaysOffPrevMonth = function (currentFirst, year, month) {
            var arrZero = Array(currentFirst).fill(0);
            if (_this.onlyMonth || currentFirst === 0)
                return arrZero;
            var totalDays = _this.getDaysInMonth(year, month);
            var start = totalDays - currentFirst + 1;
            var arrDays = _this.createArrayNumber(start, totalDays);
            return arrDays;
        };
        this.getDaysOffNextMonth = function (countDays) {
            var arrZero = Array(countDays).fill(0);
            if (_this.onlyMonth || countDays === 0)
                return arrZero;
            var arrDays = _this.createArrayNumber(1, countDays);
            return arrDays;
        };
        console.log('Render Calendar UI 1');
        this.monthShow = this.getCurrentMonth();
        this.onlyMonth = false;
        this.dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    }
    return CalendarUI;
}());
exports["default"] = CalendarUI;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var CalendarUI_1 = __importDefault(__webpack_require__(/*! ./CalendarUI */ "./src/CalendarUI.ts"));
var MrbCal = /** @class */ (function () {
    function MrbCal(el, option) {
        this.getStart = function () {
            var date = new Date();
            var fullYear = date.getFullYear();
            var month = date.getMonth() + 1;
            return "".concat(fullYear, "-").concat(month);
        };
        this.ui = new CalendarUI_1.default();
        if (!option) {
            this.option = {
                startMonth: this.getStart(),
                endMonth: 'infinity ',
                onlyMonth: false,
                viewMonths: 1
            };
        }
        else {
            this.option = {
                startMonth: option.startMonth || this.getStart(),
                endMonth: option.endMonth || 'infinity ',
                onlyMonth: option.onlyMonth || false,
                viewMonths: option.viewMonths || 1
            };
        }
        // this.option = 
        // console.log(this.option);
        if (typeof el === 'string') {
            this.el = Array.prototype.slice.call(document.querySelectorAll(el));
        }
        else {
            this.el = el;
        }
        this.ui.init(this.option);
    }
    return MrbCal;
}());
exports["default"] = MrbCal;


/***/ }),

/***/ "./src/test.ts":
/*!*********************!*\
  !*** ./src/test.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var index_1 = __importDefault(__webpack_require__(/*! ./index */ "./src/index.ts"));
window.addEventListener('load', function () {
    new index_1.default('.calendar');
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/test.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3BFO2FBQ0k7WUFDSCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7U0FDYjtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFM0IsQ0FBQztJQU9ILGFBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hERCxvRkFBOEI7QUFFOUIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtJQUM5QixJQUFJLGVBQU0sQ0FBQyxXQUFXLENBQUM7QUFDekIsQ0FBQyxDQUFDOzs7Ozs7O1VDSkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0B0eXBlL21yYi1jYWxlbmRhci8uL3NyYy9DYWxlbmRhclVJLnRzIiwid2VicGFjazovL0B0eXBlL21yYi1jYWxlbmRhci8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9AdHlwZS9tcmItY2FsZW5kYXIvLi9zcmMvdGVzdC50cyIsIndlYnBhY2s6Ly9AdHlwZS9tcmItY2FsZW5kYXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQHR5cGUvbXJiLWNhbGVuZGFyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vQHR5cGUvbXJiLWNhbGVuZGFyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9AdHlwZS9tcmItY2FsZW5kYXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyVUkge1xyXG4gIHByaXZhdGUgZGF5T2ZXZWVrOiBzdHJpbmdbXTtcclxuICBwcml2YXRlIG9ubHlNb250aDogYm9vbGVhbjtcclxuICBwcml2YXRlIG1vbnRoU2hvdzogc3RyaW5nXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnUmVuZGVyIENhbGVuZGFyIFVJIDEnKTtcclxuICAgIHRoaXMubW9udGhTaG93ID0gdGhpcy5nZXRDdXJyZW50TW9udGgoKTtcclxuICAgIHRoaXMub25seU1vbnRoID0gZmFsc2U7XHJcbiAgICB0aGlzLmRheU9mV2VlayA9IFsn5pelJywgJ+aciCcsICfngasnLCAn5rC0JywgJ+acqCcsICfph5EnLCAn5ZyfJ107XHJcbiAgICBcclxuICB9XHJcbiAgcHVibGljIGluaXQgPSAob3B0aW9uOiBhbnkpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdUaGlzIGlzIGluaXQgZnVuY3Rpb24nLCBvcHRpb24pO1xyXG4gICAgdGhpcy5yZW5kZXJDYWxlbmRhcigpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlckNhbGVuZGFyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY2FsZW5kYXJFOiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsZW5kYXItc2hvdycpO1xyXG4gICAgY29uc3QgbWFpbkNhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgaXRlbUNhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgdGl0bGVDYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBjb25zdCB0YWJsZUNhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcbiAgICBjb25zdCBoZWFkVGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpO1xyXG4gICAgY29uc3QgYm9keVRhYmxlID0gdGhpcy5yZW5kZXJEYXlzKCk7XHJcbiAgICBsZXQgaGVhZEl0ZW06IHN0cmluZyA9ICcnO1xyXG5cclxuICAgIG1haW5DYWwuY2xhc3NMaXN0LmFkZCgnY2FsZW5kYXItY29udGFpbmVyJyk7XHJcbiAgICBpdGVtQ2FsLmNsYXNzTGlzdC5hZGQoJ2NhbGVuZGFyLWl0ZW0nKTtcclxuICAgIHRpdGxlQ2FsLmNsYXNzTGlzdC5hZGQoJ2NhbGVuZGFyLW1vbnRoJyk7XHJcbiAgICB0YWJsZUNhbC5jbGFzc0xpc3QuYWRkKCdjYWxlbmRhci10YmwnKTtcclxuICAgIHRpdGxlQ2FsLmlubmVySFRNTCA9IHRoaXMubW9udGhTaG93O1xyXG4gICAgdGhpcy5kYXlPZldlZWsuZm9yRWFjaCgoZWxlbWVudDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGhlYWRJdGVtICs9IGA8dGggY2xhc3M9XCJkYXlzX3RoXCI+JHtlbGVtZW50fTwvdGg+YDtcclxuICAgIH0pO1xyXG4gICAgaGVhZFRhYmxlLmlubmVySFRNTCA9IGA8dHI+JHtoZWFkSXRlbX08L3RyPmA7XHJcbiAgICB0YWJsZUNhbC5hcHBlbmRDaGlsZChoZWFkVGFibGUpO1xyXG4gICAgdGFibGVDYWwuYXBwZW5kQ2hpbGQoYm9keVRhYmxlKTtcclxuICAgIGl0ZW1DYWwuYXBwZW5kQ2hpbGQodGl0bGVDYWwpO1xyXG4gICAgaXRlbUNhbC5hcHBlbmRDaGlsZCh0YWJsZUNhbCk7XHJcbiAgICBtYWluQ2FsLmFwcGVuZENoaWxkKGl0ZW1DYWwpO1xyXG4gICAgaWYgKGNhbGVuZGFyRSkge1xyXG4gICAgICBjYWxlbmRhckUuYXBwZW5kQ2hpbGQobWFpbkNhbCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBwcml2YXRlIHJlbmRlckRheXMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBib2R5VGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xyXG4gICAgbGV0IGJvZHlJbm5lciA9ICcnO1xyXG4gICAgY29uc3QgYXJyID0gdGhpcy5nZXREYXlzT2ZmTW9udGgoKTtcclxuICAgIGFyci5mb3JFYWNoKChpdGVtLCBpZHgpID0+IHtcclxuICAgICAgY29uc3QgY29sID0gaWR4ICsgMTtcclxuICAgICAgY29uc3QgY2xhc3NOYW1lID0gaXRlbSA9PT0gMCA/ICdkYXlzX3RkIGVtcHR5JyA6ICdkYXlzX3RkJztcclxuICAgICAgY29uc3QgY29sRWwgPSBgPHRkIGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+JHtpdGVtID09PSAwID8gJycgOiBgIDxkaXYgY2xhc3M9XCJkYXlzX2lubmVyXCI+JHtpdGVtfTwvZGl2PmB9PC90ZD5gO1xyXG4gICAgICBpZiAoY29sID09PSAxIHx8IGNvbCAlIDcgPT09IDEpIHtcclxuICAgICAgICBib2R5SW5uZXIgKz0gYDx0cj4ke2NvbEVsfWA7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29sICUgNyA9PT0gMCkge1xyXG4gICAgICAgIGJvZHlJbm5lciArPSBgJHtjb2xFbH08L3RyPmA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYm9keUlubmVyICs9IGAke2NvbEVsfWA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYm9keVRhYmxlLmlubmVySFRNTCA9IGJvZHlJbm5lcjtcclxuICAgIHJldHVybiBib2R5VGFibGU7XHJcbiAgfTtcclxuICBwcml2YXRlIGdldEN1cnJlbnRNb250aCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgY3VycmVudFllYXIgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCBjdXJyZW50TW9udGggPSBkLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgcmV0dXJuIGAke2N1cnJlbnRZZWFyfS8ke2N1cnJlbnRNb250aH0vMWA7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBnZXREYXlzSW5Nb250aCA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IGRhdGVPZk1vbnRoOiBudW1iZXIgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMCkuZ2V0RGF0ZSgpO1xyXG4gICAgcmV0dXJuIGRhdGVPZk1vbnRoO1xyXG4gIH07XHJcblxyXG4gIGNyZWF0ZUFycmF5TnVtYmVyID0gKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSA9PiB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShBcnJheS5mcm9tKEFycmF5KE1hdGguY2VpbChlbmQgLSBzdGFydCArIDEpKS5rZXlzKCkpLCAoeCkgPT4gc3RhcnQgKyB4KTtcclxuICB9O1xyXG4gIHByaXZhdGUgZ2V0RGF5T2ZXZWVrID0gKGRhdGU6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgcmV0dXJuIGQuZ2V0RGF5KCk7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBnZXREYXlzT2ZmTW9udGggPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUodGhpcy5tb250aFNob3cpO1xyXG4gICAgY29uc3QgeWVhcjogbnVtYmVyID0gZC5nZXRGdWxsWWVhcigpO1xyXG4gICAgY29uc3QgbW9udGg6IG51bWJlciA9IGQuZ2V0TW9udGgoKSArIDE7XHJcbiAgICBjb25zdCBmaXJzdERheTogc3RyaW5nID0gYCR7eWVhcn0vJHttb250aH0vMWA7XHJcbiAgICBjb25zdCBmaXJzdERheU9mV2VlazogbnVtYmVyID0gdGhpcy5nZXREYXlPZldlZWsoZmlyc3REYXkpO1xyXG4gICAgY29uc3QgcHJldlllYXI6IG51bWJlciA9IG1vbnRoID09PSAxMiA/IHllYXIgLSAxIDogeWVhcjtcclxuICAgIGNvbnN0IHByZXZNb250aCA9IG1vbnRoID09PSAxID8gMTIgOiBtb250aCAtIDE7XHJcbiAgICBjb25zdCB0b3RhbERheXM6IG51bWJlciA9IHRoaXMuZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpO1xyXG4gICAgY29uc3QgY3VycmVudERheXM6IG51bWJlcltdID0gdGhpcy5jcmVhdGVBcnJheU51bWJlcigxLCB0b3RhbERheXMpO1xyXG4gICAgY29uc3QgcHJlRGF5czogbnVtYmVyW10gPSB0aGlzLmdldERheXNPZmZQcmV2TW9udGgoZmlyc3REYXlPZldlZWssIHByZXZZZWFyLCBwcmV2TW9udGgpO1xyXG4gICAgY29uc3QgY291bnREYXlzOiBudW1iZXIgPSA0MiAtIGN1cnJlbnREYXlzLmxlbmd0aCAtIHByZURheXMubGVuZ3RoO1xyXG4gICAgY29uc3QgbmV4dERheXM6IG51bWJlcltdID0gdGhpcy5nZXREYXlzT2ZmTmV4dE1vbnRoKGNvdW50RGF5cyk7XHJcblxyXG4gICAgcmV0dXJuIFsuLi5wcmVEYXlzLCAuLi5jdXJyZW50RGF5cywgLi4ubmV4dERheXNdO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgZ2V0RGF5c09mZlByZXZNb250aCA9IChjdXJyZW50Rmlyc3Q6IG51bWJlciwgeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBhcnJaZXJvID0gQXJyYXkoY3VycmVudEZpcnN0KS5maWxsKDApO1xyXG4gICAgaWYgKHRoaXMub25seU1vbnRoIHx8IGN1cnJlbnRGaXJzdCA9PT0gMCkgcmV0dXJuIGFyclplcm87XHJcbiAgICBjb25zdCB0b3RhbERheXM6IG51bWJlciA9IHRoaXMuZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpO1xyXG4gICAgY29uc3Qgc3RhcnQ6IG51bWJlciA9IHRvdGFsRGF5cyAtIGN1cnJlbnRGaXJzdCArIDE7XHJcbiAgICBjb25zdCBhcnJEYXlzOiBudW1iZXJbXSA9IHRoaXMuY3JlYXRlQXJyYXlOdW1iZXIoc3RhcnQsIHRvdGFsRGF5cyk7XHJcbiAgICByZXR1cm4gYXJyRGF5cztcclxuICB9O1xyXG5cclxuICBwcml2YXRlIGdldERheXNPZmZOZXh0TW9udGggPSAoY291bnREYXlzOiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IGFyclplcm8gPSBBcnJheShjb3VudERheXMpLmZpbGwoMCk7XHJcbiAgICBpZiAodGhpcy5vbmx5TW9udGggfHwgY291bnREYXlzID09PSAwKSByZXR1cm4gYXJyWmVybztcclxuICAgIGNvbnN0IGFyckRheXM6IG51bWJlcltdID0gdGhpcy5jcmVhdGVBcnJheU51bWJlcigxLCBjb3VudERheXMpO1xyXG5cclxuICAgIHJldHVybiBhcnJEYXlzO1xyXG4gIH07XHJcbn0iLCJpbXBvcnQgQ2FsZW5kYXJVSSBmcm9tIFwiLi9DYWxlbmRhclVJXCI7XHJcbmludGVyZmFjZSBNcmJDYWxPcHRpb24ge1xyXG4gIHN0YXJ0TW9udGg/OiBzdHJpbmc7XHJcbiAgZW5kTW9udGg/OiBzdHJpbmcgO1xyXG4gIG9ubHlNb250aD86IGJvb2xlYW4sXHJcbiAgdmlld01vbnRocz86IG51bWJlcjtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNcmJDYWwge1xyXG4gIHByaXZhdGUgdWk6IENhbGVuZGFyVUk7XHJcbiAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnRbXTtcclxuICBwcml2YXRlIG9wdGlvbjogTXJiQ2FsT3B0aW9uXHJcbiAgY29uc3RydWN0b3IoZWw6IHN0cmluZyB8IEhUTUxFbGVtZW50W10sIG9wdGlvbj86IE1yYkNhbE9wdGlvbikge1xyXG4gICAgdGhpcy51aSA9IG5ldyBDYWxlbmRhclVJKClcclxuICAgIGlmKCFvcHRpb24pIHtcclxuICAgICAgdGhpcy5vcHRpb24gPSB7XHJcbiAgICAgICAgc3RhcnRNb250aDogdGhpcy5nZXRTdGFydCgpLFxyXG4gICAgICAgIGVuZE1vbnRoOidpbmZpbml0eSAnLFxyXG4gICAgICAgIG9ubHlNb250aDogZmFsc2UsXHJcbiAgICAgICAgdmlld01vbnRoczogMVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5vcHRpb24gPSB7XHJcbiAgICAgICAgc3RhcnRNb250aDogb3B0aW9uLnN0YXJ0TW9udGggfHwgdGhpcy5nZXRTdGFydCgpLFxyXG4gICAgICAgIGVuZE1vbnRoOiBvcHRpb24uZW5kTW9udGggfHwgJ2luZmluaXR5ICcsXHJcbiAgICAgICAgb25seU1vbnRoOiBvcHRpb24ub25seU1vbnRoIHx8IGZhbHNlLFxyXG4gICAgICAgIHZpZXdNb250aHM6IG9wdGlvbi52aWV3TW9udGhzIHx8IDFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyB0aGlzLm9wdGlvbiA9IFxyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5vcHRpb24pO1xyXG4gICAgXHJcbiAgICBpZih0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRoaXMuZWwgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsKSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmVsID0gZWxcclxuICAgIH0gIFxyXG4gICAgdGhpcy51aS5pbml0KHRoaXMub3B0aW9uKVxyXG4gICAgXHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0U3RhcnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IGZ1bGxZZWFyPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICByZXR1cm4gYCR7ZnVsbFllYXJ9LSR7bW9udGh9YFxyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IE1yYkNhbCAgZnJvbSAnLi9pbmRleCc7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICBuZXcgTXJiQ2FsKCcuY2FsZW5kYXInKVxyXG59KSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy90ZXN0LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9