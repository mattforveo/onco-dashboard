import { motion } from 'framer-motion';
import dashboardData from '../data/dashboard_data.json';
import { colors } from '../utils/colors';

export default function Mechanisms() {
  const mechanisms = dashboardData.proposed_mechanisms;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">
          Proposed Mechanisms
        </h1>
        <p className="text-gray-400">
          Three biologically plausible mechanisms that might explain an association between 
          COVID-19 vaccination and cancer, two overlapping with COVID infection.
        </p>
      </motion.div>

      {/* Mechanism Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Immune Dysregulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card border-l-4 border-l-accent-red"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent-red/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Immune Dysregulation</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-accent-red mb-2">Cytokine Surge</h4>
              <div className="flex flex-wrap gap-2">
                {mechanisms.immune_dysregulation.cytokine_surge.map((cytokine, i) => (
                  <span key={i} className="px-2 py-1 bg-accent-red/10 text-accent-red text-xs rounded">
                    {cytokine}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Timing</h4>
              <p className="text-white">{mechanisms.immune_dysregulation.timing}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Downstream Effects</h4>
              <ul className="space-y-1">
                {mechanisms.immune_dysregulation.effects.map((effect, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-accent-red mt-1">•</span>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-dark-border">
            <span className="text-xs px-2 py-1 bg-accent-orange/20 text-accent-orange rounded">
              Shared with Infection
            </span>
          </div>
        </motion.div>

        {/* Spike Protein Biology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card border-l-4 border-l-accent-purple"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Spike Protein Biology</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-accent-purple mb-2">Persistence</h4>
              <p className="text-white">{mechanisms.spike_protein_biology.persistence}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Receptor Interactions</h4>
              <div className="flex flex-wrap gap-2">
                {mechanisms.spike_protein_biology.interactions.map((receptor, i) => (
                  <span key={i} className="px-2 py-1 bg-accent-purple/10 text-accent-purple text-xs rounded">
                    {receptor}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Biological Effects</h4>
              <ul className="space-y-1">
                {mechanisms.spike_protein_biology.effects.map((effect, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-accent-purple mt-1">•</span>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Vaccine-Specific</h4>
              <p className="text-xs text-gray-400">{mechanisms.spike_protein_biology.vaccine_specific}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-dark-border">
            <span className="text-xs px-2 py-1 bg-accent-orange/20 text-accent-orange rounded">
              Shared with Infection
            </span>
          </div>
        </motion.div>

        {/* DNA Contaminants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card border-l-4 border-l-accent-cyan"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent-cyan/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">DNA Contaminants</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-accent-cyan mb-2">Source</h4>
              <p className="text-white text-sm">{mechanisms.DNA_contaminants.source}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Types</h4>
              <div className="flex flex-wrap gap-2">
                {mechanisms.DNA_contaminants.types.map((type, i) => (
                  <span key={i} className="px-2 py-1 bg-accent-cyan/10 text-accent-cyan text-xs rounded">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Concerns</h4>
              <ul className="space-y-1">
                {mechanisms.DNA_contaminants.concerns.map((concern, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-accent-cyan mt-1">•</span>
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-dark-border">
            <span className="text-xs px-2 py-1 bg-accent-cyan/20 text-accent-cyan rounded">
              Vaccination Only
            </span>
          </div>
        </motion.div>
      </div>

      {/* Pathway Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card"
      >
        <h3 className="chart-title">Proposed Tumor Hyperprogression Pathway</h3>
        
        <div className="mt-6 flex flex-col items-center">
          {/* Step 1 */}
          <div className="p-4 bg-accent-blue/20 border border-accent-blue/30 rounded-lg text-center max-w-xs">
            <div className="text-accent-blue font-bold">mRNA/LNP Vaccine</div>
            <div className="text-sm text-gray-400">Injection & biodistribution</div>
          </div>
          
          <div className="h-8 w-0.5 bg-dark-border"></div>
          
          {/* Step 2 */}
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-dark-tertiary border border-dark-border rounded-lg text-center">
              <div className="text-sm text-white">TLR7/8</div>
            </div>
            <div className="p-3 bg-dark-tertiary border border-dark-border rounded-lg text-center">
              <div className="text-sm text-white">NLRP3</div>
            </div>
            <div className="p-3 bg-dark-tertiary border border-dark-border rounded-lg text-center">
              <div className="text-sm text-white">cGAS-STING</div>
            </div>
          </div>
          
          <div className="h-8 w-0.5 bg-dark-border"></div>
          
          {/* Step 3 */}
          <div className="p-4 bg-accent-red/20 border border-accent-red/30 rounded-lg text-center max-w-md">
            <div className="text-accent-red font-bold">Cytokine Surge</div>
            <div className="text-sm text-gray-400">IL-6, TNF-α, IL-1β (1-3 days post-vaccination)</div>
          </div>
          
          <div className="h-8 w-0.5 bg-dark-border"></div>
          
          {/* Step 4 */}
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-accent-purple/20 border border-accent-purple/30 rounded-lg text-center">
              <div className="text-sm text-accent-purple">STAT3</div>
            </div>
            <div className="p-3 bg-accent-purple/20 border border-accent-purple/30 rounded-lg text-center">
              <div className="text-sm text-accent-purple">NF-κB</div>
            </div>
            <div className="p-3 bg-accent-purple/20 border border-accent-purple/30 rounded-lg text-center">
              <div className="text-sm text-accent-purple">AP-1</div>
            </div>
          </div>
          
          <div className="h-8 w-0.5 bg-dark-border"></div>
          
          {/* Step 5 */}
          <div className="p-4 bg-accent-orange/20 border border-accent-orange/30 rounded-lg text-center max-w-lg">
            <div className="text-accent-orange font-bold">Tumor Microenvironment Effects</div>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              <span className="text-xs px-2 py-1 bg-dark-tertiary rounded text-gray-300">MDSCs</span>
              <span className="text-xs px-2 py-1 bg-dark-tertiary rounded text-gray-300">TAMs</span>
              <span className="text-xs px-2 py-1 bg-dark-tertiary rounded text-gray-300">Tregs</span>
              <span className="text-xs px-2 py-1 bg-dark-tertiary rounded text-gray-300">↓CD8+ T cells</span>
            </div>
          </div>
          
          <div className="h-8 w-0.5 bg-dark-border"></div>
          
          {/* Step 6 */}
          <div className="p-4 bg-accent-red/30 border border-accent-red/50 rounded-lg text-center max-w-md">
            <div className="text-accent-red font-bold text-lg">Tumor Hyperprogression</div>
            <div className="flex flex-wrap gap-2 justify-center mt-2 text-sm">
              <span className="text-gray-300">Proliferation</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">Angiogenesis</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">Immune Escape</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Knowledge Gaps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card"
      >
        <h3 className="chart-title">Knowledge Gaps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {dashboardData.knowledge_gaps.map((gap, index) => (
            <div 
              key={index}
              className="p-3 bg-dark-tertiary rounded-lg flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-accent-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-accent-orange text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-sm text-gray-300">{gap}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Virus-Cancer Connections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="card"
      >
        <h3 className="chart-title">Oncogenic Virus Reactivation</h3>
        <p className="text-sm text-gray-400 mb-4">
          Several post-vaccination cases involved virus-associated cancers, suggesting potential 
          reactivation of latent oncogenic viruses.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-tertiary rounded-lg border border-dark-border">
            <h4 className="font-semibold text-accent-purple mb-2">EBV</h4>
            <p className="text-sm text-gray-400 mb-2">Epstein-Barr Virus</p>
            <p className="text-xs text-white">EBV-positive lymphomas, nasopharyngeal cancer, Burkitt's lymphoma</p>
          </div>
          
          <div className="p-4 bg-dark-tertiary rounded-lg border border-dark-border">
            <h4 className="font-semibold text-accent-red mb-2">HHV-8</h4>
            <p className="text-sm text-gray-400 mb-2">Human Herpesvirus 8</p>
            <p className="text-xs text-white">Kaposi sarcoma in multiple reported cases</p>
          </div>
          
          <div className="p-4 bg-dark-tertiary rounded-lg border border-dark-border">
            <h4 className="font-semibold text-accent-cyan mb-2">MCV</h4>
            <p className="text-sm text-gray-400 mb-2">Merkel Cell Virus</p>
            <p className="text-xs text-white">Merkel cell carcinoma cases reported</p>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="p-4 bg-dark-tertiary border border-accent-orange/30 rounded-lg"
      >
        <h4 className="font-semibold text-accent-orange mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Important Note
        </h4>
        <p className="text-sm text-gray-400">
          These mechanistic hypotheses remain speculative in the absence of direct in vivo validation. 
          No current studies have demonstrated oncogenic transformation or tumor initiation causally 
          attributable to the COVID mRNA vaccine or its components. These mechanisms should be regarded 
          as biologically plausible models that warrant targeted experimental study.
        </p>
      </motion.div>
    </div>
  );
}
