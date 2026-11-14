import React, { useState } from 'react';
import { Member } from '../../types/schema';

interface PointAdjustmentModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onSavePoints: (memberId: string, delta: number, reason: string) => Promise<void>;
}

export const PointAdjustmentModal: React.FC<PointAdjustmentModalProps> = ({
  member,
  isOpen,
  onClose,
  onSavePoints,
}) => {
  const [delta, setDelta] = useState<number>(10);
  const [reason, setReason] = useState<string>('Participation active réunion statutaire');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !member) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (delta === 0) return;
    try {
      setIsSubmitting(true);
      await onSavePoints(member.id, delta, reason);
      onClose();
    } catch (err) {
      console.error('Failed to adjust points:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Ajustement des Points
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactien du Mois • {member.firstName} {member.lastName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Points Actuels ce Mois
            </label>
            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900">
              {member.currentMonthPoints} pts
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Variation de Points (+ ou -)
            </label>
            <input
              type="number"
              value={delta}
              onChange={(e) => setDelta(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              placeholder="+10 ou -5"
              required
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Entrez un nombre positif pour ajouter, ou négatif pour retirer.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Motif de l'attribution
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Présence ponctuelle, participation caravane..."
              required
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50"
            >
              {isSubmitting ? 'Enregistrement...' : 'Valider les points'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
