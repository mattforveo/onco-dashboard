export default function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Data Source */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Data Source</h3>
            <p className="text-xs text-gray-400">
              Kuperwasser C, El-Deiry WS. COVID vaccination and post-infection cancer signals. 
              <span className="text-accent-blue"> Oncotarget. 2026;17:1-29.</span>
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Disclaimer</h3>
            <p className="text-xs text-gray-400">
              Temporal association does not prove causation. This dashboard is for 
              educational and research purposes only. Data predominantly from case reports.
            </p>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Study Period</h3>
            <p className="text-xs text-gray-400">
              January 2020 - October 2025
            </p>
            <p className="text-xs text-gray-400 mt-1">
              69 publications • 333 patients • 27 countries
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-dark-border flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-500">
            Dashboard created for research visualization purposes
          </p>
          <p className="text-xs text-gray-500">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
