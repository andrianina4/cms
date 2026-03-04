import { useState, useEffect } from 'react';
import { networksService } from '../services/networks.service';
import type { Network } from '../types';
import { NetworkCard } from '../components/networks/NetworkCard';
import { NetworkForm } from '../components/networks/NetworkForm';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { useAuthStore, useToastStore } from '../store';

export function NetworksPage() {
    const [networks, setNetworks] = useState<Network[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingNetwork, setEditingNetwork] = useState<Network | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuthStore();
    const { addToast } = useToastStore();
    const isAdmin = user?.role === 'admin';

    const fetchNetworks = async () => {
        try {
            setIsLoading(true);
            const data = await networksService.getAll();
            setNetworks(data);
        } catch (error) {
            console.error('Failed to fetch networks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNetworks();
    }, []);

    const handleCreate = () => {
        setEditingNetwork(null);
        setIsFormOpen(true);
    };

    const handleEdit = (network: Network) => {
        setEditingNetwork(network);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce réseau ?')) {
            try {
                await networksService.delete(id);
                addToast('Réseau supprimé avec succès', 'success');
                fetchNetworks();
            } catch (error: any) {
                const message = error.response?.data?.message || error.message || 'Erreur lors de la suppression';
                addToast(message, 'error');
                console.error('Failed to delete network:', error);
            }
        }
    };

    const handleSubmit = async (data: any) => {
        try {
            setIsSubmitting(true);
            if (editingNetwork) {
                await networksService.update(editingNetwork.id, data);
                addToast('Réseau mis à jour avec succès', 'success');
            } else {
                await networksService.create(data);
                addToast('Réseau créé avec succès', 'success');
            }
            setIsFormOpen(false);
            fetchNetworks();
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'Erreur lors de l\'enregistrement';
            addToast(message, 'error');
            console.error('Failed to save network:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Réseaux</h1>
                    <p className="text-slate-500 mt-1">Gérez les réseaux de diffusion</p>
                </div>
                {isAdmin && (
                    <Button
                        onClick={handleCreate}
                        className="rounded-full bg-[#b59a42] hover:bg-[#a1893a] text-white px-6 h-12 shadow-md shadow-yellow-900/10 flex items-center space-x-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Nouveau réseau</span>
                    </Button>
                )}
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b59a42]"></div>
                </div>
            ) : networks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {networks.map((network) => (
                        <NetworkCard
                            key={network.id}
                            network={network}
                            onEdit={isAdmin ? handleEdit : undefined}
                            onDelete={isAdmin ? handleDelete : undefined}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white p-16 rounded-3xl border border-dashed border-slate-200 text-center">
                    <h4 className="text-slate-800 font-bold text-lg">Aucun réseau</h4>
                    <p className="text-slate-500 mt-2">Commencez par ajouter un réseau pour diffuser votre contenu.</p>
                    {isAdmin && (
                        <Button
                            onClick={handleCreate}
                            variant="link"
                            className="text-[#b59a42] mt-4 font-bold"
                        >
                            + Créer un réseau
                        </Button>
                    )}
                </div>
            )}

            <NetworkForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                network={editingNetwork}
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
            />
        </div>
    );
}
