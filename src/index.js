const blessed = require('blessed');
const contrib = require('../');
const screen = blessed.screen();
const stPage = new contrib.grid({rows: 2, cols: 2, screen: screen})
const ndPage = new contrib.grid({rows: 4, cols: 4, screen: screen})
const config = require('./configs')

let donutRam, line, donutCPU, page = 0;
function firstPage() {
    page = 1;
    line = stPage.set(0,0,1,2, contrib.line, {
        width: 80,
        height: 30, 
        left: 10,
        top: 10,
        label: 'Total utilizado',
        showLegend: true,
        legend: {width: 12},
    });

    donutRam = stPage.set(1, 0, 1, 1, contrib.donut, 
    {
        label: 'Percentual utilizado',
        radius: 30,
        arcWidth: 10,
        yPadding: 0,
    });

    donutCPU = stPage.set(1, 1, 1, 1, contrib.donut, 
        {
            label: 'Percentual utilizado',
            radius: 30,
            arcWidth: 10,
            yPadding: 0,
        });
        setInterval(function () {
            if(page == 1){
                config.updatePage1(line, donutRam, donutCPU, screen);
            }
        }, 1000)
}

function secondPage() {
    page = 2;
    ndPage.set(0, 0, 1, 2, contrib.table, 
        { 
            label: 'Dados da máquina',
            columnSpacing: 2,
            columnWidth: [30, 50, 10],
            selectedBg: 'trasparent',
            data:  { 
                headers: ['Nome da máquina: Joao'], 
                data:
                [ 
                ['Squad:', 'Alpha']
                , ['Processador:', 'Intel® Core™ i7-8750H Processor 9M Cache, up to 4.10 GHz']
                , ['Espaço máximo do disco:','1TB']
                , ['Tipo de sistema: ', 'Sistema operacional de 64 bits'] 
                ]
            }
        })
    ndPage.set(1, 0, 1, 1, contrib.lcd,
        {
          label: "Memória Ram",
          segmentWidth: 0.06,
          segmentInterval: 0.11,
          strokeWidth: 0.1,
          elements: 5,
          display: ''+8+' G'+'B',
          elementSpacing: 4,
          elementPadding: 2
        })
    ndPage.set(1, 1, 1, 1, contrib.gauge, 
        {
            label: 'Storage', 
            percent: [83,17]
        })
    ndPage.set(2, 0, 2, 4, contrib.table, 
        { 
            keys: true,
            fg: 'green',
            label: 'Processos mais utilizados',
            columnSpacing: 1,
            selectedBg: 'trasparent',
            columnWidth: [150, 10, 10],
            data:  { 
                headers: ['Descrição', 'PID'], 
                data:
                [ ['code', 10645]
                , ['bash', 10484]
                , ['chrome', 10841]
                , ['Slack', 10332]
                , ['Spotify', 10444]
                , ['Insomnia', 10665]
            ]
            }        
        })
}

var carousel = new contrib.carousel( [firstPage, secondPage]
    , { screen: screen
      , controlKeys: true })
carousel.start()

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
