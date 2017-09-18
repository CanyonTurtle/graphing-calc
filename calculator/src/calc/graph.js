import Theme from '../themes'

const graphFunc = function (fun, domainLeft, domainRight, ctx) {
  // color theme.
  let theme = Theme

  // domainLeft = domainLeft || 0
  // domainRight = domainRight || 0
  // hard-coded function
  fun = (x) => (50 * Math.sin(x * 0.1))

  ctx.$d3.select('svg').remove()
  // TODO write axis labels and scale

  var graphGrain = Math.abs(domainRight - domainLeft) * 0.01

  // evaluate mock functions.
  var globalMaxY = 0
  var globalMinY = 0

  var updateMaxY = function (newY) {
    if (newY > globalMaxY) {
      globalMaxY = newY
    }
  }

  var updateMinY = function (newY) {
    if (newY < globalMinY) {
      globalMinY = newY
    }
  }

  var sinePoints = []
  for (let i = domainLeft; i <= domainRight; i += graphGrain) {
    let y = 50 * Math.sin(0.1 * i)
    updateMaxY(y)
    updateMinY(y)
    sinePoints.push([i, y])
  }
  let y = 50 * Math.sin(0.1 * domainRight)

  sinePoints.push([domainRight, y])
  var sineDerivativePoints = []
  for (let i = domainLeft; i <= domainRight; i += graphGrain) {
    sineDerivativePoints.push([i, 50 * Math.cos(i / 10) * 0.1])
  }
  var sineDoubleDerivativePoints = []
  for (let i = domainLeft; i <= domainRight; i += graphGrain) {
    sineDoubleDerivativePoints.push([i, -50 * Math.sin(i / 10) * 0.1 * 0.1])
  }

  let graphHtml = ctx.$d3.select('.graph-area')
  let graphBox = graphHtml.node().getBoundingClientRect()
  let maxEdge = (graphBox.width < graphBox.height) ? graphBox.width : graphBox.height

  var nX = 10
  var nY = 10

  var visibleDomainLeft = domainLeft - 0.1 * Math.abs(domainRight - domainLeft)
  var visibleDomainRight = domainRight + 0.1 * Math.abs(domainRight - domainLeft)

//   var visibleDomainLeft = 0
//   var visibleDomainRight = 0
  // if (domainLeft > 0) {
  //   visibleDomainLeft = 0
  // } else {
  //   visibleDomainLeft = domainLeft
  // }
  // if (domainRight < 0) {
  //   visibleDomainRight = 0
  // } else {
  //   visibleDomainRight = domainRight
  // }

  // the domain affects the scale of the x axis, and the placement of the Y axis.
  var domainSize = visibleDomainRight - visibleDomainLeft
  var numToGridTickX = maxEdge / domainSize

  var xToScale = function (oldX) {
    var newX = (oldX - visibleDomainLeft) * numToGridTickX
    return newX
  }

  // range view gets smaller with large domain

  let domainAbsSize = Math.abs(domainSize)
  var biggerGlobalY = globalMaxY * domainAbsSize * 0.01
  var smallerGlobalY = globalMinY * domainAbsSize * 0.01

  if (biggerGlobalY > globalMaxY) {
    globalMaxY = biggerGlobalY
  } else {
    globalMaxY += domainAbsSize * 0.5
  }
  if (smallerGlobalY < globalMinY) {
    globalMinY = smallerGlobalY
  } else {
    globalMinY -= domainAbsSize * 0.5
  }

  // globalMaxY = globalMaxY * domainSize * 0.1
  // globalMinY = globalMinY * domainSize * 0.1

  var rangeSize = (globalMaxY - globalMinY)
  var numToGridTickY = maxEdge / rangeSize

  var yToScale = function (oldY) {
    var newY = (-1 * oldY + globalMaxY) * numToGridTickY
    return newY
  }
  // the range affects the scale of the Y axis, and the placement of the X axis.

  // var scaledYAxisX = maxEdge / 2 + numToGridTick * (leftDomain - rightDomain)

  // console.log('rangeSize = ' + rangeSize + ', globalMaxY = ' + globalMaxY + 'globalMinY = ' + globalMinY)

  var gridColor = theme.gridColor
  var graphColor = theme.graphColor
  var axisColor = theme.axisColor

  let graphSvg = graphHtml.append('svg')
    .attr('width', maxEdge)
    .attr('height', maxEdge)
    .style('background-color', graphColor)
    .attr('class', 'actual-graph-canvas')

  // tickmarks on X axis
  for (let i = 0; i <= nX; i++) {
    let putTick = function (xCoord) {
      graphSvg.append('rect')
        .attr('x', xToScale(xCoord))
        .attr('y', 0)
        .attr('width', 1)
        .attr('height', maxEdge)
        .style('fill', gridColor)
      graphSvg.append('rect')
        .attr('x', xToScale(xCoord))
        .attr('y', yToScale(0) - 3)
        .attr('width', 1)
        .attr('height', 6)
        .style('fill', axisColor)
        .attr('class', 'x-tick')
      // tickmark labels.
      graphSvg.append('text')
        .attr('x', xToScale(xCoord))
        .attr('y', yToScale(0) - 3)
        .attr('width', 1)
        .attr('height', 6)
        .style('fill', axisColor)
        .attr('class', 'x-tick-text')
        .text(((`${xCoord}`).substring(0, 4)) || '0')
        .attr('font-size', '10px')
    }
    putTick(i * domainSize / nX)
    putTick(-1 * i * domainSize / nX)
  }

  // tickmarks on Y axis
  for (let i = 0; i <= nY; i++) {
    let putTick = function (yCoord) {
      graphSvg.append('rect')
        .attr('x', 0)
        .attr('y', yToScale(yCoord))
        .attr('width', maxEdge)
        .attr('height', 1)
        .style('fill', gridColor)
      graphSvg.append('rect')
        .attr('x', xToScale(0) - 3)
        .attr('y', yToScale(yCoord))
        .attr('width', 6)
        .attr('height', 1)
        .style('fill', axisColor)
      // tickmark labels.
      graphSvg.append('text')
        .attr('x', xToScale(0))
        .attr('y', yToScale(yCoord))
        .attr('width', 6)
        .attr('height', 1)
        .style('fill', axisColor)
        .attr('class', 'y-tick-text')
        .text(((`${yCoord}`).substring(0, 4)) || '0')
        .attr('font-size', '10px')
    }
    putTick(i * rangeSize / nY)
    putTick(-1 * i * rangeSize / nY)
  }

  // x axis
  graphSvg.append('rect')
    .attr('x', 0)
    .attr('y', yToScale(0))
    .attr('width', maxEdge)
    .attr('height', 0.5)
    .style('background-color', axisColor)

  // y axis
  graphSvg.append('rect')
    .attr('x', xToScale(0))
    .attr('y', 0)
    .attr('width', 0.5)
    .attr('height', maxEdge)
    .style('background-color', axisColor)

  var graphPoints = ctx.$d3.line()

  function graphFunction (functionData) {
    function scalePoints (points) {
      for (let pointkey in points) {
        let x = points[pointkey][0]
        let y = points[pointkey][1]
        points[pointkey][0] = (xToScale(x))
        points[pointkey][1] = (yToScale(y))
      }
      return points
    }

    let scaledPoints = scalePoints(JSON.parse(JSON.stringify(functionData.points)))
    let unscaledPoints = JSON.parse(JSON.stringify(functionData.points))

    graphSvg.append('path')
      .style('fill', 'none')
      .style('stroke', functionData.color)
      .attr('d', graphPoints(scaledPoints))

    function placeSpecialPoints (specialPoints, unscaledPoints) {
      ctx.$store.commit('resetCoolPoints')
      ctx.specialPointsHover = []
      for (let i = 0; i < specialPoints.length; i++) {
        graphSvg.append('circle')
          .attr('stroke', 'black')
          .style('fill', 'black')
          .attr('cx', specialPoints[i][0])
          .attr('cy', specialPoints[i][1])
          .attr('r', 3)
          // .attr('v-tooltip', `(${specialPoints[i][0] + ', ' + specialPoints[i][1]})`)
          // .attr('v-tooltip', 'hi')
        ctx.$store.commit('addCoolPoint', {
          x: unscaledPoints[i][0],
          y: unscaledPoints[i][1],
          scaledX: specialPoints[i][0],
          scaledY: specialPoints[i][1],
          name: 'a point.'
        })

        // TODO remove implicit state mutation
        // ctx.$store.commit('setCoolPoints', (function () {
        //   let betterCoolPoints = []
        //   for (i in unscaledPoints) {
        //     betterCoolPoints.push({
        //       name: 'place',
        //       x: ('' + unscaledPoints[i].x).substring(0, 4),
        //       y: ('' + unscaledPoints[i].y).substring(0, 4)
        //     })
        //   }
        //   return betterCoolPoints
        // })())
      }
    }
    placeSpecialPoints(
      [
        scaledPoints[0],
        scaledPoints[scaledPoints.length - 1]
      ],
      [
        unscaledPoints[0],
        unscaledPoints[functionData.points.length - 1]
      ],
  )
  }
  // graphFunction({
  //   color: '#ff0000',
  //   points: [
  //     [0, 50],
  //     [100, 80],
  //     [200, 40]
  //   ]
  // })
  graphFunction({
    color: theme.functionOne,
    points: sinePoints
  })
  if (ctx.$store.state.isDerivativeChecked === true) {
    graphFunction({
      color: theme.functionTwo,
      points: sineDerivativePoints
    })
  }

  if (ctx.$store.state.isSecondDerivativeChecked === true) {
    graphFunction({
      color: theme.functionThree,
      points: sineDoubleDerivativePoints
    })
  }
}
export default graphFunc
