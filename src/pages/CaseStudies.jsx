import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BarChart from '../components/charts/BarChart';
import DonutChart from '../components/charts/DonutChart';
import dashboardData from '../data/dashboard_data.json';
import { colors } from '../utils/colors';

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVaccine, setFilterVaccine] = useState('all');
  const [filterDiagnosis, setFilterDiagnosis] = useState('all');

  const lymphomaCases = dashboardData.case_examples.lymphoma_cases;

  // Filter cases
  const filteredCases = useMemo(() => {
    return lymphomaCases.filter(c => {
      const matchesSearch = 
        c.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.vaccine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.treatment.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesVaccine = filterVaccine === 'all' || 
        c.vaccine.toLowerCase().includes(filterVaccine.toLowerCase());
      
      const matchesDiagnosis = filterDiagnosis === 'all' ||
        c.diagnosis.toLowerCase().includes(filterDiagnosis.toLowerCase());

      return matchesSearch && matchesVaccine && matchesDiagnosis;
    });
  }, [lymphomaCases, searchQuery, filterVaccine, filterDiagnosis]);

  // Prepare onset time histogram data
  const onsetData = useMemo(() => {
    const bins = [
      { label: '1-3 days', value: 0 },
      { label: '4-7 days', value: 0 },
      { label: '8-14 days', value: 0 },
      { label: '15+ days', value: 0 },
    ];

    lymphomaCases.forEach(c => {
      const onset = c.time_to_onset.toLowerCase();
      if (onset.includes('1 day') || onset.includes('2 day') || onset.includes('3 day') || onset.includes('few day')) {
        bins[0].value++;
      } else if (onset.includes('7 day') || onset.includes('4') || onset.includes('5') || onset.includes('6')) {
        bins[1].value++;
      } else if (onset.includes('10') || onset.includes('8') || onset.includes('9')) {
        bins[2].value++;
      } else {
        bins[3].value++;
      }
    });

    return bins;
  }, [lymphomaCases]);

  const ageDistribution = useMemo(() => {
    const bins = [
      { label: '20-39', value: 0 },
      { label: '40-59', value: 0 },
      { label: '60-79', value: 0 },
      { label: '80+', value: 0 },
    ];

    lymphomaCases.forEach(c => {
      if (c.age < 40) bins[0].value++;
      else if (c.age < 60) bins[1].value++;
      else if (c.age < 80) bins[2].value++;
      else bins[3].value++;
    });

    return bins;
  }, [lymphomaCases]);

  const genderDistribution = useMemo(() => {
    const counts = lymphomaCases.reduce((acc, c) => {
      acc[c.gender] = (acc[c.gender] || 0) + 1;
      return acc;
    }, {});

    return [
      { label: 'Male', value: counts.M || 0 },
      { label: 'Female', value: counts.F || 0 },
    ];
  }, [lymphomaCases]);

  const doseDistribution = useMemo(() => {
    const bins = [
      { label: '1st dose', value: 0 },
      { label: '2nd dose', value: 0 },
      { label: 'Booster/Other', value: 0 },
    ];

    lymphomaCases.forEach(c => {
      const onset = c.time_to_onset.toLowerCase();
      if (onset.includes('1st') || onset.includes('first')) {
        bins[0].value++;
      } else if (onset.includes('2nd') || onset.includes('second')) {
        bins[1].value++;
      } else {
        bins[2].value++;
      }
    });

    return bins;
  }, [lymphomaCases]);

  // Get unique vaccines for filter
  const uniqueVaccines = useMemo(() => {
    return [...new Set(lymphomaCases.map(c => c.vaccine))];
  }, [lymphomaCases]);

  // Get unique diagnoses for filter
  const uniqueDiagnoses = useMemo(() => {
    return [...new Set(lymphomaCases.map(c => c.diagnosis))];
  }, [lymphomaCases]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">
          Case Studies
        </h1>
        <p className="text-gray-400">
          Detailed analysis of individual patient cases documenting temporal associations between 
          COVID-19 vaccination and cancer diagnoses.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card"
      >
        <div className="flex flex-wrap gap-4 items-end">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-gray-400 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-dark-tertiary border border-dark-border rounded-lg 
                         text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue"
              />
              <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Vaccine Filter */}
          <div className="min-w-[150px]">
            <label className="block text-sm text-gray-400 mb-1">Vaccine</label>
            <select
              value={filterVaccine}
              onChange={(e) => setFilterVaccine(e.target.value)}
              className="w-full px-4 py-2 bg-dark-tertiary border border-dark-border rounded-lg 
                       text-white focus:outline-none focus:border-accent-blue"
            >
              <option value="all">All Vaccines</option>
              {uniqueVaccines.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Diagnosis Filter */}
          <div className="min-w-[150px]">
            <label className="block text-sm text-gray-400 mb-1">Diagnosis</label>
            <select
              value={filterDiagnosis}
              onChange={(e) => setFilterDiagnosis(e.target.value)}
              className="w-full px-4 py-2 bg-dark-tertiary border border-dark-border rounded-lg 
                       text-white focus:outline-none focus:border-accent-blue"
            >
              <option value="all">All Diagnoses</option>
              {uniqueDiagnoses.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterVaccine('all');
              setFilterDiagnosis('all');
            }}
            className="btn-secondary"
          >
            Reset
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 card overflow-hidden"
        >
          <h3 className="chart-title">Lymphoma Case Series (Table 3)</h3>
          <div className="overflow-x-auto mt-4">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Age/Sex</th>
                  <th>Vaccine</th>
                  <th>Diagnosis</th>
                  <th>Onset</th>
                  <th>Site</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem) => (
                  <tr 
                    key={caseItem.case_number}
                    onClick={() => setSelectedCase(caseItem)}
                    className={selectedCase?.case_number === caseItem.case_number ? 'bg-accent-blue/10' : ''}
                  >
                    <td className="font-mono text-accent-blue">#{caseItem.case_number}</td>
                    <td>
                      <span className="text-white">{caseItem.age}</span>
                      <span className="text-gray-400">/{caseItem.gender}</span>
                    </td>
                    <td className="text-sm">{caseItem.vaccine}</td>
                    <td>
                      <span className="px-2 py-1 bg-accent-purple/20 text-accent-purple rounded text-xs">
                        {caseItem.diagnosis}
                      </span>
                    </td>
                    <td className="text-accent-orange text-sm">{caseItem.time_to_onset}</td>
                    <td className="text-sm text-gray-400 max-w-[150px] truncate">
                      {caseItem.lymphadenopathy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredCases.length} of {lymphomaCases.length} cases
          </div>
        </motion.div>

        {/* Case Detail Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <h3 className="chart-title">Case Details</h3>
          
          <AnimatePresence mode="wait">
            {selectedCase ? (
              <motion.div
                key={selectedCase.case_number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent-blue/20 flex items-center justify-center">
                    <span className="text-xl">
                      {selectedCase.gender === 'M' ? '👨' : '👩'}
                    </span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">Case #{selectedCase.case_number}</div>
                    <div className="text-sm text-gray-400">{selectedCase.age} year old {selectedCase.gender === 'M' ? 'Male' : 'Female'}</div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-dark-border">
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Vaccine</label>
                    <div className="text-white">{selectedCase.vaccine}</div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Time to Onset</label>
                    <div className="text-accent-orange font-medium">{selectedCase.time_to_onset}</div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Diagnosis</label>
                    <div className="text-accent-purple font-medium">{selectedCase.diagnosis}</div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Lymphadenopathy</label>
                    <div className="text-white text-sm">{selectedCase.lymphadenopathy}</div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Treatment</label>
                    <div className="text-accent-green">{selectedCase.treatment}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-dark-border">
                  <p className="text-xs text-gray-500">
                    Source: Cavanna et al., Medicina, 2023
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center py-12 text-gray-500"
              >
                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <p>Select a case from the table to view details</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Time to Onset Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <BarChart
          data={onsetData}
          title="Time to Onset Distribution (Lymphoma Cases)"
          xKey="label"
          yKey="value"
          color={colors.accent.orange}
        />
      </motion.div>

      {/* Case Series Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <BarChart
            data={ageDistribution}
            title="Age Distribution (Lymphoma Cases)"
            xKey="label"
            yKey="value"
            color={colors.accent.cyan}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <DonutChart
            data={genderDistribution}
            title="Gender Breakdown"
            labelKey="label"
            valueKey="value"
            colorScale={(label) => (label === 'Male' ? colors.accent.blue : colors.accent.purple)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <BarChart
            data={doseDistribution}
            title="Dose Timing"
            xKey="label"
            yKey="value"
            color={colors.accent.orange}
          />
        </motion.div>
      </div>

      {/* Other Notable Cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card"
      >
        <h3 className="chart-title">Other Notable Cases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {/* Pancreatic Cancer */}
          <div className="p-4 bg-dark-tertiary rounded-lg border border-dark-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent-orange"></div>
              <h4 className="font-semibold text-white">Pancreatic Cancer Cohort</h4>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              {dashboardData.case_examples.pancreatic_cancer.cohort_size} patients studied
            </p>
            <p className="text-sm text-accent-orange">
              {dashboardData.case_examples.pancreatic_cancer.finding}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Biomarker: {dashboardData.case_examples.pancreatic_cancer.marker}
            </p>
          </div>

          {/* Sarcoma */}
          <div className="p-4 bg-dark-tertiary rounded-lg border border-dark-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent-red"></div>
              <h4 className="font-semibold text-white">High-Grade Sarcoma</h4>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              {dashboardData.case_examples.sarcoma.case}
            </p>
            <p className="text-sm text-white">
              {dashboardData.case_examples.sarcoma.presentation}
            </p>
            <p className="text-xs text-accent-cyan mt-2">
              Vaccine: {dashboardData.case_examples.sarcoma.vaccine}
            </p>
          </div>

          {/* Melanoma */}
          <div className="p-4 bg-dark-tertiary rounded-lg border border-dark-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent-purple"></div>
              <h4 className="font-semibold text-white">Uveal Melanoma</h4>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              {dashboardData.case_examples.melanoma.case_1}
            </p>
            <p className="text-sm text-white">
              {dashboardData.case_examples.melanoma.presentation}
            </p>
            <p className="text-xs text-accent-orange mt-2">
              Onset: {dashboardData.case_examples.melanoma.timing}
            </p>
          </div>

          {/* Glioblastoma */}
          <div className="p-4 bg-dark-tertiary rounded-lg border border-dark-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent-green"></div>
              <h4 className="font-semibold text-white">Glioblastoma</h4>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              {dashboardData.case_examples.glioblastoma.case_1}
            </p>
            <p className="text-sm text-white">
              {dashboardData.case_examples.glioblastoma.presentation}
            </p>
            <p className="text-xs text-accent-orange mt-2">
              Onset: {dashboardData.case_examples.glioblastoma.timing}
            </p>
          </div>

          {/* Breast Cancer */}
          <div className="p-4 bg-dark-tertiary rounded-lg border border-dark-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent-cyan"></div>
              <h4 className="font-semibold text-white">Breast Cancer + Spike</h4>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              {dashboardData.case_examples.breast_cancer.case}
            </p>
            <p className="text-sm text-white">
              {dashboardData.case_examples.breast_cancer.presentation}
            </p>
            <p className="text-xs text-accent-blue mt-2">
              Notable: Spike protein positive, nucleocapsid negative
            </p>
          </div>

          {/* Kaposi Sarcoma */}
          <div className="p-4 bg-dark-tertiary rounded-lg border border-dark-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
              <h4 className="font-semibold text-white">Kaposi Sarcoma</h4>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              {dashboardData.case_examples.kaposi_sarcoma.case}
            </p>
            <p className="text-sm text-white">
              {dashboardData.case_examples.kaposi_sarcoma.presentation}
            </p>
            <p className="text-xs text-accent-cyan mt-2">
              Vaccine: {dashboardData.case_examples.kaposi_sarcoma.vaccine}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
