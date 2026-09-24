import React from 'react';
import { LongevityMap, ActivationItem } from '../types';

interface PrintMapViewProps {
  map: LongevityMap;
  activations?: ActivationItem[];
}

export const PrintMapView: React.FC<PrintMapViewProps> = ({ map, activations = [] }) => {
  return (
    <div className="hidden print:block p-8 bg-white text-black max-w-3xl mx-auto font-sans">
      <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">LongeviLab</h1>
          <p className="text-sm italic mt-1">“La vejez no se improvisa, se construye día a día.”</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">Mi Longevidad</p>
          <p className="text-xs text-gray-600">{map.dateFormatted}</p>
        </div>
      </div>

      <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
        <p className="text-base italic leading-relaxed">
          “{map.personalPhrase}”
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-700">
            Lo que hoy quiero conservar
          </h2>
          <ul className="text-sm space-y-1.5 list-disc list-inside">
            {map.toKeep.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-700">
            Quiero darle más espacio a
          </h2>
          <ul className="text-sm space-y-1.5 list-disc list-inside font-medium">
            {map.giveSpaceTo.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-700">
            Quiero comenzar a preparar
          </h2>
          <ul className="text-sm space-y-1.5 list-disc list-inside">
            {map.toPrepare.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-700">
            Lo que parece importante para mí
          </h2>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {map.importantThemes.map((concept, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs font-semibold border border-gray-400 rounded bg-white"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      </div>

      {activations.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-300">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-800">
            Mis 3 Activaciones Sugeridas
          </h2>
          <div className="space-y-3">
            {activations.map((act, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded text-sm">
                <span className="font-bold text-xs uppercase text-gray-600 block mb-1">
                  {act.category}
                </span>
                <p className="leading-snug">{act.actionText}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-500 flex justify-between">
        <span>LongeviLab · Herramienta de reflexión personal</span>
        <span>No corresponde a una evaluación clínica ni médica</span>
      </div>
    </div>
  );
};
