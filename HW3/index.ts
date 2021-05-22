import {Chart, Point} from 'chart.js';


let data = [
    ['January', 10000],
    ['February', 3000],
    ['March', 4000],
    ['April', 5000],
    ['May', 7000]
]

function getMaxOfArray(numArray: Array<number>): number {
    return Math.max.apply(null, numArray);
}

class Schedule {
    base: number;
    data_: Array<object>;
    constructor(data: (string| number)[][]) {
        this.data_ = data;
        this.base = getMaxOfArray(this.data_.map(el=>el[1]));
        let container: HTMLElement|null = document.getElementById('field_rend')
        let coordinateX: HTMLElement|null = document.getElementById('x_coord_rend')

        let coordinateY: HTMLElement|null = document.getElementById('y_coord_rend')

        let span1: HTMLSpanElement = document.createElement("span");
        span1.innerText = `${this.base}`;
        let span2: HTMLSpanElement = document.createElement("span");
        span2.innerText = `${this.base/2}`;
        coordinateY!.append(span1, span2, document.createElement("span"));

        this.data_.forEach(el=>{
            let element: HTMLDivElement = document.createElement("div");
            element.classList.add('w-20', 'bg-red-600');
            element.style.height = `${Math.round(el[1]/this.base*100)}%`;
            container!.append(element );

            let coord_x: HTMLSpanElement = document.createElement("span");
            coord_x.classList.add('inline-block', 'w-20', 'text-center');
            coord_x.innerText = el[0];
            coordinateX!.append(coord_x );

        })
    }
}

class PieChart {
    data_: Array<object>;
    constructor(data: (string| number)[][]) {
        this.data_ = data;

    }
}



let schedule: Schedule = new Schedule(data);