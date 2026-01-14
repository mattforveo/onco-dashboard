import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { useChartDimensions } from '../../hooks/useChartDimensions';
import { formatHR } from '../../utils/formatters';

export default function ForestPlot({ 
  data, 
  title,
  labelKey = 'type',
  hrKey = 'hazard_ratio',
  studyKey = 'study',
  colorScale,
  onPointClick
}) {
  const { ref, dimensions } = useChartDimensions({
    marginTop: 30,
    marginRight: 80,
    marginBottom: 50,
    marginLeft: 120,
  });
  
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });

  useEffect(() => {
    if (!data || !dimensions.width || !dimensions.height || dimensions.boundedWidth <= 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { boundedWidth, boundedHeight, marginLeft, marginTop } = dimensions;

    // Sort data by HR value
    const sortedData = [...data].sort((a, b) => b[hrKey] - a[hrKey]);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0.5, Math.max(2.5, d3.max(data, d => d[hrKey]) * 1.2)])
      .range([0, boundedWidth]);

    const yScale = d3.scaleBand()
      .domain(sortedData.map(d => d[labelKey]))
      .range([0, boundedHeight])
      .padding(0.4);

    // Create group
    const g = svg
      .append('g')
      .attr('transform', `translate(${marginLeft}, ${marginTop})`);

    // Add reference line at HR = 1
    g.append('line')
      .attr('x1', xScale(1))
      .attr('x2', xScale(1))
      .attr('y1', 0)
      .attr('y2', boundedHeight)
      .attr('stroke', '#F85149')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,4')
      .style('opacity', 0.7);

    // Add "No Effect" label
    g.append('text')
      .attr('x', xScale(1))
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#F85149')
      .attr('font-size', '11px')
      .text('No Effect (HR=1)');

    // Add horizontal grid lines
    g.selectAll('.grid-line')
      .data(sortedData)
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('x1', 0)
      .attr('x2', boundedWidth)
      .attr('y1', d => yScale(d[labelKey]) + yScale.bandwidth() / 2)
      .attr('y2', d => yScale(d[labelKey]) + yScale.bandwidth() / 2)
      .attr('stroke', '#21262D')
      .attr('stroke-width', 1);

    // Draw points
    const points = g
      .selectAll('.point')
      .data(sortedData)
      .enter()
      .append('g')
      .attr('class', 'point')
      .style('cursor', 'pointer');

    // Add connecting lines (whiskers would go here if we had CI data)
    points
      .append('line')
      .attr('x1', d => xScale(d[hrKey]) - 15)
      .attr('x2', d => xScale(d[hrKey]) + 15)
      .attr('y1', d => yScale(d[labelKey]) + yScale.bandwidth() / 2)
      .attr('y2', d => yScale(d[labelKey]) + yScale.bandwidth() / 2)
      .attr('stroke', d => colorScale ? colorScale(d[studyKey] || d[labelKey]) : '#58A6FF')
      .attr('stroke-width', 2)
      .style('opacity', 0)
      .transition()
      .duration(600)
      .delay((d, i) => i * 80)
      .style('opacity', 1);

    // Add circles
    points
      .append('circle')
      .attr('cx', d => xScale(d[hrKey]))
      .attr('cy', d => yScale(d[labelKey]) + yScale.bandwidth() / 2)
      .attr('r', 0)
      .attr('fill', d => colorScale ? colorScale(d[studyKey] || d[labelKey]) : '#58A6FF')
      .attr('stroke', '#0D1117')
      .attr('stroke-width', 2)
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 10);

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
          .attr('r', 7);
        
        setTooltip({ visible: false, x: 0, y: 0, data: null });
      })
      .on('click', (event, d) => {
        if (onPointClick) onPointClick(d);
      })
      .transition()
      .duration(600)
      .delay((d, i) => i * 80)
      .attr('r', 7);

    // Add HR value labels
    points
      .append('text')
      .attr('x', boundedWidth + 10)
      .attr('y', d => yScale(d[labelKey]) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('fill', d => d[hrKey] > 1 ? '#F59E0B' : '#3FB950')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .style('opacity', 0)
      .text(d => formatHR(d[hrKey]))
      .transition()
      .duration(400)
      .delay((d, i) => i * 80 + 300)
      .style('opacity', 1);

    // Add axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickFormat(d => d.toFixed(1));

    const yAxis = d3.axisLeft(yScale);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${boundedHeight})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#8B949E')
      .attr('font-size', '11px');

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .attr('fill', '#F0F6FC')
      .attr('font-size', '12px');

    // X-axis label
    g.append('text')
      .attr('x', boundedWidth / 2)
      .attr('y', boundedHeight + 40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#8B949E')
      .attr('font-size', '12px')
      .text('Hazard Ratio');

    // Style axes
    g.selectAll('.domain').attr('stroke', '#30363D');
    g.selectAll('.tick line').attr('stroke', '#30363D');

  }, [data, dimensions, labelKey, hrKey, studyKey, colorScale, onPointClick]);

  return (
    <div className="chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      
      <div ref={ref} className="flex-1 relative min-h-[400px]">
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
              <div className="font-semibold text-white">{tooltip.data[labelKey]}</div>
              <div className="text-accent-blue">HR: {formatHR(tooltip.data[hrKey])}</div>
              {tooltip.data[studyKey] && (
                <div className="text-gray-400 text-xs">{tooltip.data[studyKey]}</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Risk indicator legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-green"></div>
          <span className="text-gray-400">HR {'<'} 1 (Lower risk)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-orange"></div>
          <span className="text-gray-400">HR {'>'} 1 (Higher risk)</span>
        </div>
      </div>
    </div>
  );
}
