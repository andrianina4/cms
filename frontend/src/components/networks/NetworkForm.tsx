import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Network } from '../../types';
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

const networkSchema = z.object({
    name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
    description: z.string().min(2, 'La description doit faire au moins 2 caractères'),
});

type NetworkFormValues = z.infer<typeof networkSchema>;

interface NetworkFormProps {
    network?: Network | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: NetworkFormValues) => void;
    isLoading?: boolean;
}

export function NetworkForm({ network, isOpen, onClose, onSubmit, isLoading }: NetworkFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NetworkFormValues>({
        resolver: zodResolver(networkSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    useEffect(() => {
        if (network) {
            reset({
                name: network.name,
                description: network.description,
            });
        } else {
            reset({
                name: '',
                description: '',
            });
        }
    }, [network, reset, isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-800">
                        {network ? 'Modifier le réseau' : 'Nouveau réseau'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input
                            id="name"
                            placeholder="ex: LinkedIn"
                            {...register('name')}
                            className="rounded-xl"
                        />
                        {errors.name && (
                            <p className="text-xs text-rose-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Description du réseau..."
                            {...register('description')}
                            className="rounded-xl min-h-[100px]"
                        />
                        {errors.description && (
                            <p className="text-xs text-rose-500">{errors.description.message}</p>
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
