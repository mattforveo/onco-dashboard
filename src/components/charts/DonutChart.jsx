import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { useChartDimensions } from '../../hooks/useChartDimensions';
import { formatPercent } from '../../utils/formatters';

export default function DonutChart({ 
  data, 
  title,
  colorScale,
  innerRadiusRatio = 0.6,
  labelKey = 'label',
  valueKey = 'value',
  onSegmentClick
}) {
  const { ref, dimensions } = useChartDimensions({
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
  });
  
  const svgRef = useRef(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });

  useEffect(() => {
    if (!data || !dimensions.width || !dimensions.height) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = dimensions.boundedWidth;
    const height = dimensions.boundedHeight;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * innerRadiusRatio;

    // Create pie generator
    const pie = d3.pie()
      .value(d => d[valueKey])
      .sort(null)
      .padAngle(0.02);

    // Create arc generator
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    // Create arc generator for hover effect
    const arcHover = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius + 10);

    // Create group and center it
    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2 + dimensions.marginLeft}, ${height / 2 + dimensions.marginTop})`);

    // Calculate total for percentages
    const total = d3.sum(data, d => d[valueKey]);

    // Create arcs
    const arcs = g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Draw paths with animation
    arcs
      .append('path')
      .attr('fill', (d, i) => colorScale ? colorScale(d.data[labelKey]) : d3.schemeCategory10[i % 10])
      .attr('stroke', '#161B22')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('opacity', 0.9)
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arcHover)
          .style('opacity', 1);
        
        setHoveredSegment(d.data[labelKey]);
        
        const [x, y] = arc.centroid(d);
        setTooltip({
          visible: true,
          x: width / 2 + x + dimensions.marginLeft,
          y: height / 2 + y + dimensions.marginTop - 40,
          data: {
            label: d.data[labelKey],
            value: d.data[valueKey],
            percentage: (d.data[valueKey] / total) * 100,
          },
        });
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arc)
          .style('opacity', 0.9);
        
        setHoveredSegment(null);
        setTooltip({ visible: false, x: 0, y: 0, data: null });
      })
      .on('click', (event, d) => {
        if (onSegmentClick) {
          onSegmentClick(d.data);
        }
      })
      .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });

    // Add center text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .attr('fill', '#F0F6FC')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .text(total);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .attr('fill', '#8B949E')
      .attr('font-size', '12px')
      .text('Total');

  }, [data, dimensions, colorScale, innerRadiusRatio, labelKey, valueKey, onSegmentClick]);

  return (
    <div className="chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      
      <div ref={ref} className="flex-1 relative min-h-[250px]">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="overflow-visible"
        />
        
        {/* Tooltip */}
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
              <div className="font-semibold text-white">{tooltip.data.label}</div>
              <div className="text-gray-400">
                {tooltip.data.value} ({formatPercent(tooltip.data.percentage)})
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {data?.map((item, i) => (
          <div 
            key={item[labelKey]}
            className={`flex items-center gap-2 text-sm transition-opacity ${
              hoveredSegment && hoveredSegment !== item[labelKey] ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ 
                backgroundColor: colorScale 
                  ? colorScale(item[labelKey]) 
                  : d3.schemeCategory10[i % 10] 
              }}
            />
            <span className="text-gray-300">{item[labelKey]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
