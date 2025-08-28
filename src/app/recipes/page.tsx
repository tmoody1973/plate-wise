'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';

export default function RecipesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📖</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Recipe Collection</h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover and save culturally authentic recipes from around the world. 
              Search by cuisine, dietary restrictions, and budget constraints.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-cultural-primary/10 rounded-lg p-6">
                  <h3 className="font-semibold text-cultural-primary mb-2">Cultural Recipes</h3>
                  <p className="text-sm text-gray-600">Browse authentic recipes from Mediterranean, Asian, Latin, African, and Middle Eastern cuisines</p>
                </div>
                <div className="bg-cultural-secondary/10 rounded-lg p-6">
                  <h3 className="font-semibold text-cultural-secondary mb-2">Smart Search</h3>
                  <p className="text-sm text-gray-600">Filter by ingredients, cooking time, difficulty, and cultural authenticity ratings</p>
                </div>
                <div className="bg-cultural-accent/10 rounded-lg p-6">
                  <h3 className="font-semibent text-cultural-accent mb-2">Cost Analysis</h3>
                  <p className="text-sm text-gray-600">See estimated costs per serving and ingredient substitution suggestions</p>
                </div>
              </div>
              <Button className="bg-cultural-primary hover:bg-cultural-primary/90 text-white">
                Coming Soon - Recipe Discovery!
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}