import { useState, useRef } from 'react';
import {
    Upload,
    FileJson,
    Download,
    AlertCircle,
    FileSpreadsheet
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';

export function ImportPage() {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleImport = () => {
        if (!selectedFile) return;
        console.log('Importing file:', selectedFile.name);
        // Add actual API call here
        alert(`Importation de ${selectedFile.name} lancée !`);
    };

    const jsonExample = [
        {
            "title": "Mon article",
            "content": "Contenu de l'article...",
            "excerpt": "Résumé court",
            "author": "John Doe",
            "category": "technologie",
            "network": "france"
        }
    ];

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type === "application/json") {
            setSelectedFile(file);
        }
    };


    return (
        <div className="space-y-8 max-w-[1200px] mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-serif">Import de données</h1>
                <p className="text-slate-400 font-medium mt-1">Importez des articles depuis un fichier JSON</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Format Info */}
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <FileJson className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Format JSON attendu</h3>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 font-mono text-sm text-slate-600 border border-slate-100 relative group">
                        <pre className="overflow-x-auto">
                            {JSON.stringify(jsonExample, null, 4)}
                        </pre>
                        <button className="absolute top-4 right-4 p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Upload Area */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileSelect}
                    className={cn(
                        "relative bg-white border-2 border-dashed rounded-[40px] p-16 transition-all duration-300 flex flex-col items-center justify-center text-center gap-6 group cursor-pointer",
                        isDragging
                            ? "border-indigo-400 bg-indigo-50/30 scale-[0.99]"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                    )}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept=".json"
                    />
                    <div className={cn(
                        "w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500",
                        isDragging ? "bg-indigo-500 text-white rotate-12 scale-110" : "bg-amber-100 text-amber-600 group-hover:scale-110"
                    )}>
                        <Upload className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-800">
                            {selectedFile ? selectedFile.name : "Cliquez ou glissez votre fichier JSON ici"}
                        </h3>
                        <p className="text-slate-400 font-medium">
                            {selectedFile ? `${(selectedFile.size / 1024).toFixed(2)} KB` : "JSON uniquement"}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            variant="outline"
                            className="rounded-xl px-6 py-2.5 bg-white border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 flex items-center gap-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                triggerFileSelect();
                            }}
                        >
                            <FileSpreadsheet className="w-4 h-4" />
                            {selectedFile ? "Changer de fichier" : "Charger exemple"}
                        </Button>

                        {selectedFile && (
                            <Button
                                className="rounded-xl px-8 py-2.5 bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 flex items-center gap-2 shadow-lg shadow-indigo-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleImport();
                                }}
                            >
                                <Upload className="w-4 h-4" />
                                Importer
                            </Button>
                        )}
                    </div>

                    {/* Decorative background elements */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-50/50 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-50/50 rounded-full blur-3xl -z-10" />
                </div>

                {/* Information Card */}
                <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-3xl p-6 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-900 text-sm">Conseil d'importation</h4>
                        <p className="text-indigo-700/70 text-sm mt-1 leading-relaxed">
                            Assurez-vous que votre fichier JSON respecte la structure ci-dessus. Les catégories et réseaux non existants seront ignorés ou créeront des erreurs lors de la validation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

