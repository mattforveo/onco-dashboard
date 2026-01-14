import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ForestPlot from '../components/charts/ForestPlot';
import StatCard from '../components/ui/StatCard';
import dashboardData from '../data/dashboard_data.json';
import { colors } from '../utils/colors';
import { formatWithCommas } from '../utils/formatters';

export default function PopulationStudies() {
  const populationStudies = dashboardData.population_level_studies;

  // Prepare hazard ratio data for forest plot
  const hazardRatioData = useMemo(() => {
    const data = [];
    
    // Korea study
    const koreaStudy = populationStudies.find(s => s.country === 'South Korea');
    if (koreaStudy?.key_findings?.cancers_with_associations) {
      koreaStudy.key_findings.cancers_with_associations.forEach(c => {
        data.push({
          type: c.type,
          hazard_ratio: c.hazard_ratio,
          study: 'South Korea',
        });
      });
    }

    // Italy study
    const italyStudy = populationStudies.find(s => s.country === 'Italy');
    if (italyStudy?.key_findings?.cancers_with_associations) {
      italyStudy.key_findings.cancers_with_associations.forEach(c => {
        data.push({
          type: c.type,
          hazard_ratio: c.hazard_ratio,
          study: 'Italy',
        });
      });
    }

    return data;
  }, [populationStudies]);

  // Color scale for studies
  const studyColorScale = (study) => {
    const colorMap = {
      'South Korea': colors.accent.blue,
      'Italy': colors.accent.green,
      'USA': colors.accent.purple,
    };
    return colorMap[study] || colors.accent.cyan;
  };

  const koreaStudy = populationStudies.find(s => s.country === 'South Korea');
  const italyStudy = populationStudies.find(s => s.country === 'Italy');
  const usStudy = populationStudies.find(s => s.country === 'United States');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">
          Population-Level Studies
        </h1>
        <p className="text-gray-400">
          Three large-scale epidemiologic studies provide population-level context to complement 
          case-based literature.
        </p>
      </motion.div>

      {/* Study Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Korea Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card hover:glow-blue"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🇰🇷</span>
            <div>
              <h3 className="font-bold text-white">South Korea</h3>
              <p className="text-sm text-gray-400">Kim et al. 2025</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Cohort Size:</span>
              <span className="text-accent-blue font-bold">
                {formatWithCommas(koreaStudy?.cohort_size)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Period:</span>
              <span className="text-white">{koreaStudy?.study_period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Database:</span>
              <span className="text-white text-sm">National Health Insurance</span>
            </div>
            <div className="pt-2 border-t border-dark-border">
              <span className="text-sm text-accent-orange">
                6 cancers with significant associations
              </span>
            </div>
          </div>
        </motion.div>

        {/* Italy Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card hover:glow-blue"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🇮🇹</span>
            <div>
              <h3 className="font-bold text-white">Italy</h3>
              <p className="text-sm text-gray-400">Acuti Martellucci et al. 2025</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Cohort Size:</span>
              <span className="text-accent-green font-bold">
                {formatWithCommas(italyStudy?.cohort_size)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Period:</span>
              <span className="text-white">{italyStudy?.study_period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Follow-up:</span>
              <span className="text-white">{italyStudy?.follow_up_months} months</span>
            </div>
            <div className="pt-2 border-t border-dark-border">
              <span className="text-sm text-accent-orange">
                3 cancers with increased hospitalization
              </span>
            </div>
          </div>
        </motion.div>

        {/* USA Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card hover:glow-blue"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🇺🇸</span>
            <div>
              <h3 className="font-bold text-white">United States</h3>
              <p className="text-sm text-gray-400">Russell et al. 2025 (AFHSD)</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Cohort Size:</span>
              <span className="text-accent-purple font-bold">
                {formatWithCommas(usStudy?.cohort_size)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Period:</span>
              <span className="text-white">{usStudy?.study_period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Population:</span>
              <span className="text-white text-sm">Military Service Members</span>
            </div>
            <div className="pt-2 border-t border-dark-border">
              <span className="text-sm text-accent-red">
                ~50% increase in NHL post-2021
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Forest Plot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ForestPlot
          data={hazardRatioData}
          title="Hazard Ratios by Cancer Type (Korea & Italy Studies)"
          labelKey="type"
          hrKey="hazard_ratio"
          studyKey="study"
          colorScale={studyColorScale}
        />
      </motion.div>

      {/* Study Legends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center gap-8"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.accent.blue }}></div>
          <span className="text-gray-400">South Korea Study</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.accent.green }}></div>
          <span className="text-gray-400">Italy Study</span>
        </div>
      </motion.div>

      {/* Detailed Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Korea Findings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="card"
        >
          <h3 className="chart-title flex items-center gap-2">
            <span>🇰🇷</span> South Korea: Cancer Associations by Vaccine Platform
          </h3>
          <div className="space-y-4 mt-4">
            <div className="p-3 bg-dark-tertiary rounded-lg">
              <h4 className="font-semibold text-accent-blue mb-2">mRNA Vaccines</h4>
              <p className="text-sm text-gray-400">
                Associated with thyroid, colorectal, lung, and breast cancers
              </p>
            </div>
            <div className="p-3 bg-dark-tertiary rounded-lg">
              <h4 className="font-semibold text-accent-green mb-2">Adenoviral Vaccines</h4>
              <p className="text-sm text-gray-400">
                Associated with thyroid, gastric, colorectal, lung, and prostate cancers
              </p>
            </div>
            <div className="p-3 bg-dark-tertiary rounded-lg">
              <h4 className="font-semibold text-accent-purple mb-2">Heterologous Vaccination</h4>
              <p className="text-sm text-gray-400">
                Associated with thyroid and breast cancer
              </p>
            </div>
            <div className="p-3 bg-dark-tertiary rounded-lg border border-accent-orange/30">
              <h4 className="font-semibold text-accent-orange mb-2">Booster Analysis</h4>
              <p className="text-sm text-gray-400">
                Identified increased risks for gastric and pancreatic cancer
              </p>
            </div>
          </div>
        </motion.div>

        {/* Italy Findings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="card"
        >
          <h3 className="chart-title flex items-center gap-2">
            <span>🇮🇹</span> Italy: Hospitalization by Dose Count
          </h3>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-dark-tertiary rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">≥1 Dose - Overall Cancer</span>
                <span className="text-lg font-bold text-accent-orange">HR 1.23</span>
              </div>
              <div className="w-full bg-dark-border rounded-full h-2">
                <div className="bg-accent-orange h-2 rounded-full" style={{ width: '61.5%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-dark-tertiary rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">≥3 Doses - Overall Cancer</span>
                <span className="text-lg font-bold text-accent-cyan">HR 1.09</span>
              </div>
              <div className="w-full bg-dark-border rounded-full h-2">
                <div className="bg-accent-cyan h-2 rounded-full" style={{ width: '54.5%' }}></div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-dark-primary rounded-lg border border-dark-border">
              <h4 className="text-sm font-semibold text-white mb-2">Site-Specific Increases (≥1 dose)</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-accent-orange font-bold">1.35</div>
                  <div className="text-xs text-gray-400">Colorectal</div>
                </div>
                <div>
                  <div className="text-accent-orange font-bold">1.54</div>
                  <div className="text-xs text-gray-400">Breast</div>
                </div>
                <div>
                  <div className="text-accent-orange font-bold">1.62</div>
                  <div className="text-xs text-gray-400">Bladder</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Limitations Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="p-4 bg-dark-tertiary border border-accent-orange/30 rounded-lg"
      >
        <h4 className="font-semibold text-accent-orange mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Important Limitations
        </h4>
        <p className="text-sm text-gray-400">
          These associations do not establish causation. Residual confounding, detection bias, 
          healthy-vaccinee bias, and limited follow-up preclude causal inference. Authors characterize 
          findings as preliminary and hypothesis-generating rather than evidence of vaccine-induced cancer risk.
        </p>
      </motion.div>
    </div>
  );
}
