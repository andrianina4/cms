import { useState, useEffect } from 'react';
import { categoriesService } from '../services/categories.service';
import type { Category } from '../types';
import { CategoryCard } from '../components/categories/CategoryCard';
import { CategoryForm } from '../components/categories/CategoryForm';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { useAuthStore, useToastStore } from '../store';

export function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuthStore();
    const { addToast } = useToastStore();
    const isAdmin = user?.role === 'admin';

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const data = await categoriesService.getAll();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = () => {
        setEditingCategory(null);
        setIsFormOpen(true);
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
            try {
                await categoriesService.delete(id);
                addToast('Catégorie supprimée avec succès', 'success');
                fetchCategories();
            } catch (error: any) {
                addToast(error.message || 'Erreur lors de la suppression', 'error');
                console.error('Failed to delete category:', error);
            }
        }
    };

    const handleSubmit = async (data: any) => {
        try {
            setIsSubmitting(true);
            if (editingCategory) {
                await categoriesService.update(editingCategory.id, data);
                addToast('Catégorie mise à jour avec succès', 'success');
            } else {
                await categoriesService.create(data);
                addToast('Catégorie créée avec succès', 'success');
            }
            setIsFormOpen(false);
            fetchCategories();
        } catch (error: any) {
            addToast(error.message || 'Erreur lors de l\'enregistrement', 'error');
            console.error('Failed to save category:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Catégories</h1>
                    <p className="text-slate-500 mt-1">Gérez les catégories éditoriales</p>
                </div>
                {isAdmin && (
                    <Button
                        onClick={handleCreate}
                        className="rounded-full bg-[#b59a42] hover:bg-[#a1893a] text-white px-6 h-12 shadow-md shadow-yellow-900/10 flex items-center space-x-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Nouvelle catégorie</span>
                    </Button>
                )}
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b59a42]"></div>
                </div>
            ) : categories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onEdit={isAdmin ? handleEdit : undefined}
                            onDelete={isAdmin ? handleDelete : undefined}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white p-16 rounded-3xl border border-dashed border-slate-200 text-center">
                    <h4 className="text-slate-800 font-bold text-lg">Aucune catégorie</h4>
                    <p className="text-slate-500 mt-2">Commencez par ajouter une catégorie pour organiser votre contenu.</p>
                    {isAdmin && (
                        <Button
                            onClick={handleCreate}
                            variant="link"
                            className="text-[#b59a42] mt-4 font-bold"
                        >
                            + Créer une catégorie
                        </Button>
                    )}
                </div>
            )}

            <CategoryForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                category={editingCategory}
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
            />
        </div>
    );
}
