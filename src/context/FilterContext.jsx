import { createContext, useContext, useReducer, useMemo } from 'react';

// Initial filter state
const initialState = {
  cancerTypes: ['lymphomas_leukemias', 'solid_tumors', 'other_unspecified'],
  vaccineTypes: ['Pfizer_BioNTech_BNT162b2', 'Moderna_mRNA1273', 'AstraZeneca_ChAdOx1', 'Johnson_Johnson_Ad26', 'Sputnik_V', 'Inactivated_vaccines'],
  ageRange: [0, 100],
  onsetRange: [0, 365],
  countries: [],
  searchQuery: '',
};

// Action types
const ACTIONS = {
  SET_CANCER_TYPES: 'SET_CANCER_TYPES',
  SET_VACCINE_TYPES: 'SET_VACCINE_TYPES',
  SET_AGE_RANGE: 'SET_AGE_RANGE',
  SET_ONSET_RANGE: 'SET_ONSET_RANGE',
  SET_COUNTRIES: 'SET_COUNTRIES',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  RESET_FILTERS: 'RESET_FILTERS',
  TOGGLE_CANCER_TYPE: 'TOGGLE_CANCER_TYPE',
  TOGGLE_VACCINE_TYPE: 'TOGGLE_VACCINE_TYPE',
};

// Reducer function
function filterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CANCER_TYPES:
      return { ...state, cancerTypes: action.payload };
    
    case ACTIONS.SET_VACCINE_TYPES:
      return { ...state, vaccineTypes: action.payload };
    
    case ACTIONS.SET_AGE_RANGE:
      return { ...state, ageRange: action.payload };
    
    case ACTIONS.SET_ONSET_RANGE:
      return { ...state, onsetRange: action.payload };
    
    case ACTIONS.SET_COUNTRIES:
      return { ...state, countries: action.payload };
    
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case ACTIONS.TOGGLE_CANCER_TYPE: {
      const type = action.payload;
      const types = state.cancerTypes.includes(type)
        ? state.cancerTypes.filter(t => t !== type)
        : [...state.cancerTypes, type];
      return { ...state, cancerTypes: types };
    }
    
    case ACTIONS.TOGGLE_VACCINE_TYPE: {
      const type = action.payload;
      const types = state.vaccineTypes.includes(type)
        ? state.vaccineTypes.filter(t => t !== type)
        : [...state.vaccineTypes, type];
      return { ...state, vaccineTypes: types };
    }
    
    case ACTIONS.RESET_FILTERS:
      return initialState;
    
    default:
      return state;
  }
}

// Create context
const FilterContext = createContext(null);

// Provider component
export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  // Memoized action creators
  const actions = useMemo(() => ({
    setCancerTypes: (types) => dispatch({ type: ACTIONS.SET_CANCER_TYPES, payload: types }),
    setVaccineTypes: (types) => dispatch({ type: ACTIONS.SET_VACCINE_TYPES, payload: types }),
    setAgeRange: (range) => dispatch({ type: ACTIONS.SET_AGE_RANGE, payload: range }),
    setOnsetRange: (range) => dispatch({ type: ACTIONS.SET_ONSET_RANGE, payload: range }),
    setCountries: (countries) => dispatch({ type: ACTIONS.SET_COUNTRIES, payload: countries }),
    setSearchQuery: (query) => dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query }),
    toggleCancerType: (type) => dispatch({ type: ACTIONS.TOGGLE_CANCER_TYPE, payload: type }),
    toggleVaccineType: (type) => dispatch({ type: ACTIONS.TOGGLE_VACCINE_TYPE, payload: type }),
    resetFilters: () => dispatch({ type: ACTIONS.RESET_FILTERS }),
  }), []);

  const value = useMemo(() => ({
    filters: state,
    ...actions,
  }), [state, actions]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

// Hook to use filter context
export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}

export default FilterContext;
