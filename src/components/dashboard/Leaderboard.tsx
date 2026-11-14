import React from 'react';
import { LeaderboardEntry } from '../../types/schema';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  isLoading?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, isLoading = false }) => {
  // Sort descending by currentMonthPoints and take top 3
  const topThree = [...entries]
    .sort((a, b) => b.currentMonthPoints - a.currentMonthPoints)
    .slice(0, 3);

  // Map to podium visual slots: [Rank 2 (Silver), Rank 1 (Gold), Rank 3 (Bronze)]
  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-pulse">
        <div className="h-6 w-48 bg-slate-200 rounded mb-6"></div>
        <div className="grid grid-cols-3 gap-4 h-48 items-end">
          <div className="h-32 bg-slate-100 rounded-xl"></div>
          <div className="h-44 bg-slate-100 rounded-xl"></div>
          <div className="h-28 bg-slate-100 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <section 
      aria-label="Classement Interactien du Mois" 
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden"
    >
      {/* Decorative Brand Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-2">
            <span>🏆</span> Gamification & Engagement
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Interactien du Mois
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Top 3 des membres les plus engagés ce mois-ci
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-medium text-slate-400 block">Mise à jour</span>
          <span className="text-xs font-semibold text-slate-700">Temps réel</span>
        </div>
      </div>

      {/* Empty State */}
      {topThree.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-sm">Aucun point attribué pour le mois en cours.</p>
        </div>
      ) : (
        /* Podium View */
        <div className="grid grid-cols-3 gap-3 md:gap-6 items-end pt-4 pb-2 relative z-10">
          
          {/* Rank 2 (Silver) */}
          <div className="flex flex-col items-center">
            {second ? (
              <div className="w-full flex flex-col items-center group">
                <div className="relative mb-2">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-bold text-slate-700 text-lg shadow-sm">
                    {second.avatarUrl ? (
                      <img src={second.avatarUrl} alt={second.fullName} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      second.fullName.charAt(0)
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center border-2 border-white shadow">
                    2
                  </span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-800 text-center line-clamp-1">
                  {second.fullName}
                </span>
                <span className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                  {second.bureauTitle || 'Membre'}
                </span>
                <div className="w-full bg-slate-100/80 border border-slate-200/80 rounded-t-xl p-3 text-center transition-all group-hover:bg-slate-200/60">
                  <span className="text-sm md:text-base font-extrabold text-slate-700 block">
                    {second.currentMonthPoints} pts
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Argent</span>
                </div>
              </div>
            ) : (
              <div className="h-28 w-full border border-dashed border-slate-200 rounded-t-xl flex items-center justify-center text-xs text-slate-400">
                -
              </div>
            )}
          </div>

          {/* Rank 1 (Gold) */}
          <div className="flex flex-col items-center">
            {first ? (
              <div className="w-full flex flex-col items-center group">
                <div className="relative mb-2">
                  <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-amber-50 border-3 border-amber-400 flex items-center justify-center font-bold text-amber-900 text-xl shadow-md ring-4 ring-amber-100">
                    {first.avatarUrl ? (
                      <img src={first.avatarUrl} alt={first.fullName} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      first.fullName.charAt(0)
                    )}
                  </div>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl animate-bounce">
                    👑
                  </span>
                  <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-amber-950 text-xs font-extrabold flex items-center justify-center border-2 border-white shadow">
                    1
                  </span>
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-900 text-center line-clamp-1">
                  {first.fullName}
                </span>
                <span className="text-[11px] font-medium text-amber-700 line-clamp-1 mb-2">
                  {first.bureauTitle || 'Membre'}
                </span>
                <div className="w-full bg-gradient-to-t from-amber-100/90 to-amber-50 border border-amber-200 rounded-t-2xl p-4 text-center shadow-sm transition-all group-hover:from-amber-200 group-hover:to-amber-100">
                  <span className="text-base md:text-lg font-black text-amber-900 block">
                    {first.currentMonthPoints} pts
                  </span>
                  <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                    Or • Leader
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="flex flex-col items-center">
            {third ? (
              <div className="w-full flex flex-col items-center group">
                <div className="relative mb-2">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-50/50 border-2 border-amber-600/60 flex items-center justify-center font-bold text-amber-900 text-lg shadow-sm">
                    {third.avatarUrl ? (
                      <img src={third.avatarUrl} alt={third.fullName} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      third.fullName.charAt(0)
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow">
                    3
                  </span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-800 text-center line-clamp-1">
                  {third.fullName}
                </span>
                <span className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                  {third.bureauTitle || 'Membre'}
                </span>
                <div className="w-full bg-orange-50/70 border border-orange-200/60 rounded-t-xl p-3 text-center transition-all group-hover:bg-orange-100/60">
                  <span className="text-sm md:text-base font-extrabold text-amber-900 block">
                    {third.currentMonthPoints} pts
                  </span>
                  <span className="text-[10px] text-amber-700 font-medium">Bronze</span>
                </div>
              </div>
            ) : (
              <div className="h-24 w-full border border-dashed border-slate-200 rounded-t-xl flex items-center justify-center text-xs text-slate-400">
                -
              </div>
            )}
          </div>

        </div>
      )}
    </section>
  );
};
