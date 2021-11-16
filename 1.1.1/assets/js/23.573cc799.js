(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{450:function(n,t,a){"use strict";a.r(t);var o=a(14),e=Object(o.a)({},(function(){var n=this.$createElement,t=this._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[t("h1",{attrs:{id:"fetch-data"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fetch-data"}},[this._v("#")]),this._v(" Fetch data")]),this._v(" "),t("chart-editor",{attrs:{code:"// <block:data:2>\nconst start = new Date().valueOf();\nconst end = start + 1000 * 60 * 60 * 24 * 2;\nconst allData = [];\nlet y = 100;\nfor (let x = start; x <= end; x += 1000) {\n  y += 5 - Math.random() * 10;\n  allData.push({x, y});\n}\n\nfunction fetchData(x1, x2) {\n  const step = Math.max(1, Math.round((x2 - x1) / 100000));\n  const data = [];\n  let i = 0;\n  while (i < allData.length && allData[i].x < x1) {\n    i++;\n  }\n  while (i < allData.length && allData[i].x <= x2) {\n    data.push(allData[i]);\n    i += step;\n  }\n  return data;\n}\n// </block:data>\n\n// <block:fetch:1>\nlet timer;\nfunction startFetch({chart}) {\n  const {min, max} = chart.scales.x;\n  clearTimeout(timer);\n  timer = setTimeout(() => {\n    console.log('Fetched data between ' + min + ' and ' + max);\n    chart.data.datasets[0].data = fetchData(min, max);\n    chart.stop(); // make sure animations are not running\n    chart.update('none');\n  }, 500);\n}\n// </block:fetch>\n\n// <block:scales:3>\nconst scales = {\n  x: {\n    position: 'bottom',\n    min: start,\n    max: end,\n    type: 'time',\n    ticks: {\n      autoSkip: true,\n      autoSkipPadding: 50,\n      maxRotation: 0\n    },\n    time: {\n      displayFormats: {\n        hour: 'HH:mm',\n        minute: 'HH:mm',\n        second: 'HH:mm:ss'\n      }\n    }\n  },\n  y: {\n    type: 'linear',\n    position: 'left',\n  },\n};\n// </block:scales>\n\n// <block:zoom:0>\nconst zoomOptions = {\n  limits: {\n    x: {min: 'original', max: 'original', minRange: 60 * 1000},\n  },\n  pan: {\n    enabled: true,\n    mode: 'x',\n    modifierKey: 'ctrl',\n    onPanComplete: startFetch\n  },\n  zoom: {\n    wheel: {\n      enabled: true,\n    },\n    drag: {\n      enabled: true,\n    },\n    pinch: {\n      enabled: true\n    },\n    mode: 'x',\n    onZoomComplete: startFetch\n  }\n};\n// </block:zoom>\n\nconst zoomStatus = (chart) => 'zoom level: ' + chart.getZoomLevel() + '';\n\n// <block:config:1>\nconst config = {\n  type: 'line',\n  data: {\n    datasets: [{\n      label: 'My First dataset',\n      borderColor: Utils.randomColor(0.4),\n      backgroundColor: Utils.randomColor(0.1),\n      pointBorderColor: Utils.randomColor(0.7),\n      pointBackgroundColor: Utils.randomColor(0.5),\n      pointBorderWidth: 1,\n      data: fetchData(start, end),\n    }]\n  },\n  options: {\n    scales: scales,\n    plugins: {\n      zoom: zoomOptions,\n      title: {\n        display: true,\n        position: 'bottom',\n        text: (ctx) => zoomStatus(ctx.chart)\n      }\n    },\n    transitions: {\n      zoom: {\n        animation: {\n          duration: 100\n        }\n      }\n    }\n  }\n};\n// </block:config>\n\nconst actions = [\n  {\n    name: 'Reset zoom',\n    handler(chart) {\n      chart.resetZoom('zoom');\n    }\n  }\n];\n\nmodule.exports = {\n  actions,\n  config,\n  output: 'console.log output'\n};\n"}})],1)}),[],!1,null,null,null);t.default=e.exports}}]);