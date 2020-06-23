export const ChartInfo = [
    {
      month: 0, year:2019, dueDate: 5, quality: 3, quantity: 9, total: 17
    }, {
      month: 1, year:2019, dueDate: 1, quality: 1, quantity: 2, total: 4
    }, {
      month: 2, year:2019, dueDate: 2, quality: 1, quantity: 3, total: 6
    }, {
      month: 3, year:2019, dueDate: 4, quality: 0, quantity: 5, total: 9
    }, {
      month: 4, year:2019, dueDate: 0, quality: 0, quantity: 1, total: 1
    }, {
      month: 5, year:2019, dueDate: 1, quality: 2, quantity: 0, total: 3
    }, {
      month: 6, year:2019, dueDate: 2, quality: 0, quantity: 4, total: 6
    }, {
      month: 7, year:2019, dueDate: 4, quality: 0, quantity: 2, total: 6
    }, {
      month: 8, year:2019, dueDate: 5, quality: 1, quantity: 1, total: 7
    }, {
      month: 9, year:2019, dueDate: 3, quality: 1, quantity: 0, total: 4
    }, {
      month: 10, year:2019, dueDate: 8, quality: 2, quantity: 1, total: 11
    }, {
      month: 11, year:2019, dueDate: 10, quality: 0, quantity: 3, total: 13
    }
  ];

  export const causesCount = [
    {
      year: 2014,
      countDD: 35,
      countQLT: 9,
      countQNT: 27
    },
    {
      year: 2015,
      countDD: 28,
      countQLT: 4,
      countQNT: 12
    }, 
    {
      year: 2016,
      countDD: 18,
      countQLT: 7,
      countQNT: 10
    },
    {
      year: 2017,
      countDD: 17,
      countQLT: 4,
      countQNT: 5
    },
    {
      year: 2018,
      countDD: 18,
      countQLT: 6,
      countQNT: 15
    },
    {
      year: 2019,
      countDD: 45,
      countQLT: 11,
      countQNT: 31
    }
  ];

  export const yearCount = [
    {
      cause: "Late date",
      reports: [{
        status: "Solved",
        year: 2014,
        count: 31
      },{
        status: "Solved",
        year: 2015,
        count: 26
      },{
        status: "Solved",
        year: 2016,
        count: 17
      },{
        status: "Solved",
        year: 2017,
        count: 17
      },{
        status: "Solved",
        year: 2018,
        count: 15
      },{
        status: "Solved",
        year: 2019,
        count: 43
      },
      {
        status: "Unsolved",
        year: 2014,
        count: 4
      },{
        status: "Unsolved",
        year: 2015,
        count: 2
      },{
        status: "Unsolved",
        year: 2016,
        count: 1
      },{
        status: "Unsolved",
        year: 2017,
        count: 0
      },{
        status: "Unsolved",
        year: 2018,
        count: 3
      },{
        status: "Unsolved",
        year: 2019,
        count: 2
      }]
    },{
      cause: "Bad quality",
      reports: [{
        status: "Solved",
        year: 2014,
        count: 8
      },{
        status: "Solved",
        year: 2015,
        count: 4
      },{
        status: "Solved",
        year: 2016,
        count: 7
      },{
        status: "Solved",
        year: 2017,
        count: 2
      },{
        status: "Solved",
        year: 2018,
        count: 1
      },{
        status: "Solved",
        year: 2019,
        count: 8
      },
      {
        status: "Unsolved",
        year: 2014,
        count: 1
      },{
        status: "Unsolved",
        year: 2015,
        count: 0
      },{
        status: "Unsolved",
        year: 2016,
        count: 0
      },{
        status: "Unsolved",
        year: 2017,
        count: 2
      },{
        status: "Unsolved",
        year: 2018,
        count: 1
      },{
        status: "Unsolved",
        year: 2019,
        count: 3
      }]
    },{
      cause: "Low quantity",
      reports: [{
        status: "Solved",
        year: 2014,
        count: 20
      },{
        status: "Solved",
        year: 2015,
        count: 9
      },{
        status: "Solved",
        year: 2016,
        count: 8
      },{
        status: "Solved",
        year: 2017,
        count: 4
      },{
        status: "Solved",
        year: 2018,
        count: 13
      },{
        status: "Solved",
        year: 2019,
        count: 23
      },
      {
        status: "Unsolved",
        year: 2014,
        count: 7
      },{
        status: "Unsolved",
        year: 2015,
        count: 3
      },{
        status: "Unsolved",
        year: 2016,
        count: 2
      },{
        status: "Unsolved",
        year: 2017,
        count: 1
      },{
        status: "Unsolved",
        year: 2018,
        count: 2
      },{
        status: "Unsolved",
        year: 2019,
        count: 8
      }]
    },
  ];
    
  export const citiesCount = [
    {
      year: 2013,
      cities: [{
        cityName: 'Cairo',
        region: 'Africa',
        count: 20490,
      }, {
        cityName: 'Pretoria',
        region: 'Africa',
        count: 23130,
      }, {
        cityName: 'Melbourne',
        region: 'Australia',
        count: 45735,
      }, {
        cityName: 'Sydney',
        region: 'Australia',
        count: 55740,
      }, {
        cityName: 'Asuncion',
        region: 'South America',
        count: 22310,
      }, {
        cityName: 'Buenos Aires',
        region: 'South America',
        count: 32055,
      }, {
        cityName: 'Rio de Janeiro',
        region: 'South America',
        count: 43480,
      }, {
        cityName: 'Beijing',
        region: 'Asia',
        count: 71970,
      }, {
        cityName: 'Seoul',
        region: 'Asia',
        count: 47650,
      }, {
        cityName: 'Tokyo',
        region: 'Asia',
        count: 69570,
      }, {
        cityName: 'Denver',
        region: 'North America',
        count: 39600,
      }, {
        cityName: 'Edmonton',
        region: 'North America',
        count: 27820,
      }, {
        cityName: 'Los Angeles',
        region: 'North America',
        count: 49875,
      }, {
        cityName: 'New York',
        region: 'North America',
        count: 78270,
      }, {
        cityName: 'Vancouver',
        region: 'North America',
        count: 34080,
      }, {
        cityName: 'Berlin',
        region: 'Europe',
        count: 62450,
      }, {
        cityName: 'London',
        region: 'Europe',
        count: 59125,
      }, {
        cityName: 'Madrid',
        region: 'Europe',
        count: 38500,
      }, {
        cityName: 'Moscow',
        region: 'Europe',
        count: 55040,
      }],
    },
    {
      year: 2014,
      cities: [
        {
          cityName: 'Cairo',
          region: 'Africa',
          count: 22260,
        }, {
          cityName: 'Pretoria',
          region: 'Africa',
          count: 22940,
        }, {
          cityName: 'Melbourne',
          region: 'Australia',
          count: 37830,
        }, {
          cityName: 'Sydney',
          region: 'Australia',
          count: 38300,
        }, {
          cityName: 'Asuncion',
          region: 'South America',
          count: 25820,
        }, {
          cityName: 'Buenos Aires',
          region: 'South America',
          count: 41700,
        }, {
          cityName: 'Rio de Janeiro',
          region: 'South America',
          count: 32960,
        }, {
          cityName: 'Beijing',
          region: 'Asia',
          count: 80370,
        }, {
          cityName: 'Seoul',
          region: 'Asia',
          count: 63225,
        }, {
          cityName: 'Tokyo',
          region: 'Asia',
          count: 57270,
        }, {
          cityName: 'Denver',
          region: 'North America',
          count: 35010,
        }, {
          cityName: 'Edmonton',
          region: 'North America',
          count: 29250,
        }, {
          cityName: 'Los Angeles',
          region: 'North America',
          count: 49300,
        }, {
          cityName: 'New York',
          region: 'North America',
          count: 50790,
        }, {
          cityName: 'Vancouver',
          region: 'North America',
          count: 39855,
        }, {
          cityName: 'Berlin',
          region: 'Europe',
          count: 65675,
        }, {
          cityName: 'London',
          region: 'Europe',
          count: 65250,
        }, {
          cityName: 'Madrid',
          region: 'Europe',
          count: 43100,
        }, {
          cityName: 'Moscow',
          region: 'Europe',
          count: 42400,
        },
      ],
    },
    {
      year: 2015,
      cities: [{
        cityName: 'Cairo',
        region: 'Africa',
        count: 9670,
      }, {
        cityName: 'Pretoria',
        region: 'Africa',
        count: 12350,
      }, {
        cityName: 'Melbourne',
        region: 'Australia',
        count: 22470,
      }, {
        cityName: 'Sydney',
        region: 'Australia',
        count: 19800,
      }, {
        cityName: 'Asuncion',
        region: 'South America',
        count: 12630,
      }, {
        cityName: 'Buenos Aires',
        region: 'South America',
        count: 20445,
      }, {
        cityName: 'Rio de Janeiro',
        region: 'South America',
        count: 17240,
      }, {
        cityName: 'Beijing',
        region: 'Asia',
        count: 36720,
      }, {
        cityName: 'Seoul',
        region: 'Asia',
        count: 34200,
      }, {
        cityName: 'Tokyo',
        region: 'Asia',
        count: 40620,
      }, {
        cityName: 'Denver',
        region: 'North America',
        count: 6990,
      }, {
        cityName: 'Edmonton',
        region: 'North America',
        count: 11560,
      }, {
        cityName: 'Los Angeles',
        region: 'North America',
        count: 21375,
      }, {
        cityName: 'New York',
        region: 'North America',
        count: 22680,
      }, {
        cityName: 'Vancouver',
        region: 'North America',
        count: 10320,
      }, {
        cityName: 'Berlin',
        region: 'Europe',
        count: 33600,
      }, {
        cityName: 'London',
        region: 'Europe',
        count: 12475,
      }, {
        cityName: 'Madrid',
        region: 'Europe',
        count: 23580,
      }, {
        cityName: 'Moscow',
        region: 'Europe',
        count: 13980,
      },
],
    },
  ];
  

  export const regionsCount = [
    {
      region: 'Africa',
      count2013: 43620,
      count2014: 45200,
      count2015: 22020,
    },
    {
      region: 'North America',
      count2013: 229645,
      count2014: 204205,
      count2015: 72925,
    },
    {
      region: 'Australia',
      count2013: 101475,
      count2014: 76130,
      count2015: 42270,
    },
    {
      region: 'South America',
      count2013: 97845,
      count2014: 100480,
      count2015: 50315,
    },
    {
      region: 'Asia',
      count2013: 189190,
      count2014: 200865,
      count2015: 111540,
    },
    {
      region: 'Europe',
      count2013: 215115,
      count2014: 216425,
      count2015: 83635,
    },
  ];
  


/*
export const annualVehiclesSales = [
  { year: 2011, USA: 171763, China: 5070 },
  { year: 2012, USA: 53240, China: 9900 },
  { year: 2013, USA: 96700, China: 15340 },
  { year: 2014, USA: 118780, China: 73170 },
  { year: 2015, USA: 113870, China: 307380 },
  { year: 2016, USA: 159620, China: 336000 },
  { year: 2017, USA: 194479, China: 600174 },
];
*/
/*
        <div className={classes.group}>
          <AuxiliaryHover
            classes={classes}
            target={hover}
            enabled={tooltipEnabled}
            toggle={this.toggleTooltip}
          />
          <AuxiliarySelection
            classes={classes}
            target={selection[0]}
            clear={this.clearSelection}
            turnPrev={this.turnPrevSelection}
            turnNext={this.turnNextSelection}
          />
        </div>
*/