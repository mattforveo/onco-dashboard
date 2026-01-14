import { useMemo } from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import DonutChart from '../components/charts/DonutChart';
import BarChart from '../components/charts/BarChart';
import TimelineChart from '../components/charts/TimelineChart';
import dashboardData from '../data/dashboard_data.json';
import { colors, getVaccineColor, getCancerColor } from '../utils/colors';
import { getVaccineLabel } from '../utils/formatters';

export default function Overview() {
  // Prepare vaccine distribution data
  const vaccineData = useMemo(() => {
    const dist = dashboardData.vaccine_distribution;
    return Object.entries(dist).map(([key, value]) => ({
      label: getVaccineLabel(key),
      value: value.percentage,
      type: value.type,
    })).sort((a, b) => b.value - a.value);
  }, []);

  // Prepare cancer type data
  const cancerData = useMemo(() => {
    const types = dashboardData.cancer_types;
    return [
      { label: 'Lymphomas & Leukemias', value: types.lymphomas_leukemias.percentage, count: types.lymphomas_leukemias.count },
      { label: 'Solid Tumors', value: types.solid_tumors.percentage, count: types.solid_tumors.count },
      { label: 'Other/Unspecified', value: types.other_unspecified.percentage, count: types.other_unspecified.count },
    ];
  }, []);

  // Prepare study type data
  const studyTypeData = useMemo(() => {
    const types = dashboardData.study_types;
    return [
      { label: 'Case Reports', value: types.case_reports.count },
      { label: 'Cohort Studies', value: types.cohort_retrospective_observational.count },
      { label: 'Reviews', value: types.systematic_narrative_reviews.count },
      { label: 'Case Series', value: types.case_series.count },
      { label: 'Mechanistic', value: types.mechanistic_translational.count },
    ];
  }, []);

  // Prepare geographic data
  const geoData = useMemo(() => {
    return dashboardData.geographic_distribution.highest_reporting_countries.map(item => ({
      label: item.country,
      value: item.publications,
    }));
  }, []);

  const publicationTimeline = useMemo(() => {
    const timeline = dashboardData.timeline_series?.publication_references?.year_counts || [];
    return timeline.map(item => ({
      year: item.year,
      value: item.count,
    }));
  }, []);

  // Color scale for vaccines
  const vaccineColorScale = (label) => {
    const colorMap = {
      'Pfizer-BioNTech': colors.vaccine.pfizer,
      'Moderna': colors.vaccine.moderna,
      'Both mRNA': colors.accent.purple,
      'AstraZeneca': colors.vaccine.astrazeneca,
      'Johnson & Johnson': colors.vaccine.jj,
      'Sputnik V': colors.vaccine.sputnik,
      'Inactivated': colors.vaccine.inactivated,
      'Unspecified': colors.vaccine.other,
    };
    return colorMap[label] || colors.accent.blue;
  };

  // Color scale for cancer types
  const cancerColorScale = (label) => {
    const colorMap = {
      'Lymphomas & Leukemias': colors.cancer.lymphoma,
      'Solid Tumors': colors.cancer.solid,
      'Other/Unspecified': colors.cancer.other,
    };
    return colorMap[label] || colors.accent.blue;
  };

  const stats = dashboardData.key_statistics;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">
          COVID-19 Vaccination & Cancer Signal Analysis
        </h1>
        <p className="text-gray-400">
          Comprehensive analysis of {stats.total_publications} publications examining temporal associations 
          between COVID-19 vaccination/infection and cancer diagnoses.
        </p>
      </motion.div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          value={stats.total_publications}
          label="Publications"
          color="accent-blue"
          delay={0}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          value={stats.total_patients_studied}
          label="Patients"
          color="accent-purple"
          delay={100}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <StatCard
          value={stats.countries_represented}
          label="Countries"
          color="accent-cyan"
          delay={200}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          value={8.4}
          suffix="M"
          label="Largest Cohort"
          color="accent-green"
          delay={300}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
        <StatCard
          value={86}
          suffix="%"
          label="mRNA Vaccines"
          color="accent-orange"
          delay={400}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          }
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <DonutChart
            data={vaccineData}
            title="Vaccine Type Distribution"
            colorScale={vaccineColorScale}
            labelKey="label"
            valueKey="value"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DonutChart
            data={cancerData}
            title="Cancer Type Distribution"
            colorScale={cancerColorScale}
            labelKey="label"
            valueKey="value"
          />
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <BarChart
            data={geoData}
            title="Top Reporting Countries"
            xKey="label"
            yKey="value"
            color={colors.accent.cyan}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <BarChart
            data={studyTypeData}
            title="Study Types"
            xKey="label"
            yKey="value"
            color={colors.accent.purple}
            horizontal
          />
        </motion.div>
      </div>

      {/* Publication Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="card"
      >
        <TimelineChart
          data={publicationTimeline}
          title="Publication References by Year"
          xKey="year"
          yKey="value"
          color={colors.accent.blue}
          yLabel="References"
          yFormat={(value) => Math.round(value)}
        />
        <p className="mt-4 text-xs text-gray-500">
          Reference-year distribution from the review bibliography (includes background sources, not just case reports).
        </p>
      </motion.div>

      {/* Key Findings Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="card"
      >
        <h3 className="chart-title mb-4">Key Clinical Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardData.clinical_patterns.recurrent_themes.map((theme, index) => (
            <div 
              key={index}
              className="p-4 bg-dark-tertiary rounded-lg border border-dark-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${
                  index === 0 ? 'bg-accent-red' : 
                  index === 1 ? 'bg-accent-orange' : 'bg-accent-purple'
                }`} />
                <h4 className="font-semibold text-white">{theme.theme}</h4>
              </div>
              <p className="text-sm text-gray-400">{theme.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timing Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="card"
      >
        <h3 className="chart-title mb-4">Time to Cancer Onset</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-dark-tertiary rounded-lg">
            <div className="text-2xl font-bold text-accent-blue">50%</div>
            <div className="text-sm text-gray-400">Within 2-4 weeks</div>
          </div>
          <div className="text-center p-4 bg-dark-tertiary rounded-lg">
            <div className="text-2xl font-bold text-accent-cyan">7-14</div>
            <div className="text-sm text-gray-400">Days (earliest)</div>
          </div>
          <div className="text-center p-4 bg-dark-tertiary rounded-lg">
            <div className="text-2xl font-bold text-accent-purple">8-9</div>
            <div className="text-sm text-gray-400">Weeks (mean)</div>
          </div>
          <div className="text-center p-4 bg-dark-tertiary rounded-lg">
            <div className="text-2xl font-bold text-accent-orange">&gt;8</div>
            <div className="text-sm text-gray-400">Months (longest)</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
