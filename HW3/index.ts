/// <reference path="globals.d.ts" />


let data: [string, number][] = [
    ['January', 10000],
    ['February', 3000],
    ['March', 4000],
    ['April', 5000],
    ['May', 7000],
    ['June', 4000]
]

function getMaxOfArray(numArray: Array<number>): number {
    return Math.max.apply(null, numArray);
}

class BarGraph {
    base: number;
    data_: [string, number][];

    constructor(data: [string, number][]) {
        this.data_ = data;
        this.base = getMaxOfArray(this.data_.map(el => el[1]));
        let container: HTMLElement | null = document.getElementById('field_rend')
        let coordinateX: HTMLElement | null = document.getElementById('x_coord_rend')

        let coordinateY: HTMLElement | null = document.getElementById('y_coord_rend')

        let span1: HTMLSpanElement = document.createElement("span");
        span1.innerText = `${this.base}`;
        let span2: HTMLSpanElement = document.createElement("span");
        span2.innerText = `${this.base / 2}`;
        coordinateY!.append(span1, span2, document.createElement("span"));
        let i: number = 9;
        this.data_.forEach(el => {
            i--
            let element: HTMLDivElement = document.createElement("div");
            element.classList.add('w-20', `bg-red-${i}00`);
            element.style.height = `${Math.round(el[1] / this.base * 100)}%`;
            container!.append(element);

            let coord_x: HTMLSpanElement = document.createElement("span");
            coord_x.classList.add('inline-block', 'w-20', 'text-center');
            coord_x.innerText = el[0];
            coordinateX!.append(coord_x);

        })
    }
}

abstract class DrawCharts {
    readonly canvas: HTMLCanvasElement;
    readonly data_: [string, number][];
    protected base: number;
    readonly context: CanvasRenderingContext2D;


    protected constructor(data: [string, number][], id_canvas: string) {
        let canvas = document.getElementById(id_canvas) as HTMLCanvasElement;
        let context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';

        this.canvas = canvas;
        this.context = context;
        this.data_ = data;
    }

    abstract draw(data: [string, number][]): void;
}

class Schedule extends DrawCharts {

    constructor(data: [string, number][], id_canvas: string) {
        super(data, id_canvas);

        this.base = getMaxOfArray(this.data_.map(el => el[1]));
        let context = this.context;
        context.beginPath();                                     // y-axis drawing
        context.lineWidth = 1;
        context.moveTo(30, 470);
        context.lineTo(30, 30);
        context.lineTo(27, 40);
        context.lineTo(33, 40);
        context.lineTo(30, 30);
        context.fill();
        context.stroke();

        context.moveTo(30, 470);                          // x-axis drawing
        context.lineTo(470, 470);
        context.lineTo(460, 467);
        context.lineTo(460, 473);
        context.lineTo(470, 470);
        context.fill();
        context.stroke();
        context.closePath();

        this.draw(this.data_);

    }

    draw(data: [string, number][]): void {

        let context = this.context;
        let deltaX: number = this.canvas.width / data.length;
        for (let i = 0; i < data.length; ++i) {
            context.beginPath();
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.setLineDash([2, 0]);
            context.moveTo(deltaX * i + 50, 400 - data[i][1] / this.base * 400 + 50);
            data[i + 1] ? context.lineTo(deltaX * (i + 1) + 50, 400 - data[i + 1][1] / this.base * 400 + 50) : context.lineTo(deltaX * (i) + 50, 400 - data[i][1] / this.base * 400 + 50);
            context.stroke();

            context.beginPath();
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.setLineDash([4, 8]);
            context.moveTo(deltaX * i + 50, 400 - data[i][1] / this.base * 400 + 50);
            context.lineTo(30, 400 - data[i][1] / this.base * 400 + 50);
            context.font = "8px Verdana";
            context.fillText(`${data[i][1]}`, 5, 400 - data[i][1] / this.base * 400 + 50);
            context.stroke();

            context.beginPath();
            context.lineWidth = 1;
            context.setLineDash([4, 8]);
            context.moveTo(deltaX * i + 50, 400 - data[i][1] / this.base * 400 + 50);
            context.lineTo(deltaX * i + 50, 470);
            context.font = "8px Verdana";
            context.fillText(`${data[i][0]}`, deltaX * i + 50, 490);
            context.stroke();
        }
        context.closePath();
    }
}

function randomColor(data: [string, number][], i: number): string {
    return `rgb(${Math.floor(255 / data.length * i)},${Math.floor(255 / data.length * i)}, ${Math.floor(255 - 255 / data.length * i)})`;
}

class PieChart extends DrawCharts {

