
let data: (string| number)[][] = [
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
        let container: HTMLElement = document.getElementById('field_rend')
        let coordinate: HTMLElement = document.getElementById('x_coord_rend')

        this.data_.forEach(el=>{
            let element: HTMLDivElement = document.createElement("div");
            element .classList.add('w-20', 'bg-red-600');
            element .style.height = `${Math.round(el[1]/this.base*100)}%`;
            container.append(element );

            let coord_x: HTMLSpanElement = document.createElement("span");
            coord_x.innerText = el[0];
            coordinate.append(coord_x );

        })
    }
}

let schedule: Schedule = new Schedule(data);