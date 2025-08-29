/**
 * Debug Page
 * Temporary page for debugging recipe issues
 */

import { RecipeDebug } from '@/components/debug/RecipeDebug';

export default function DebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Debug Tools</h1>
      <RecipeDebug />
    </div>
  );
}