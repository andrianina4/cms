import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Category } from '../../types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useEffect } from 'react';

const categorySchema = z.object({
    name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
    slug: z.string().min(2, 'Le slug doit faire au moins 2 caractères'),
    description: z.string().optional(),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur hexadécimale invalide'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
    category?: Category | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CategoryFormValues) => void;
    isLoading?: boolean;
}

export function CategoryForm({ category, isOpen, onClose, onSubmit, isLoading }: CategoryFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            color: '#6366f1',
        },
    });

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                slug: category.slug,
                description: category.description || '',
                color: category.color,
            });
        } else {
            reset({
                name: '',
                slug: '',
                description: '',
                color: '#6366f1',
            });
        }
    }, [category, reset, isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-800">
                        {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input
                            id="name"
                            placeholder="ex: Technologie"
                            {...register('name')}
                            className="rounded-xl"
                        />
                        {errors.name && (
                            <p className="text-xs text-rose-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            placeholder="ex: technologie"
                            {...register('slug')}
                            className="rounded-xl"
                        />
                        {errors.slug && (
                            <p className="text-xs text-rose-500">{errors.slug.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optionnel)</Label>
                        <Textarea
                            id="description"
                            placeholder="Une brève description..."
                            {...register('description')}
                            className="rounded-xl min-h-[100px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="color">Couleur</Label>
                        <div className="flex items-center space-x-3">
                            <Input
                                id="color"
                                type="color"
                                {...register('color')}
                                className="w-12 h-12 p-1 rounded-xl cursor-pointer"
                            />
                            <Input
                                id="color-text"
                                placeholder="#000000"
                                {...register('color')}
                                className="rounded-xl flex-1"
                            />
                        </div>
                        {errors.color && (
                            <p className="text-xs text-rose-500">{errors.color.message}</p>
                        )}
                    </div>
                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="rounded-xl px-6"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-xl px-6 bg-[#b59a42] hover:bg-[#a1893a] text-white"
                        >
                            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