    constructor(data: [string, number][], id_canvas: string) {
        super(data, id_canvas);
        this.base = 0;
        let legend: HTMLElement | null = document.getElementById('legend')
        let legendHTML: string = '';
        for (let i = 0; i < data.length; i++) {
            this.base += Number(data[i][1]);
            legendHTML += "<div class='flex justify-center '><span style='display:inline-block;width:40px;margin-right: 10px; margin-bottom: 2px; background-color:" + randomColor(data, i) +
                ";'>&nbsp;</span> " + "<span style='display:inline-block;width:80px;text-align:left;'>" + data[i][0] + "</span></div>";
        }
        legend.innerHTML = legendHTML;
        this.draw(this.data_);
    }

    draw(data: [string, number][]): void {
        let context = this.context;
        let start_angle: number = 0;


        for (let i = 0; i < data.length; ++i) {
            let slice_angle = 2 * Math.PI * data[i][1] / this.base;

            context.beginPath();
            context.fillStyle = randomColor(data, i);
            context.moveTo(250, 250);
            context.arc(250, 250, 200, start_angle, start_angle + slice_angle);
            context.stroke();
            context.fill();

            context.beginPath();
            context.font = "16px Verdana";
            context.fillStyle = "white";
            context.fillText(`${Math.round(data[i][1] / this.base * 100)}%`, Math.floor(this.canvas.width / 2 + (200 / 2) * Math.cos(start_angle + slice_angle / 2)), Math.floor(this.canvas.height / 2 + (200 / 2) * Math.sin(start_angle + slice_angle / 2)));
            context.stroke();
            context.closePath();
            context.fill();
            start_angle += slice_angle;
        }
    }
}

new BarGraph(data);
new Schedule(data, 'canvas1');
new PieChart(data, 'canvas2');

// use https://www.anychart.com/ru/
anychart.onDocumentLoad(function () {
    var chart = anychart.column(data);
    chart.title("AnyChart BarGraph");
    chart.container("container1").draw();
});

anychart.onDocumentLoad(function () {
    var chart = anychart.pie(data);
    chart.title("AnyChart: PieChart");
    chart.container("container2").draw();
});

anychart.onDocumentLoad(function () {

    var chart = anychart.line(data);
    chart.title("AnyChart: Schedule");
    chart.container("container3").draw();
});


class PaintBlack {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private paint: boolean;

    private clickX: number[] = [];
    private clickY: number[] = [];
    private clickDrag: boolean[] = [];

    constructor() {
        let canvas = document.getElementById('canvas3') as HTMLCanvasElement;
        let context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;

        this.canvas = canvas;
        this.context = context;

        this.redraw();
        this.createUserEvents();
    }

    private createUserEvents() {
        let canvas = this.canvas;
        canvas.addEventListener('mousedown', this.pressEventHandler);
        canvas.addEventListener('mousemove', this.dragEventHandler);
        canvas.addEventListener('mouseup', this.releaseEventHandler);
        canvas.addEventListener('mouseout', this.cancelEventHandler);

        canvas.addEventListener('touchstart', this.pressEventHandler);
        canvas.addEventListener('touchmove', this.dragEventHandler);
        canvas.addEventListener('touchend', this.releaseEventHandler);
        canvas.addEventListener('touchcancel', this.cancelEventHandler);

        document.getElementById('clear').addEventListener('click', this.clearEventHandler)
    }

    redraw() {
        let clickX = this.clickX;
        let context = this.context;
        let clickDrag = this.clickDrag;
        let clickY = this.clickY;
        for (let i = 0; i < clickX.length; ++i) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }

            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
        context.closePath();
    }

    private addClick(x: number, y: number, dragging: boolean) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    private clearCanvas() {
        this.context
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    }

    private clearEventHandler = () => {
        this.clearCanvas();
    }

    private releaseEventHandler = () => {
        this.paint = false;
        this.redraw();
    }

    private cancelEventHandler = () => {
        this.paint = false;
    }
    private pressEventHandler = (e: MouseEvent | TouchEvent) => {
        let mouseX = (e as TouchEvent).changedTouches ?
            (e as TouchEvent).changedTouches[0].pageX :
            (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches ?
            (e as TouchEvent).changedTouches[0].pageY :
            (e as MouseEvent).pageY;
        mouseX -= this.canvas.offsetLeft;
        mouseY -= this.canvas.offsetTop;

        this.paint = true;
        this.addClick(mouseX, mouseY, false);
        this.redraw();
    }

    private dragEventHandler = (e: MouseEvent | TouchEvent) => {
        let mouseX = (e as TouchEvent).changedTouches ?
            (e as TouchEvent).changedTouches[0].pageX :
            (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches ?
            (e as TouchEvent).changedTouches[0].pageY :
            (e as MouseEvent).pageY;
        mouseX -= this.canvas.offsetLeft;
        mouseY -= this.canvas.offsetTop;

        if (this.paint) {
            this.addClick(mouseX, mouseY, true);
            this.redraw();
        }

        e.preventDefault();
    }
}

new PaintBlack();



