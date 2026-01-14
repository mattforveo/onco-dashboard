import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { useChartDimensions } from '../../hooks/useChartDimensions';

export default function TimelineChart({
  data,
  title,
  xKey = 'year',
  yKey = 'value',
  color = '#58A6FF',
  yLabel,
  annotations = [],
  yFormat = value => value,
  xFormat = value => value
}) {
  const { ref, dimensions } = useChartDimensions({
    marginTop: 30,
    marginRight: 40,
    marginBottom: 50,
    marginLeft: 60,
  });

  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });

  useEffect(() => {
    if (!data || data.length === 0 || !dimensions.width || !dimensions.height || dimensions.boundedWidth <= 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { boundedWidth, boundedHeight, marginLeft, marginTop } = dimensions;

    const xValues = data.map(d => d[xKey]);

    const xScale = d3.scalePoint()
      .domain(xValues)
      .range([0, boundedWidth])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[yKey]) * 1.15])
      .range([boundedHeight, 0]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${marginLeft}, ${marginTop})`);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(yScale).ticks(5).tickSize(-boundedWidth).tickFormat(''))
      .selectAll('line')
      .attr('stroke', '#21262D');

    g.selectAll('.grid path').remove();

    // Line
    const line = d3.line()
      .x(d => xScale(d[xKey]))
      .y(d => yScale(d[yKey]))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 3)
      .attr('d', line)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    // Area fill
    g.append('path')
      .datum(data)
      .attr('fill', d3.color(color).copy({ opacity: 0.15 }))
      .attr('d', d3.area()
        .x(d => xScale(d[xKey]))
        .y0(boundedHeight)
        .y1(d => yScale(d[yKey]))
        .curve(d3.curveMonotoneX)
      );

    // Points
    const points = g.selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => xScale(d[xKey]))
      .attr('cy', d => yScale(d[yKey]))
      .attr('r', 6)
      .attr('fill', color)
      .attr('stroke', '#0D1117')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 8);

        const circle = this.getBoundingClientRect();
        const svgRect = svgRef.current.getBoundingClientRect();

        setTooltip({
          visible: true,
          x: circle.left - svgRect.left + circle.width / 2,
          y: circle.top - svgRect.top - 10,
          data: d,
        });
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 6);

        setTooltip({ visible: false, x: 0, y: 0, data: null });
      });

    // Axes
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${boundedHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('fill', '#8B949E')
      .attr('font-size', '11px');

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => yFormat(d)))
      .selectAll('text')
      .attr('fill', '#8B949E')
      .attr('font-size', '11px');

    g.selectAll('.domain').attr('stroke', '#30363D');
    g.selectAll('.tick line').attr('stroke', '#30363D');

    // Annotation lines
    annotations.forEach((annotation) => {
      const xPosition = xScale(annotation[xKey]);
      if (!xPosition) return;

      g.append('line')
        .attr('x1', xPosition)
        .attr('x2', xPosition)
        .attr('y1', 0)
        .attr('y2', boundedHeight)
        .attr('stroke', annotation.color || '#F59E0B')
        .attr('stroke-dasharray', '4,4')
        .attr('opacity', 0.8);

      g.append('text')
        .attr('x', xPosition)
        .attr('y', -12)
        .attr('text-anchor', 'middle')
        .attr('fill', annotation.color || '#F59E0B')
        .attr('font-size', '10px')
        .text(annotation.label);
    });

    if (yLabel) {
      g.append('text')
        .attr('x', -marginLeft + 10)
        .attr('y', -10)
        .attr('fill', '#8B949E')
        .attr('font-size', '11px')
        .text(yLabel);
    }
  }, [data, dimensions, xKey, yKey, color, annotations, yFormat, yLabel, xFormat]);

  return (
    <div className="chart-container">
      {title && <h3 className="chart-title">{title}</h3>}

      <div ref={ref} className="flex-1 relative min-h-[320px]">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="overflow-visible"
        />

        <AnimatePresence>
          {tooltip.visible && tooltip.data && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="tooltip visible"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="font-semibold text-white">{xFormat(tooltip.data[xKey])}</div>
              <div className="text-accent-blue">{yFormat(tooltip.data[yKey])}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
