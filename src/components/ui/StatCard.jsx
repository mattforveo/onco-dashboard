import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { formatNumber } from '../../utils/formatters';

export default function StatCard({ 
  value, 
  label, 
  suffix = '',
  icon,
  color = 'accent-blue',
  delay = 0,
  onClick 
}) {
  const animatedValue = useAnimatedCounter(value, 2000, delay);
  
  const colorClasses = {
    'accent-blue': 'from-accent-blue/20 to-accent-blue/5 border-accent-blue/30',
    'accent-purple': 'from-accent-purple/20 to-accent-purple/5 border-accent-purple/30',
    'accent-cyan': 'from-accent-cyan/20 to-accent-cyan/5 border-accent-cyan/30',
    'accent-green': 'from-accent-green/20 to-accent-green/5 border-accent-green/30',
    'accent-orange': 'from-accent-orange/20 to-accent-orange/5 border-accent-orange/30',
  };

  const textColors = {
    'accent-blue': 'text-accent-blue',
    'accent-purple': 'text-accent-purple',
    'accent-cyan': 'text-accent-cyan',
    'accent-green': 'text-accent-green',
    'accent-orange': 'text-accent-orange',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onClick={onClick}
      className={`
        stat-card bg-gradient-to-br ${colorClasses[color]} 
        border cursor-pointer min-h-[140px]
      `}
    >
      {icon && (
        <div className={`mb-2 ${textColors[color]}`}>
          {icon}
        </div>
      )}
      
      <motion.div
        className={`text-4xl font-bold ${textColors[color]} mb-1`}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: (delay + 200) / 1000 }}
      >
        {typeof value === 'number' && value >= 1000 
          ? formatNumber(animatedValue) 
          : animatedValue}
        {suffix}
      </motion.div>
      
      <div className="text-sm text-gray-400 font-medium">
        {label}
      </div>
    </motion.div>
  );
}
