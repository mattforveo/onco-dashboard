import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { useChartDimensions } from '../../hooks/useChartDimensions';

export default function BarChart({ 
  data, 
  title,
  xKey = 'label',
  yKey = 'value',
  color = '#58A6FF',
  horizontal = false,
  showValues = true,
  onBarClick
}) {
  const { ref, dimensions } = useChartDimensions({
    marginTop: 20,
    marginRight: 30,
    marginBottom: horizontal ? 40 : 60,
    marginLeft: horizontal ? 120 : 50,
  });
  
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });

  useEffect(() => {
    if (!data || !dimensions.width || !dimensions.height || dimensions.boundedWidth <= 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { boundedWidth, boundedHeight, marginLeft, marginTop } = dimensions;

    // Create scales
    let xScale, yScale;

    if (horizontal) {
      xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[yKey]) * 1.1])
        .range([0, boundedWidth]);

      yScale = d3.scaleBand()
        .domain(data.map(d => d[xKey]))
        .range([0, boundedHeight])
        .padding(0.3);
    } else {
      xScale = d3.scaleBand()
        .domain(data.map(d => d[xKey]))
        .range([0, boundedWidth])
        .padding(0.3);

      yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[yKey]) * 1.1])
        .range([boundedHeight, 0]);
    }

    // Create group
    const g = svg
      .append('g')
      .attr('transform', `translate(${marginLeft}, ${marginTop})`);

    // Draw bars
    const bars = g
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', color)
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .style('opacity', 0.9)
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', 1)
          .attr('fill', d3.color(color).brighter(0.3));

        const rect = this.getBoundingClientRect();
        const svgRect = svgRef.current.getBoundingClientRect();
        
        setTooltip({
          visible: true,
          x: rect.left - svgRect.left + rect.width / 2,
          y: rect.top - svgRect.top - 10,
          data: d,
        });
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', 0.9)
          .attr('fill', color);
        
        setTooltip({ visible: false, x: 0, y: 0, data: null });
      })
      .on('click', (event, d) => {
        if (onBarClick) onBarClick(d);
      });

    // Animate bars
    if (horizontal) {
      bars
        .attr('x', 0)
        .attr('y', d => yScale(d[xKey]))
        .attr('height', yScale.bandwidth())
        .attr('width', 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 50)
        .attr('width', d => xScale(d[yKey]));
    } else {
      bars
        .attr('x', d => xScale(d[xKey]))
        .attr('y', boundedHeight)
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 50)
        .attr('y', d => yScale(d[yKey]))
        .attr('height', d => boundedHeight - yScale(d[yKey]));
    }

    // Add value labels
    if (showValues) {
      const labels = g
        .selectAll('.value-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'value-label')
        .attr('fill', '#F0F6FC')
        .attr('font-size', '12px')
        .attr('text-anchor', horizontal ? 'start' : 'middle')
        .style('opacity', 0);

      if (horizontal) {
        labels
          .attr('x', d => xScale(d[yKey]) + 8)
          .attr('y', d => yScale(d[xKey]) + yScale.bandwidth() / 2)
          .attr('dy', '0.35em')
          .text(d => d[yKey]);
      } else {
        labels
          .attr('x', d => xScale(d[xKey]) + xScale.bandwidth() / 2)
          .attr('y', d => yScale(d[yKey]) - 8)
          .text(d => d[yKey]);
      }

      labels
        .transition()
        .duration(800)
        .delay((d, i) => i * 50 + 400)
        .style('opacity', 1);
    }

    // Add axes
    const xAxis = horizontal
      ? d3.axisBottom(xScale).ticks(5)
      : d3.axisBottom(xScale);

    const yAxis = horizontal
      ? d3.axisLeft(yScale)
      : d3.axisLeft(yScale).ticks(5);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${boundedHeight})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#8B949E')
      .attr('font-size', '11px')
      .style('text-anchor', horizontal ? 'middle' : 'end')
      .attr('transform', horizontal ? '' : 'rotate(-45)')
      .attr('dx', horizontal ? 0 : '-0.5em')
      .attr('dy', horizontal ? '0.7em' : '0.15em');

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .attr('fill', '#8B949E')
      .attr('font-size', '11px');

    // Style axes
    g.selectAll('.domain').attr('stroke', '#30363D');
    g.selectAll('.tick line').attr('stroke', '#30363D');

  }, [data, dimensions, xKey, yKey, color, horizontal, showValues, onBarClick]);

  return (
    <div className="chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      
      <div ref={ref} className="flex-1 relative min-h-[300px]">
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
              <div className="font-semibold text-white">{tooltip.data[xKey]}</div>
              <div className="text-accent-blue">{tooltip.data[yKey]}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
