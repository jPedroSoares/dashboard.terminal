const percent_Ram = [70, 71.8, 72.4, 65.3, 72, 75.1, 74.4, 72.5, 68.8, 69.9, 68.5, 67.7, 68.9, 66.6]
const percent_CPU = [12.1, 8.6, 10.4, 11.3, 10.2 , 9.1, 9.4, 9.5, 8.8, 7.9, 7.5, 7.7, 9.9, 9.6]
const lineData = [ 
    { title: 'RAM',
    x: [],
    y: [],
    style: { line: 'red' }
   },
   { 
    title: 'CPU',
    y: [],
    style: { line: 'green' }
   }]

const updatePage1 = function(lineGraph, ramGraph, cpuGraph, screen) {
    const position = Math.floor(Math.random() * (13 - 0 + 1)) + 0;
    ramGraph.setData([{label: 'RAM', percent: percent_Ram[position], color: 'red'}])
    cpuGraph.setData([{label: 'CPU', percent: percent_CPU[position], color: 'green'}])
    lineData[0].y.push(percent_Ram[position]);
    lineData[0].x.push(new Date().toLocaleTimeString().split(' ')[0]);
    lineData[1].y.push(percent_CPU[position]);
    lineGraph.setData(lineData)
    screen.render()
}

module.exports = {
    updatePage1
}